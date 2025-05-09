import { faker } from "@faker-js/faker";

const statuses = ["success", "failed", "processing"];
const role = [
   { id: 1, name: "Member", scope: 3 },
   { id: 2, name: "Member", scope: 3 },
   { id: 3, name: "Member", scope: 3 },
   { id: 4, name: "Member", scope: 3 },
   { id: 5, name: "Member", scope: 3 },
   { id: 6, name: "Member", scope: 3 },
   { id: 7, name: "Member", scope: 3 },
   { id: 8, name: "Member", scope: 3 },
   { id: 9, name: "Member", scope: 3 },
   { id: 10, name: "Member", scope: 3 },
   { id: 11, name: "Member", scope: 3 },
   { id: 12, name: "Member", scope: 3 },
   { id: 13, name: "Member", scope: 3 },
   { id: 14, name: "Member", scope: 3 },
   { id: 15, name: "Member", scope: 3 },
   { id: 16, name: "Member", scope: 3 },
   { id: 17, name: "Member", scope: 3 },
   { id: 18, name: "Member", scope: 3 },
   { id: 19, name: "Member", scope: 3 },
   { id: 20, name: "Member", scope: 3 }
];

// Mock data
export const members: Settings[] = [];
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

   members.push(newUser);
}