// app/api/route.ts
import { NextResponse } from 'next/server';
import { mockPartnerData } from './data';
import { faker } from "@faker-js/faker";

const getNextId = (): number => {
   const ids = mockPartnerData.map((partner) => partner.partner_id);
   const maxId = ids.length ? Math.max(...ids) : 0;
   return maxId + 1;
};
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
// Handle GET requests
export async function GET() {
   return NextResponse.json(mockPartnerData);
}

export async function POST(req: Request) {
   try {
      const body = await req.json();
      console.log("Creating new partner:", body);

      // Create a new partner with proper structure
      const newPartner: Partner = {
         partner_id: getNextId(),
         partner_name: body.user?.name || body.partner_name || "New Partner",
         partner_email: body.email || body.partner_email || faker.internet.email(),
         password_hash: `$2b$10${generateRandomString(22)}`,
         api_key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${generateRandomString(36)}.${generateRandomString(43)}`,
         status: body.status || "A",
         create_date: new Date().toISOString(),
         update_date: new Date().toISOString(),
         role_id: body.role?.id || 5, // Default to Partner role if not specified
         role: {
            role_id: body.role?.id || 5,
            role_name: body.role?.name || "Partner",
            role_status: "A",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null
         }
      };

      // Add to in-memory list
      mockPartnerData.push(newPartner);

      // Also create a settings entry for UI if the structure matches
      return NextResponse.json(newPartner, { status: 201 });
   } catch (error) {
      console.error("Error creating partner:", error);
      return NextResponse.json(
         { error: "Failed to create partner" },
         { status: 400 }
      );
   }
}
