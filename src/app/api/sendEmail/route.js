import nodemailer from 'nodemailer';

export async function POST(request) {
    console.log('Recebendo requisição para enviar e-mail...');

    try {
        const { name, email, subject, message } = await request.json();
        console.log('Dados recebidos:', { name, email, subject, message });

        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey', // SendGrid exige que 'user' seja literalmente 'apikey'
                pass: process.env.SENDGRID_API_KEY,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Contato de ${name}: ${subject}`,
            text: `Nome: ${name}\nE-mail: ${email}\nMensagem:\n${message}`,
        };

        console.log('Enviando e-mail...');
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso:', info);

        return new Response(JSON.stringify({ message: 'E-mail enviado com sucesso!' }), { status: 200 });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return new Response(JSON.stringify({ error: 'Erro ao enviar e-mail', details: error.message }), {
            status: 500,
        });
    }
}
