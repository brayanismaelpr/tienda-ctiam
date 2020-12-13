const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = async function sendEmail(email, callback) {
    try {
        let transporter = nodemailer.createTransport(
            smtpTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASS,
                },
            })
        );
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Bienvenido a tienda CTIAM",
            text: `Cordial saludo hemos recibido su solicitud de suscripción, no tardaremos en mantenerte al tanto en nuestra variedad de productos, ¡sé paciente!`,
            html: `<div style="background-color: #f4f4f4; width: 100%; padding-top: 50px; padding-bottom: 50px;">
            <div style="background-color: #ffffff; margin-left: auto; margin-right: auto; text-align: center; width: 512px;">
                <div style="margin-left: auto; margin-right: auto; padding-bottom: 40px; padding-top: 40px; width: 100%;">
                    <img style="margin-left: auto; margin-right: auto; padding-bottom: 20px; width: 200px;" style="" src="http://siaweb.ufps.edu.co/assets/imagen/logo-original.png">
                    <div style="background-color: #C50084; text-align: center; width: 100%;">
                        <p style="color: white; font-size: 22px; font-family: Arial, Helvetica, sans-serif; padding-bottom: 10px; padding-top: 10px;">Cordial saludo</p>
                    </div>
                    <div style="font-family: Arial, Helvetica, sans-serif; margin-left: auto; margin-right: auto; padding-bottom: 50px; padding-top: 50px; width: 80%; text-align: left;">
                        <p style="font-size: 25px; margin-bottom: 20px;">Notificación</p>
                        <p style="color: #626262;">Hemos recibido su solicitud de suscripción, no tardaremos en mantenerte al tanto en nuestra variedad de productos, ¡sé paciente!</p>
                    </div>
                    <div style="align-items: center; display: flex; justify-content: space-between; margin-left: auto; margin-right: auto; width: 80%;">
                        <div style="background-color: #C50084; padding: 9px 0; width: 150px;">
                            <a style="font-family: Arial, Helvetica, sans-serif; text-decoration: none; color: #ffffff; width: 100%;" href="">Ver página</a>
                        </div>
                        <div>
                            <a href="">
                                <img style="width: 40px;" src="http://siaweb.ufps.edu.co/assets/imagen/instagramAsterioide.png">
                            </a>
                            <a href="">
                                <img style="width: 40px;" src="http://siaweb.ufps.edu.co/assets/imagen/facebookAsterioide.png">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    
            <div style="text-align: center; padding-top: 30px;">
                <p style="font-size: 14px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 30px;">
                    Estás recibiendo este correo porque actualmente estás <br>
                    suscrito a notificaciones de Asteroide.
                </p>
                <a style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; text-decoration: none;" href="">© Asteroide 2020</a>
            </div>
        </div>`,
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
};
