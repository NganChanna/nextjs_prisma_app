"use server";

import transporter from "@/lib/nodemailer";

/**
 * @Email Template Helper
 */ 

const generateEmailTemplate = (subject: string, description: string, link: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 1px solid #eeeeee; padding-bottom: 20px; margin-bottom: 20px; }
        .heading { color: #333333; font-size: 24px; margin: 0; }
        .content { color: #555555; font-size: 16px; line-height: 1.6; }
        .button-container { text-align: center; margin-top: 30px; }
        .button { display: inline-block; background-color: #007bff; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .footer { margin-top: 30px; font-size: 12px; color: #999999; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="heading">SecureStart</h1>
        </div>
        <div class="content">
          <h2 style="font-size: 20px; color: #333;">${subject}</h2>
          <p>${description}</p>
          <div class="button-container">
            <a href="${link}" class="button">View Action</a>
          </div>
        </div>
        <div class="footer">
          <p>If you did not request this email, please ignore it.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};


export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {

  /**
   * @Generate the HTML using the helper function
   */ 
  const htmlContent = generateEmailTemplate(subject, meta.description, meta.link);

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `SecureStart - ${subject}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[SendEmail]: Email sent to ${to}`);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]: Error sending email:", err);
    return { success: false, error: "Failed to send email" };
  }
}