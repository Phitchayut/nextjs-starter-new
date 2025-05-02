import { NextResponse } from 'next/server';
import { faker } from "@faker-js/faker";


const statuses = ["success", "failed", "processing"];
const role = [
   { id: 1, name: "Admin", scope: 1 },
   { id: 2, name: "User", scope: 1 },
   { id: 3, name: "Guest", scope: 1 },
   { id: 4, name: "Super Admin", scope: 1 },
   { id: 5, name: "Editor", scope: 1 },
   { id: 6, name: "Viewer", scope: 1 },
   { id: 7, name: "Moderator", scope: 1 },
   { id: 8, name: "Contributor", scope: 1 },
   { id: 9, name: "Subscriber", scope: 1 },
   { id: 10, name: "Author", scope: 1 },
   { id: 11, name: "Manager", scope: 1 },
   { id: 12, name: "Developer", scope: 1 },
   { id: 13, name: "Designer", scope: 1 },
   { id: 14, name: "Architect", scope: 1 },
   { id: 15, name: "Engineer", scope: 1 },
   { id: 16, name: "Scientist", scope: 1 },
   { id: 17, name: "Physicist", scope: 1 },
   { id: 18, name: "Chemist", scope: 1 },
   { id: 19, name: "Biologist", scope: 1 },
   { id: 20, name: "Bot", scope: 1 }
];

// Mock data
export const users: Settings[] = [];
for (let i = 0; i < 20; i++) {
   const randomRole = role[Math.floor(Math.random() * role.length)];
   const newUser: Settings = {
      id: i + 1,
      user: {
         name: faker.person.fullName(),
         avatar: faker.image.avatarLegacy(),
         title: faker.person.jobTitle(),
         email: faker.internet.email(),
      },
      role: {
         id: randomRole.id,
         name: randomRole.name,
         scope: randomRole.scope,
      },
      amount: parseFloat(faker.finance.amount({ min: 100, max: 1000 })),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      email: faker.internet.email(),
   };

   users.push(newUser);
}