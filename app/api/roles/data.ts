const role_1 = [
   "Admin", "User", "Guest", "Super Admin",
   "Editor", "Viewer", "Moderator", "Contributor",
];

const role_2 = [
   "DBD"
];

const role_3 = [
   "Member"
];

export const getRolesByScope = (scopeId: number): string[] => {
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
