import { NextResponse } from 'next/server';
import { faker } from "@faker-js/faker";

const statuses = ["success", "failed", "processing"];
// Mock data
export const users: Settings[] = [];
for (let i = 0; i < 20; i++) {
   const newUser: Settings = {
      id: i + 1,
      user: {
         name: faker.person.fullName(),
         avatar: faker.image.avatarLegacy(),
         title: faker.person.jobTitle(),
         email: faker.internet.email(),
      },
      amount: parseFloat(faker.finance.amount({ min: 100, max: 1000 })),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      email: faker.internet.email(),
   };

   users.push(newUser);
}

const getNextId = () => {
   const ids = users.map((u) => u.id);
   const maxId = ids.length ? Math.max(...ids) : 0;
   return maxId + 1;
 };