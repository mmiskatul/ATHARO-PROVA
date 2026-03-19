type EmailPayload = {
  email: string;
  name: string;
  verificationUrl?: string;
  resetUrl?: string;
};

async function sendDevEmail(subject: string, payload: EmailPayload) {
  console.info(`[email:${subject}]`, payload);
}

export async function sendVerificationEmail(payload: Required<Pick<EmailPayload, "email" | "name" | "verificationUrl">>) {
  await sendDevEmail("verification", payload);
}

export async function sendPasswordResetEmail(payload: Required<Pick<EmailPayload, "email" | "name" | "resetUrl">>) {
  await sendDevEmail("password-reset", payload);
}
