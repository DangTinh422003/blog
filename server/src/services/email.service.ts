import nodemailer from 'nodemailer';

export default class EmailService {
  replacedEmailTemplate(
    template: string,
    replaceValues: Record<string, string>[],
  ) {
    return replaceValues.reduce(
      (acc, replaceValue) => acc.replace(replaceValue.key, replaceValue.value),
      template,
    );
  }

  initTransporter(
    host: string,
    auth: {
      user: string;
      pass: string;
    },
  ) {
    return nodemailer.createTransport({
      host,
      port: 465,
      secure: true,
      auth,
    });
  }

  async sendMail(
    transporter: nodemailer.Transporter,
    mailOptions: nodemailer.SendMailOptions,
  ): Promise<nodemailer.SentMessageInfo> {
    return transporter.sendMail(mailOptions);
  }
}
