const nodemailer = require('nodemailer');
require('dotenv').config();

class WelcomeEmailService {
  constructor() {
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendWelcomeEmail(formData) {
    const { name, email, message } = formData;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome to GuardEye, ${name}!`,
      html: `
        <h2>Welcome to GuardEye!</h2>
        <p>${message}</p>
        <hr>
        <p><em>Thank you for registering with GuardEye.</em></p>
      `,
      replyTo: process.env.EMAIL_USER
    };

    try {
      console.log('Sending welcome email to:', email);
      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Welcome email sent successfully.' };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new Error('Failed to send welcome email: ' + error.message);
    }
  }
}

module.exports = new WelcomeEmailService();