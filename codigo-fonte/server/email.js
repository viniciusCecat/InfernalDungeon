import nodemailer from 'nodemailer';

const requiredEmailVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM'];

function isEmailConfigured() {
  return requiredEmailVars.every((key) => Boolean(process.env[key]));
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendEmail({ to, subject, text, html }) {
  if (!isEmailConfigured()) {
    return {
      sent: false,
      reason: 'SMTP não configurado.',
    };
  }

  try {
    const transporter = createTransporter();
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    return {
      sent: true,
      messageId: result.messageId,
    };
  } catch (error) {
    return {
      sent: false,
      reason: error instanceof Error ? error.message : 'Falha ao enviar e-mail.',
    };
  }
}

export function getEmailConfigStatus() {
  return {
    configured: isEmailConfigured(),
    from: process.env.EMAIL_FROM ?? null,
  };
}

export async function sendWelcomeEmail(user) {
  return sendEmail({
    to: user.email,
    subject: 'Cadastro confirmado - Infernal Dungeon',
    text: `Olá, ${user.name}. Sua conta na wiki Infernal Dungeon foi criada com sucesso.`,
    html: `
      <h1>Infernal Dungeon</h1>
      <p>Olá, <strong>${user.name}</strong>.</p>
      <p>Sua conta na wiki Infernal Dungeon foi criada com sucesso.</p>
    `,
  });
}

export async function sendOrderEmail(order) {
  if (!order) {
    return {
      sent: false,
      reason: 'Pedido não encontrado para envio.',
    };
  }

  const items = order.items
    .map((item) => `${item.quantity}x ${item.itemName}`)
    .join(', ');

  return sendEmail({
    to: order.customerEmail,
    subject: 'Pedido recebido - Relicário do Abismo',
    text: `Olá, ${order.customerName}. Seu pedido foi recebido: ${items}. Total: R$ ${order.totalValue.toFixed(2)}.`,
    html: `
      <h1>Relicário do Abismo</h1>
      <p>Olá, <strong>${order.customerName}</strong>.</p>
      <p>Seu pedido foi recebido.</p>
      <p><strong>Itens:</strong> ${items}</p>
      <p><strong>Total:</strong> R$ ${order.totalValue.toFixed(2)}</p>
    `,
  });
}
