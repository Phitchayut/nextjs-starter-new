import { NextResponse } from 'next/server';
import { faker } from "@faker-js/faker";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
