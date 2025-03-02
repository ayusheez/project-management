const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // Configure your email service here
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const createNotification = async (recipientId, type, title, message, reference, referenceModel) => {
    try {
        const notification = new Notification({
            recipient: recipientId,
            type,
            title,
            message,
            reference,
            referenceModel
        });

        await notification.save();
        
        // Emit socket event for real-time notification
        global.io.to(recipientId.toString()).emit('notification', notification);

        return notification;
    } catch (error) {
        console.error('Notification creation failed:', error);
        throw error;
    }
};

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
};

module.exports = {
    createNotification,
    sendEmail
};