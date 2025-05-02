// services/userService.ts
// import { httpClient } from '@/config/axios.config';

export const getRolesByScope = async (scopeId: number) => {
  let selectedRoles: string[] = [];

  const role_1 = [
    "Admin",
    "User",
    "Guest",
    "Super Admin",
    "Editor",
    "Viewer",
    "Moderator",
    "Contributor",
  ];

  const role_2 = [
    "Subscriber",
    "Author",
    "Manager",
    "Developer",
    "Designer",
    "Architect",
    "Engineer",
    "Scientist",
  ];

  const role_3 = [
    "Physicist",
    "Chemist",
    "Biologist",
    "Bot",
  ];

  switch (scopeId) {
    case 1:
      selectedRoles = role_1;
      break;
    case 2:
      selectedRoles = role_2;
      break;
    case 3:
      selectedRoles = role_3;
      break;
    default:
      return [];
  }

  return selectedRoles.map((name, index) => ({
    id: index + 1,
    name,
    scope: scopeId
  }));
};