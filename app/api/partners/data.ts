import { faker } from "@faker-js/faker";

const statuses = ["success", "failed", "processing"];
const role = [
   { id: 1, name: "DBD", scope: 2 },
   { id: 2, name: "DBD", scope: 2 },
   { id: 3, name: "DBD", scope: 2 },
   { id: 4, name: "DBD", scope: 2 },
   { id: 5, name: "DBD", scope: 2 },
   { id: 6, name: "DBD", scope: 2 },
   { id: 7, name: "DBD", scope: 2 },
   { id: 8, name: "DBD", scope: 2 },
   { id: 9, name: "DBD", scope: 2 },
   { id: 10, name: "DBD", scope: 2 },
   { id: 11, name: "DBD", scope: 2 },
   { id: 12, name: "DBD", scope: 2 },
   { id: 13, name: "DBD", scope: 2 },
   { id: 14, name: "DBD", scope: 2 },
   { id: 15, name: "DBD", scope: 2 },
   { id: 16, name: "DBD", scope: 2 },
   { id: 17, name: "DBD", scope: 2 },
   { id: 18, name: "DBD", scope: 2 },
   { id: 19, name: "DBD", scope: 2 },
   { id: 20, name: "DBD", scope: 2 }
];

// Mock data
export const partners: Settings[] = [];
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

   partners.push(newUser);
}