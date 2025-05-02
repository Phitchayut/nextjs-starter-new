const roles = {
   role_1: [
      "Admin",
      "User",
      "Guest",
      "Super Admin",
      "Editor",
      "Viewer",
      "Moderator"
   ],
   role_2: [
      "DBD",
   ],
   role_3: [
      "Member"
   ]
};

export const getRolesByScope = async (scopeId: number) => {
   let selectedRoles: string[] = [];

   switch (scopeId) {
      case 1:
         selectedRoles = roles.role_1;
         break;
      case 2:
         selectedRoles = roles.role_2;
         break;
      case 3:
         selectedRoles = roles.role_3;
         break;
      default:
         return [];
   }

   const selected = [...selectedRoles];

   return selected
}