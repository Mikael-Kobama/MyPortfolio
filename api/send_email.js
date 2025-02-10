import nodemailer from "nodemailer";

export default async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  // Configuração do transportador (use suas credenciais)
  const transporter = nodemailer.createTransport({
    service: "gmail", // Pode usar outro serviço como Outlook, SMTP próprio, etc.
    auth: {
      user: process.env.EMAIL_USER, // Seu email
      pass: process.env.EMAIL_PASS, // Sua senha ou App Password (Gmail)
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Para quem o email será enviado
      subject: "Nova mensagem do site",
      text: message,
    });

    return res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao enviar email", details: error });
  }
}
