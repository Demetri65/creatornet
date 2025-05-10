import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Prisma client instance
import bcrypt from 'bcryptjs'; // For password hashing

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  // Basic validation
  if (!email || !password || !username) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  // Hash password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Registering user with:', { email, username, hashedPassword });

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash: hashedPassword,
    },
  });

  // Respond with minimal user info
  return NextResponse.json({ userId: user.id });
}