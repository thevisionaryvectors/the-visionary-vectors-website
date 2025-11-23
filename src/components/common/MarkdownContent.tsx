'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    const lines = content.split('\n');
    const processedLines: string[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;
    let currentOlNumber = 1;
    let nextOlNumber = 1;

    const getNextNonEmptyLine = (startIndex: number) => {
      for (let j = startIndex; j < lines.length; j++) {
        const candidate = lines[j].trim();
        if (candidate !== '') {
          return candidate;
        }
      }
      return null;
    };

    const closeCurrentList = (shouldResetOl: boolean) => {
      if (!inList || !listType) {
        return;
      }

      const closingType = listType;
      if (closingType === 'ol') {
        if (shouldResetOl) {
          nextOlNumber = 1;
        }
        currentOlNumber = nextOlNumber;
      }

      processedLines.push(`</${closingType}>`);
      inList = false;
      listType = null;
    };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Handle display math ($$...$$)
      if (trimmedLine.startsWith('$$') && trimmedLine.endsWith('$$')) {
        if (inList) {
          if (listType === 'ol') {
            const upcoming = getNextNonEmptyLine(i + 1);
            const shouldResetOl = !upcoming || !/^\d+\.\s/.test(upcoming);
            closeCurrentList(shouldResetOl);
          } else {
            closeCurrentList(true);
          }
        }
        const math = trimmedLine.slice(2, -2);
        try {
          const rendered = katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
          });
          processedLines.push(`<div class="katex-display my-6 overflow-x-auto" style="font-size: 0.85em;">${rendered}</div>`);
        } catch (e) {
          processedLines.push(`<div class="text-red-500">Error rendering formula</div>`);
        }
        continue;
      }
      
      // Handle inline math ($...$) and other formatting
      let processedLine = line;
      const inlineMathRegex = /\$([^\$]+)\$/g;
      processedLine = processedLine.replace(inlineMathRegex, (match, math) => {
        try {
          const rendered = katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
          });
          return `<span class="katex-inline">${rendered}</span>`;
        } catch (e) {
          return match;
        }
      });
      
      // Check if line is a plain text formula (not wrapped in $ or $$)
      // Only match lines that look like mathematical equations, not regular text with = signs
      const isPlainFormula = (/^[wWbB][₀-₉0-9]+[xyz]/.test(trimmedLine) ||
                             /^(weight_|bias_)[₀-₉0-9]+/.test(trimmedLine) ||
                             /^[A-Z][xyz]\+/.test(trimmedLine) ||
                             /^[a-z][₀-₉0-9]+\s*=\s*[0-9\-\+\*\/\(\)\.]+$/.test(trimmedLine)) &&
                             !trimmedLine.includes('$');
      
      if (isPlainFormula) {
        if (inList) {
          if (listType === 'ol') {
            const upcoming = getNextNonEmptyLine(i + 1);
            const shouldResetOl = !upcoming || !/^\d+\.\s/.test(upcoming);
            closeCurrentList(shouldResetOl);
          } else {
            closeCurrentList(true);
          }
        }
        processedLines.push(`<div class="text-center font-mono text-lg my-4 font-semibold text-blue-600 dark:text-blue-400">${processedLine}</div>`);
        continue;
      }
      
      // Handle bold text **text**
      processedLine = processedLine.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
      
      // Handle links [text](url)
      processedLine = processedLine.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Handle bullet list items
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('• ')) {
        if (!inList || listType !== 'ul') {
          if (inList) {
            closeCurrentList(true);
          }
          processedLines.push('<ul class="list-disc ml-6 space-y-1 mt-3 mb-1 text-lg" style="list-style-type: disc;">');
          inList = true;
          listType = 'ul';
        }
        // Replace the bullet character from processedLine (which has formatting applied)
        const content = processedLine.replace(/^\s*[*•]\s+/, '');
        processedLines.push(`<li class="pl-2" style="display: list-item;">${content}</li>`);
        continue;
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        const match = trimmedLine.match(/^(\d+)\.\s+/);
        const explicitNumber = match ? parseInt(match[1], 10) : null;
        if (!inList || listType !== 'ol') {
          if (inList) {
            closeCurrentList(false);
          }
          const startNumber = explicitNumber !== null && (explicitNumber !== 1 || nextOlNumber === 1)
            ? explicitNumber
            : nextOlNumber;
          nextOlNumber = startNumber;
          const startAttr = nextOlNumber > 1 ? ` start="${nextOlNumber}"` : '';
          processedLines.push(`<ol class="list-decimal ml-6 space-y-1 mt-3 mb-1 text-lg" style="list-style-type: decimal;"${startAttr}>`);
          inList = true;
          listType = 'ol';
          currentOlNumber = nextOlNumber;
        }
        // Replace only the first occurrence of number followed by dot and space from processedLine
        const content = processedLine.replace(/^\s*\d+\.\s+/, '');
        const targetNumber = explicitNumber !== null && (explicitNumber !== 1 || currentOlNumber === 1)
          ? explicitNumber
          : currentOlNumber;
        const valueAttr = targetNumber !== currentOlNumber ? ` value="${targetNumber}"` : '';
        processedLines.push(`<li class="pl-2" style="display: list-item;"${valueAttr}>${content}</li>`);
        currentOlNumber = targetNumber + 1;
        nextOlNumber = currentOlNumber;
        continue;
      }
      
      // If we reach here and were in a list, close it
      if (inList && trimmedLine !== '') {
        if (listType === 'ol') {
          const upcoming = getNextNonEmptyLine(i + 1);
          const shouldResetOl = !upcoming || !/^\d+\.\s/.test(upcoming);
          closeCurrentList(shouldResetOl);
        } else {
          closeCurrentList(true);
        }
      }

      if (trimmedLine === '' && inList) {
        // Skip empty lines within lists to keep items tight
        continue;
      }

      // Skip rendering line breaks between list items and following content
      if (trimmedLine === '') {
        continue;
      }

      processedLines.push(processedLine);
    }
    
    // Close any open list at the end
    if (inList) {
      closeCurrentList(true);
    }
    
    element.innerHTML = processedLines.join('\n');
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="text-lg text-gray-700 dark:text-gray-300 leading-normal whitespace-pre-line"
      style={{ lineHeight: '1.6' }}
    />
  );
}
