jest.mock("../services/email.service", () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}));

const { sendEmail } = require("../services/email.service");

describe("Email Service", () => {
  test("Send email (mock)", async () => {
    await sendEmail("abhishek.ajha04@gmail.com", []);

    expect(sendEmail).toHaveBeenCalled();
  });
});

afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});