const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (email, summaries) => {

  let content = "";

  summaries.forEach(s => {
    content += `
      <div style="margin-bottom: 20px; padding: 15px; border-radius: 10px; background-color: #f9fafb;">
        <h3 style="margin: 0 0 10px 0; color: #111827; font-size: 18px;">
          ${s.category}
        </h3>
        <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 14px;">
          ${s.summary}
        </p>
      </div>
    `;
  });

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f3f4f6; padding: 30px;">
      
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 25px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            📰 Daily News Brief
          </h1>
          <p style="color: #dbeafe; margin-top: 8px; font-size: 14px;">
            Stay updated. Stay ahead.
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 25px;">
          ${content}
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: #f9fafb; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">You're receiving this because you subscribed to Daily Brief.</p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Your Company</p>
        </div>

      </div>

    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "📰 Your Daily News Brief",
      html
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};