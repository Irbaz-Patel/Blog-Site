// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { name, email, message } = body;

//         // Simulate successful processing of form data
//         console.log('Form data received:', name, email, message);

//         return new Response(
//             JSON.stringify({ message: 'Your message has been sent successfully!' }),
//             { status: 200, headers: { 'Content-Type': 'application/json' } }
//         );
//     } catch (error) {
//         console.error('Error handling request:', error);
//         return new Response(
//             JSON.stringify({ message: 'An error occurred. Please try again later.' }),
//             { status: 500, headers: { 'Content-Type': 'application/json' } }
//         );
//     }
// }

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Set up NodeMailer transport using environment variables for email credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can choose other email services
            auth: {
                user: process.env.EMAIL_USER, // Use the environment variable for email
                pass: process.env.EMAIL_PASS, // Use the environment variable for the app password
            },
        });

        // Define email options
        const mailOptions = {
            from: email, // Sender's email
            to: process.env.EMAIL_USER, // Recipient's email (your email)
            subject: `New message from ${name}`, // Subject of the email
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Body of the email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ message: 'Your message has been sent successfully!' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error handling request:', error);
        return new Response(
            JSON.stringify({ message: 'An error occurred. Please try again later.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}


