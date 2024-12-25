"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer")); // Use ES module syntax for imports
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
class EmailService {
    constructor() {
        // Set up Nodemailer transport
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_PROVIDER,
            port: Number(process.env.SERVICE_PORT), // Ensure port is a number
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        // Define the path to the email template
        this.welcomeTemplatePath = path_1.default.join(__dirname, "../views/welcome.hbs");
    }
    // Method to read the email template file
    readTemplateFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield promises_1.default.readFile(this.welcomeTemplatePath, "utf-8");
            }
            catch (error) {
                throw new Error(`Error reading email template file: ${error}`);
            }
        });
    }
    // Method to send an email without using a template
    sendEmail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: data.subject,
                    text: data.text || "", // Optional plain text fallback
                });
                console.log(`Message sent: ${info.response}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Error sending email: ${error.message}`);
                }
                else {
                    console.error("Unknown error occurred while sending email");
                }
            }
        });
    }
    // Method to send an email using a template
    sendEmailWithTemplate(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Read and compile the template
                const templateSource = yield this.readTemplateFile();
                const emailTemplate = handlebars_1.default.compile(templateSource);
                const info = yield this.transporter.sendMail({
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
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Error sending email with template: ${error.message}`);
                }
                else {
                    console.error("Unknown error occurred while sending email with template");
                }
            }
        });
    }
}
exports.default = new EmailService(); // Use ES module syntax to export
