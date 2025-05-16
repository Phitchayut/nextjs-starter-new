
interface AuthUser {
   id: Number;
   email: String;
   first_name: String;
   last_name: String;
   status: String;
   created_by: Date | null;
   created_at: Date | null;
   updated_by: Date | null;
   updated_at: Date | null;
   deleted_by: Date | null;
   deleted_at: Date | null;
   role: AuthRole[];
};

interface AuthRole {
   id: Number;
   role_name: String;
   status: String;
   created_by: Date | null
   created_at: Date | null
   updated_by: Date | null
   updated_at: Date | null
   deleted_by: Date | null
   deleted_at: Date | null
   scope_id: Number
}

interface AuthStore {
   auths: AuthStore[];
   auth: AuthStore | null;
   callback: string;
   loading: boolean;
   error: string | null;

   getUsersAuth: (data: any) => Promise<void>;
}