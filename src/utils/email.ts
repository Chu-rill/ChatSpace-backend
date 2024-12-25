import nodemailer from "nodemailer"; // Use ES module syntax for imports
import fs from "fs/promises";
import handlebars from "handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

class EmailService {
  private transporter: nodemailer.Transporter; // Define transporter type
  private welcomeTemplatePath: string; // Define template path type

  constructor() {
    // Set up Nodemailer transport
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_PROVIDER,
      port: Number(process.env.SERVICE_PORT), // Ensure port is a number
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the path to the email template
    this.welcomeTemplatePath = path.join(__dirname, "../views/welcome.hbs");
  }

  // Method to read the email template file
  private async readTemplateFile(): Promise<string> {
    try {
      return await fs.readFile(this.welcomeTemplatePath, "utf-8");
    } catch (error) {
      throw new Error(`Error reading email template file: ${error}`);
    }
  }

  // Method to send an email without using a template
  public async sendEmail(
    email: string,
    data: { subject: string; text?: string }
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: data.subject,
        text: data.text || "", // Optional plain text fallback
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

  // Method to send an email using a template
  public async sendEmailWithTemplate(
    email: string,
    data: { subject: string; username: string }
  ): Promise<void> {
    try {
      // Read and compile the template
      const templateSource = await this.readTemplateFile();
      const emailTemplate = handlebars.compile(templateSource);

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: data.subject,
        html: emailTemplate({
          PlatformName: "Express Template",
          Username: data.username,
          title: "Welcome Email",
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
}

export default new EmailService(); // Use ES module syntax to export
