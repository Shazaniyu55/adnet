const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail', // Gmail service
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Your app-specific password (zhjbgjbpmmxfbbyh)
  },

  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificates
  },
});

// Function to send an email
const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'rachaelomiachi247@gmail.com', // Sender address
    to: options.email, // Recipient address
    subject: options.subject, // Subject line
    text: options.message, // Plain text body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
