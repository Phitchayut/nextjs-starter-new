import { NextResponse } from 'next/server';
import { users } from '../data';

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

export async function PUT(req: Request, { params }: Params) {
   const { id } = params;
   const index = users.findIndex((u) => u.id === Number(id));

   if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   const body = await req.json();

   const updatedUser: Settings = {
      id: users[index].id, // keep the same ID
      user: {
         name: body.user.name,
         avatar: body.user.avatar,
         title: body.user.title,
         email: body.user.email,
      },
      role:{
         id: body.role.id,
         name: body.role.name,
         scope: body.role.scope,
      },
      amount: body.amount,
      status: body.status,
      email: body.email,
   };

   users[index] = updatedUser;

   return NextResponse.json(updatedUser);
}

export async function PATCH(req: Request, { params }: Params) {
   const { id } = params;
   const index = users.findIndex((u) => u.id === Number(id));

   if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   const body = await req.json();

   // Merge only provided fields (shallow merge)
   if (body.user) {
      users[index].user = {
         ...users[index].user,
         ...body.user,
      };
   }

   if (body.amount !== undefined) {
      users[index].amount = body.amount;
   }

   if (body.status !== undefined) {
      users[index].status = body.status;
   }

   if (body.email !== undefined) {
      users[index].email = body.email;
   }

   return NextResponse.json(users[index]);
}

export async function DELETE(req: Request, { params }: Params) {
   const { id } = params;
   const index = users.findIndex((u) => u.id === Number(id));

   if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   users.splice(index, 1);

   return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
