import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Seu e-mail configurado no transporter
            to: 'seuemail@gmail.com', // O e-mail que vai receber a mensagem
            subject: `Contato de ${name}: ${subject}`,
            text: `Nome: ${name}\nE-mail: ${email}\nMensagem:\n${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ error: 'Erro ao enviar e-mail' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
