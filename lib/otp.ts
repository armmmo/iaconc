
// Stub OTP sending and verifying

export async function sendEmailOtp(email: string, otp: string) {
  console.log(`Sending email OTP ${otp} to ${email}`);
  // TODO: integrate your email provider here
  return true;
}

export async function sendSmsOtp(phone: string, otp: string) {
  console.log(`Sending SMS OTP ${otp} to ${phone}`);
  // TODO: integrate your SMS/WhatsApp open-source API here
  return true;
}

export async function verifyOtp(userInput: string, actualOtp: string) {
  return userInput === actualOtp;
}
