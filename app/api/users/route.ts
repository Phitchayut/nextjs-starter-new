// app/api/route.ts
import { NextResponse } from 'next/server';
import { users } from './data';

// Handle GET requests
export async function GET() {
   return NextResponse.json(users);
}

const getNextId = () => {
   const ids = users.map((u) => u.id);
   const maxId = ids.length ? Math.max(...ids) : 0;
   return maxId + 1;
 };
export async function POST(req: Request) {
   const body = await req.json();
   console.log(body);

   const newUser: Settings = {
      id: getNextId(),
      user: {
         name: body.user.name,
         avatar: body.user.avatar,
         title: body.user.title,
         email: body.user.email,
      },
      amount: body.amount,
      status: body.status,
      email: body.email,
   };

   users.push(newUser); // Add to temporary list (in-memory only)

   return NextResponse.json(newUser, { status: 201 });
}
