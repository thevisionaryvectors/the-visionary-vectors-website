export function welcomeEmailHtml(latestIssueUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Prompt Notes</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0f0c1a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 36px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#7c6fcd;">Prompt Notes</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">You're in. 🤍</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 36px;">
            <p style="margin:0 0 16px;font-size:15px;color:#a0a0b8;line-height:1.7;">
              Hey — thanks for subscribing.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#a0a0b8;line-height:1.7;">
              Every week I share what I'm building with AI, what's actually worth paying attention to in the space, and the things I wish someone had told me earlier.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#a0a0b8;line-height:1.7;">
              No fluff. No hype. Just real stuff from someone building in this every day.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:8px;background:#6366f1;">
                  <a href="${latestIssueUrl}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.02em;">
                    Read the latest issue →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px 28px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:13px;color:#5a5a7a;line-height:1.6;">
              — Ayushi<br/>
              <span style="font-size:12px;">AI Engineer · Visionary Vectors</span>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function weeklyNewsletterEmailHtml({
  issueDate,
  featuredIssueUrl,
  handsInStackUrl,
}: {
  issueDate: string;
  featuredIssueUrl: string;
  handsInStackUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Prompt Notes</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:0 0 28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#6366f1;">Prompt Notes</p>
            <h1 style="margin:0 0 4px;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:0.08em;text-transform:uppercase;">ISSUE 4</h1>
            <p style="margin:0;font-size:13px;color:#5a5a7a;">${issueDate}</p>
          </td>
        </tr>

        <!-- Mini Insights -->
        <tr>
          <td style="padding:0 0 16px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#a78bfa;">Mini Insights</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c1a;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#ffffff;line-height:1.4;">Quick thoughts this week</p>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding:0 0 10px;">
                        <table cellpadding="0" cellspacing="0"><tr>
                          <td style="padding-right:10px;vertical-align:top;color:#a78bfa;font-size:14px;">•</td>
                          <td style="font-size:14px;color:#a0a0b8;line-height:1.6;">RAG is not a silver bullet — most failures I see are retrieval failures, not generation failures. Fix the retrieval first.</td>
                        </tr></table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 10px;">
                        <table cellpadding="0" cellspacing="0"><tr>
                          <td style="padding-right:10px;vertical-align:top;color:#a78bfa;font-size:14px;">•</td>
                          <td style="font-size:14px;color:#a0a0b8;line-height:1.6;">The best agent I've built this month does one thing really well. Not ten things okay.</td>
                        </tr></table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0"><tr>
                          <td style="padding-right:10px;vertical-align:top;color:#a78bfa;font-size:14px;">•</td>
                          <td style="font-size:14px;color:#a0a0b8;line-height:1.6;">Evals are not optional. If you can't measure it, you can't ship it confidently.</td>
                        </tr></table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Featured Issue -->
        <tr>
          <td style="padding:0 0 16px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#a78bfa;">Featured Issue</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c1a;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 8px;font-size:17px;font-weight:700;color:#ffffff;line-height:1.4;">How Claude Code Was Leaked — And How Can You Prevent It?</p>
                  <p style="margin:0 0 6px;font-size:14px;color:#a0a0b8;line-height:1.6;">A small packaging mistake exposed Claude's source — a reminder that most incidents aren't sophisticated, just preventable.</p>
                  <p style="margin:0 0 20px;font-size:14px;color:#a0a0b8;line-height:1.6;">In this issue: what went wrong, why it matters, how it reflects our growing reliance on AI, and a checklist you should probably be using.</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="border-radius:8px;background:#6366f1;">
                        <a href="${featuredIssueUrl}" style="display:inline-block;padding:10px 20px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;">Read the article →</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hands in the Stack -->
        <tr>
          <td style="padding:0 0 16px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#a78bfa;">Hands in the Stack</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c1a;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 8px;font-size:17px;font-weight:700;color:#ffffff;line-height:1.4;">ADK Skills — Build Agents That Actually Know What They're Doing</p>
                  <p style="margin:0 0 20px;font-size:14px;color:#a0a0b8;line-height:1.6;">Skills in Google ADK aren't just a pattern — they're how you stop agents from hallucinating and start building something you can actually ship.</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="border-radius:8px;background:#6366f1;">
                        <a href="${handsInStackUrl}" style="display:inline-block;padding:10px 20px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;">Read the article →</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- About -->
        <tr>
          <td style="padding:0 0 16px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#a78bfa;">About</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c1a;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 10px;font-size:15px;font-weight:700;color:#ffffff;">Hi, I'm Ayushi.</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#a0a0b8;line-height:1.6;">I'm an AI engineer working on LLM-powered and agentic systems, and still learning something new about this space every day.</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#a0a0b8;line-height:1.6;">This newsletter is where I share what I'm learning — the useful bits, the mistakes, and the things that feel worth paying attention to.</p>
                  <p style="margin:0;font-size:14px;color:#5a5a7a;line-height:1.6;">— Ayushi</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 0 0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#3a3a5a;line-height:1.8;">
              You're getting this because you subscribed to Prompt Notes.<br/>
              Visionary Vectors · AI Engineering Newsletter
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
