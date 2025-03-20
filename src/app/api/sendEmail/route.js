import nodemailer from 'nodemailer';

export async function POST(request) {
    const { name, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Contato de ${name}: ${subject}`,
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'E-mail enviado com sucesso!' }), { status: 200 });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return new Response(JSON.stringify({ error: 'Erro ao enviar e-mail' }), { status: 500 });
    }
}
