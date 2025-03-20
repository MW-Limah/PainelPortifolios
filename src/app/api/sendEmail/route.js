import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Configuração do transporte
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seuemail@gmail.com', // Seu e-mail
                pass: 'suasenha', // Sua senha ou App Password se tiver 2FA ativado
            },
        });

        // Configuração do e-mail
        const mailOptions = {
            from: email,
            to: 'seuemail@gmail.com', // Para onde o e-mail será enviado
            subject: `Contato de ${name}: ${subject}`,
            text: message,
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
