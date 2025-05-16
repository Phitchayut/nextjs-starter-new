interface Role {
  id: number;
  name: string;
  scope: string[];
}

interface DatabaseRole {
  role_id: number;
  role_name: string;
  role_status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

interface Partner {
  partner_id: number;
  partner_name: string;
  partner_email: string;
  password_hash: string;
  api_key: string;
  status: string;
  create_date: string;
  update_date: string;
  role_id: number;
  role: DatabaseRole;
}

interface UserInfo {
  name: string;
  avatar: string;
  title: string;
  email: string;
}

interface RoleInfo {
  id: number;
  name: string;
  scope: string[];
}

interface Settings {
  id: number;
  user: UserInfo;
  role: RoleInfo;
  amount: number;
  status: string;
  email: string;
}

// Mock data constants
const statuses: string[] = ["A", "I", "O", "P", "S"]; // Active, Inactive, Onboarding, Pending, Suspended
const roles: Role[] = [
  { id: 1, name: "Partner1", scope: ["read", "write", "delete", "manage_users"] },
  { id: 2, name: "Partner2", scope: ["read", "write"] },
  { id: 3, name: "Partner3", scope: ["read"] },
  { id: 4, name: "Partner4", scope: ["read", "write", "manage_users"] },
  { id: 5, name: "Partner5", scope: ["read", "write", "partner_access"] }
];

// Mock function to simulate data from faker.js
function mockFaker() {
  return {
    person: {
      fullName: (): string => {
        const firstNames: string[] = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"];
        const lastNames: string[] = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];

        const firstName: string = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName: string = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
      },
      jobTitle: (): string => {
        const jobTitles: string[] = ["Software Engineer", "Business Analyst", "Marketing Manager", "Data Scientist", "Product Owner",
          "Financial Advisor", "HR Manager", "Sales Representative", "Project Manager", "Operations Director"];
        return jobTitles[Math.floor(Math.random() * jobTitles.length)];
      }
    },
    image: {
      avatarLegacy: (): string => `https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 1000)}.svg`
    },
    internet: {
      email: (firstName?: string, lastName?: string, provider?: string): string => {
        const first = firstName?.toLowerCase() || "user";
        const last = lastName?.toLowerCase() || "example";
        const domains: string[] = provider ? [provider] : ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "dbd.or.th", "example.com"];
        const randomDomain: string = domains[Math.floor(Math.random() * domains.length)];
        return `${first}.${last}@${randomDomain}`;
      }
    },
    finance: {
      amount: (options: { min: number, max: number }): string => {
        const { min, max } = options;
        return (Math.random() * (max - min) + min).toFixed(2);
      }
    }
  };
}

// Create faker instance
const faker = mockFaker();

// Helper function to generate random strings (for password hash and API key)
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate 20 mock partners
const mockPartners: Partner[] = [];
for (let i = 0; i < 20; i++) {
  const randomRoleIndex: number = Math.floor(Math.random() * 3) + 1;
  const randomRole: Role = roles[randomRoleIndex - 1];

  const fullName: string = faker.person.fullName();
  const nameParts: string[] = fullName.split(' ');
  const firstName: string = nameParts[0];
  const lastName: string = nameParts[1] || '';

  const email: string = faker.internet.email(firstName, lastName);

  const randomStatus: string = statuses[Math.floor(Math.random() * statuses.length)];

  const createDate: Date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const updateDate: Date = new Date(createDate);
  updateDate.setDate(updateDate.getDate() + Math.floor(Math.random() * 30));

  const partnerId: number = i + 1;
  const partner: Partner = {
    partner_id: partnerId,
    partner_name: fullName,
    partner_email: email,
    password_hash: `$2b$10${generateRandomString(22)}`,
    api_key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${generateRandomString(36)}.${generateRandomString(43)}`,
    status: randomStatus,
    create_date: createDate.toISOString(),
    update_date: updateDate.toISOString(),
    role_id: randomRole.id,
    role: {
      role_id: randomRole.id,
      role_name: randomRole.name,
      role_status: "A",
      created_at: new Date(2024, 0, 1).toISOString(),
      updated_at: new Date(2024, 0, 1).toISOString(),
      deleted_at: null
    }
  };
  mockPartners.push(partner);
}

// For the Settings[] array shown in the example

const settingsArray: Settings[] = mockPartners.map((partner, index) => {
  const amount: number = parseFloat(faker.finance.amount({ min: 100, max: 1000 }));

  return {
    id: index + 1,
    user: {
      name: partner.partner_name,
      avatar: faker.image.avatarLegacy(),
      title: faker.person.jobTitle(),
      email: partner.partner_email
    },
    role: {
      id: partner.role.role_id,
      name: partner.role.role_name,
      scope: roles.find(r => r.id === partner.role.role_id)?.scope || []
    },
    amount: amount,
    status: partner.status,
    email: partner.partner_email
  };
});

// Export Partner interface and mock data
export interface PartnerData extends Partner { }
export const mockPartnerData: Partner[] = mockPartners;

// Export Settings array for the UI
export const partners: Settings[] = settingsArray;

// Log output for demonstration
// console.log(JSON.stringify(mockPartners, null, 2));
// console.log(JSON.stringify(settingsArray, null, 2));