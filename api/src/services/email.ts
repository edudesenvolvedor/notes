import * as nodemailer from 'nodemailer';
import * as process from 'node:process';
import { defaultTemplateRecoveryPassword } from '../helpers/email-templates/recovery-password';

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT) || 1025,
  secure: false,
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASSWORD
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      : undefined,
});

async function send(
  from: string,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);
}

export const sendEmailRecoveryAccount = async (
  email: string,
  token: string,
): Promise<boolean> => {
  console.log(`Sending recovery account with email: ${email}, token: ${token}`);
  await send(
    'suport@notes.com',
    'joe@doe.com',
    'Recuperação de senha',
    defaultTemplateRecoveryPassword(token),
  );
  return new Promise((resolve) => {
    resolve(true);
  });
};
