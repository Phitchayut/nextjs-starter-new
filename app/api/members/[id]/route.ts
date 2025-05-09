import { NextResponse } from 'next/server';
import { partners } from '../data';

interface Params {
   params: {
      id: string;
   };
}

export async function GET(req: Request, { params }: Params) {
   const { id } = params;

   const user = partners.find((u) => u.id === Number(id));

   if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: Params) {
   const { id } = params;
   const index = partners.findIndex((u) => u.id === Number(id));

   if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   const body = await req.json();

   const updatedUser: Settings = {
      id: partners[index].id, // keep the same ID
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

   partners[index] = updatedUser;

   return NextResponse.json(updatedUser);
}

export async function PATCH(req: Request, { params }: Params) {
   const { id } = params;
   const index = partners.findIndex((u) => u.id === Number(id));

   if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   const body = await req.json();

   // Merge only provided fields (shallow merge)
   if (body.user) {
      partners[index].user = {
         ...partners[index].user,
         ...body.user,
      };
   }

   if (body.amount !== undefined) {
      partners[index].amount = body.amount;
   }

   if (body.status !== undefined) {
      partners[index].status = body.status;
   }

   if (body.email !== undefined) {
      partners[index].email = body.email;
   }

   return NextResponse.json(partners[index]);
}

export async function DELETE(req: Request, { params }: Params) {
   const { id } = params;
   const index = partners.findIndex((u) => u.id === Number(id));

   if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
   }

   partners.splice(index, 1);

   return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
