import nodemailer from "nodemailer";
import { APP_PASS, MAIL } from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: MAIL,
        pass: APP_PASS
    }
});

export default transporter;