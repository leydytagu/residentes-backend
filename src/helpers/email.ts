import { config } from "../config/config";
import { transporter } from "../config/mailer";

export const environment = config[process.env.NODE_ENV || "desarrollo"];
const { email, from } = environment.email;

export const sendEmail = (to: string, subject: string, html: string) => {
  transporter.sendMail(
    {
      from: `${from} <${email}>`,
      to,
      subject,
      html,
    },
    (error: any, info: any) => {
      if (error) {
        console.log("Error al enviar correo", error);
      } else {
        console.log("Correo enviado");
        console.log(info.envelope);
      }
    }
  );
};
