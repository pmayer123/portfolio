const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the index.html from the frontend folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Your POST route for the form submission
app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "pmayer0289@gmail.com",
            pass: "zdmv gyyi irel gtls",
        },
    });

    const mailOptions = {
        from: email,
        to: "pmayer0289@gmail.com",
        subject: `Contact from ${name}: ${subject}`,
        text: `You received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({success:false});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({success:true});
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});