import nodemailer from "nodemailer";
import fs from "fs/promises";
import handlebars from "handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  private transporter: nodemailer.Transporter;
  private welcomeTemplatePath: string;
  //   private newsLetterPath: string;
  //   private resetPasswordTemplatePath: string;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_PROVIDER,
      port: Number(process.env.SERVICE_PORT),
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.welcomeTemplatePath = path.join(__dirname, "../views/validate.hbs");
    // this.newsLetterPath = path.join(__dirname, "../views/newsletter.hbs");
    // this.resetPasswordTemplatePath = path.join(
    //   __dirname,
    //   "../views/forgetPassword.hbs"
    // );
  }

  // Method to read the email template file based on a path
  private async readTemplateFile(templatePath: string): Promise<string> {
    try {
      return await fs.readFile(templatePath, "utf-8");
    } catch (error) {
      throw new Error(`Error reading email template file: ${error}`);
    }
  }

  // Method to send an email without a template
  public async sendEmail(
    email: string,
    data: { subject: string; text?: string }
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: data.subject,
        text: data.text || "",
      });
      console.log(`Message sent: ${info.response}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error sending email: ${error.message}`);
      } else {
        console.error("Unknown error occurred while sending email");
      }
    }
  }

  // Method to send an email with the welcome template
  public async sendEmailWithTemplate(
    email: string,
    data: { subject: string; username: string; OTP: string }
  ): Promise<void> {
    try {
      const templateSource = await this.readTemplateFile(
        this.welcomeTemplatePath
      );
      const emailTemplate = handlebars.compile(templateSource);

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: data.subject,
        html: emailTemplate({
          PlatformName: "ShopHub",
          Username: data.username,
          title: "Welcome Email",
          OTP: data.OTP,
        }),
      });

      console.log(`Message sent: ${info.response}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error sending email with template: ${error.message}`);
      } else {
        console.error(
          "Unknown error occurred while sending email with template"
        );
      }
    }
  }

  // Method to send a reset password email with a template
  //   public async sendResetPasswordEmail(
  //     email: string,
  //     data: { subject: string; OTP: string }
  //   ): Promise<void> {
  //     try {
  //       // Read and compile the reset password template
  //       const templateSource = await this.readTemplateFile(
  //         this.resetPasswordTemplatePath
  //       );
  //       const emailTemplate = handlebars.compile(templateSource);

  //       const info = await this.transporter.sendMail({
  //         from: process.env.EMAIL_USER,
  //         to: email,
  //         subject: data.subject,
  //         html: emailTemplate({
  //           OTP: data.OTP, // Include OTP in the email template
  //         }),
  //       });

  //       console.log(`Reset password email sent: ${info.response}`);
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         console.error(`Error sending reset password email: ${error.message}`);
  //       } else {
  //         console.error(
  //           "Unknown error occurred while sending reset password email"
  //         );
  //       }
  //     }
  //   }

  //method to send newletter email
  //   public async sendNewsLetterEmail(email: string): Promise<void> {
  //     try {
  //       // Read and compile the reset password template
  //       const templateSource = await this.readTemplateFile(this.newsLetterPath);
  //       const emailTemplate = handlebars.compile(templateSource);

  //       const info = await this.transporter.sendMail({
  //         from: process.env.EMAIL_USER,
  //         to: email,
  //         subject: "ShopHub Newsletter",
  //         html: emailTemplate({}),
  //       });

  //       console.log(`News letter email sent: ${info.response}`);
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         console.error(`Error sending newsletter email: ${error.message}`);
  //       } else {
  //         console.error("Unknown error occurred while sending newsletter email");
  //       }
  //     }
  //   }
}

export default new EmailService();
