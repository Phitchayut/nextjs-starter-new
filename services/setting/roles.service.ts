// services/userService.ts
import { httpClient } from '@/config/axios.config';

export const getUsersSetting = async (scopeId: number) => {
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
      return role_1;
    case 2:
      return role_2;
    case 3:
      return role_3;
    default:
      return [];
  }
};