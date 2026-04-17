require("dotenv").config();
const { sendEmail } = require("../../services/email.service");

(async () => {
  console.log("🚀 Testing Email...");

  await sendEmail("your_email@gmail.com", [
    {
      category: "gold",
      summary: "This is a real test email 🚀"
    }
  ]);

  console.log("✅ Email sent! Check inbox");

  process.exit();
})();