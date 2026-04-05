import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  return resend.emails.send({
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
  return resend.batch.send(messages);
}
