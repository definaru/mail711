//require('dotenv').config()
import nodemailer from 'nodemailer'

export function Main(req, res, next) {

    var transporter = nodemailer.createTransport({
        host: 'smtp.spaceweb.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    })

    var mailOptions = {
        from: 'Defina Account <info@defina.ru>',
        to: req.query.email,
        subject: '✔ Успешная регистрация',
        html: `
            <div>
                <h1>Здравствуйте, ${req.query.name}</h1>
                <p>
                    Поздравляем, вы успешно зарегистрировались на нашей <br />
                    платформе "Shop Me". Чтобы продолжить, нажмите:
                </p>
                <p><a href="https://shopme.ee/?=${req.query.token}">Активировать</a></p>
            </div>
        `
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error)
        } else {
            console.log('Email sent: ' + info.response)
            console.log("Message sent: %s", info.messageId)
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        }
    })

    next()
}