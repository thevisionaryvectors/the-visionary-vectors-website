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
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeBlockLang = '';

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

      // Handle fenced code blocks (``` ... ```)
      if (trimmedLine.startsWith('```')) {
        if (!inCodeBlock) {
          if (inList) closeCurrentList(true);
          inCodeBlock = true;
          codeBlockLang = trimmedLine.slice(3).trim();
          codeBlockLines = [];
        } else {
          inCodeBlock = false;
          const rawCode = codeBlockLines.join('\n');
          const dataCode = encodeURIComponent(rawCode);
          const escaped = rawCode
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          const copyBtn = `<button class="copy-btn flex items-center p-1.5 rounded text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-300 transition-colors" data-copy="${dataCode}" title="Copy code"><svg xmlns="http://www.w3.org/2000/svg" class="copy-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" class="check-icon w-4 h-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:#4ade80"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></button>`;
          const langBadge = codeBlockLang
            ? `<div class="px-4 py-1.5 border-b border-blue-200 dark:border-blue-900/40 bg-blue-100 dark:bg-[#0a1020] flex items-center justify-between"><span class="text-xs text-blue-500 dark:text-blue-300 font-mono">${codeBlockLang}</span>${copyBtn}</div>`
            : `<div class="px-2 py-1 border-b border-blue-200 dark:border-blue-900/40 bg-blue-100 dark:bg-[#0a1020] flex items-center justify-end">${copyBtn}</div>`;
          processedLines.push(
            `<div class="mt-4 mb-1 rounded-lg overflow-hidden border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-[#080e1a]">${langBadge}<pre class="p-4 overflow-x-auto m-0 bg-transparent"><code class="text-sm font-mono text-gray-800 dark:text-gray-100" style="white-space: pre;">${escaped}</code></pre></div>`
          );
          codeBlockLines = [];
          codeBlockLang = '';
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

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
      
      // Handle spacer ---
      if (trimmedLine === '---') {
        processedLines.push('<div class="mt-4"></div>');
        continue;
      }

      // Handle inline code `code`
      processedLine = processedLine.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 font-mono text-sm px-1.5 py-0.5 rounded">$1</code>');

      // Handle bold+italic ***text***
      processedLine = processedLine.replace(/\*\*\*([^\*]+)\*\*\*/g, '<em><strong class="text-indigo-600 dark:text-indigo-400">$1</strong></em>');

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

      // Render purely-bold lines as subheadings
      if (/^<strong>[^<]+<\/strong>$/.test(processedLine.trim())) {
        const text = processedLine.trim().replace(/<\/?strong>/g, '');
        processedLines.push(`<h3 class="mt-8 mb-1 text-xl font-bold text-gray-900 dark:text-white">${text}</h3>`);
      } else {
        processedLines.push(processedLine);
      }
    }
    
    // Close any open list at the end
    if (inList) {
      closeCurrentList(true);
    }
    
    element.innerHTML = processedLines.join('\n');

    // Wire up copy buttons
    element.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.dataset.copy ?? '');
        const copyIcon = btn.querySelector('.copy-icon');
        const checkIcon = btn.querySelector('.check-icon');
        const showCheck = () => {
          copyIcon?.classList.add('hidden');
          checkIcon?.classList.remove('hidden');
          setTimeout(() => {
            copyIcon?.classList.remove('hidden');
            checkIcon?.classList.add('hidden');
          }, 2000);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(showCheck).catch(() => {});
        } else {
          const ta = document.createElement('textarea');
          ta.value = code;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showCheck();
        }
      });
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="text-lg text-gray-700 dark:text-gray-300 leading-normal whitespace-pre-line max-w-[680px]"
      style={{ lineHeight: '1.6' }}
    />
  );
}
