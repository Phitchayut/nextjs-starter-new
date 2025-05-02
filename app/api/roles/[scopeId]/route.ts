import { NextResponse } from 'next/server';
import { getRolesByScope } from '../data';

export async function GET(
   req: Request,
   { params }: { params: { scopeId: string } }
) {
   const scopeId = parseInt(params.scopeId);
   console.log("scopeId", scopeId);
   
   const roles = await getRolesByScope(scopeId);
   console.log("scope_roles: ");
   console.log(scopeId, roles);

   return NextResponse.json({ scopeId, roles });
}