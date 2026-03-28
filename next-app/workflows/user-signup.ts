import { sleep } from 'workflow';
import crypto from 'node:crypto';

type User = {
  id: string;
  email: string;
};

export async function handleUserSignup(email: string) {
  'use workflow';

  const user = await createUser(email);
  await sendWelcomeEmail(user);
  await sleep('5s');
  await sendOnboardingEmail(user);

  return {
    userId: user.id,
    status: 'onboarded' as const,
  };
}

async function createUser(email: string): Promise<User> {
  'use step';

  console.log(`Creating user with email: ${email}`);
  return { id: crypto.randomUUID(), email };
}

async function sendWelcomeEmail(user: User): Promise<void> {
  'use step';

  console.log(`Sending welcome email to user: ${user.id}`);
}

async function sendOnboardingEmail(user: User): Promise<void> {
  'use step';

  console.log(`Sending onboarding email to user: ${user.id}`);
}
