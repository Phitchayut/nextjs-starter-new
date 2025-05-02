import { NextResponse } from 'next/server';

interface Params {
   scopeId: {
      id: string;
   }
}

export async function GET(req: Request, { scopeId }: Params) {
   const { id } = scopeId;

   const user = users.find((u) => u.id === Number(id));

   if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   return NextResponse.json(user);
}