import nodemailer from "nodemailer"
import {SMTP_USER, SMTP_PASS, SENDER_MAIL_ADDRESS} from "./env.config.js"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});


export const sendTokenMail = async ({ token, to, type }) => {
    // Define content based on the type
    const isVerify = type === 'verify';
    
    const subject = isVerify ? "Verify your email address" : "Reset your password";
    const title = isVerify ? "Confirm Your Email" : "Password Reset Request";
    const bodyText = isVerify 
        ? "Please use the following code to verify your account:" 
        : "A password reset was requested. Use this code to change your password:";

    try {
        const info = await transporter.sendMail({
            from: SENDER_MAIL_ADDRESS,
            to,
            subject,
            text: `${bodyText} ${token}`,
            html: `
                <div style="font-family: sans-serif; max-width: 400px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #333;">${title}</h2>
                    <p style="color: #555;">${bodyText}</p>
                    <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 4px;">
                        ${token}
                    </div>
                    <p style="font-size: 12px; color: #888; margin-top: 20px;">
                        If you didn't request this, you can safely ignore this email.
                    </p>
                </div>
            `
        });

        console.log(`Email sent: ${type} - ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Error sending ${type} email: ${error.message}`);
        throw error;
    }
};