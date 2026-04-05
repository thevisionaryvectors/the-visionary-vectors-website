import { Resend } from 'resend';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  return getResend().emails.send({
    from: 'Prompt Notes <promptnotes@thevisionaryvectorsblog.com>',
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
}

export async function sendBatchEmails(
  emails: { to: string; subject: string; html: string }[]
) {
  const messages = emails.map(({ to, subject, html }) => ({
    from: 'Prompt Notes <promptnotes@thevisionaryvectorsblog.com>',
    to: [to],
    subject,
    html,
  }));
  return getResend().batch.send(messages);
}
