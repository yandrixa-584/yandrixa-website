import nodemailer from "nodemailer";

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  from: process.env.SMTP_FROM
};

const hasSmtpConfig = Boolean(
  smtpConfig.host && smtpConfig.port && smtpConfig.user && smtpConfig.pass && smtpConfig.from
);

const createTransport = () =>
  nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: smtpConfig.user && smtpConfig.pass ? { user: smtpConfig.user, pass: smtpConfig.pass } : undefined
  });

export const sendMail = async ({
  subject,
  html,
  to,
  replyTo
}: {
  subject: string;
  html: string;
  to: string;
  replyTo?: string;
}) => {
  if (!hasSmtpConfig) {
    return {
      delivered: false,
      mode: "development",
      reason: "SMTP credentials are not configured."
    } as const;
  }

  const transport = createTransport();

  await transport.sendMail({
    from: smtpConfig.from,
    to,
    subject,
    html,
    replyTo
  });

  return {
    delivered: true,
    mode: "smtp"
  } as const;
};

export const buildSubmissionEmail = (title: string, rows: Array<[string, string]>) => {
  const items = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #d7ddea;font-weight:600;background:#f5f7fb;">${label}</td><td style="padding:10px 12px;border:1px solid #d7ddea;">${value || "-"}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f3f5fb;padding:24px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dde3ef;">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#7B3FE4,#111522);color:#ffffff;">
          <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;">Yandrixa Smart Solutions</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">${title}</h1>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.55;">${items}</table>
        </div>
      </div>
    </div>
  `;
};
