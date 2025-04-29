'use client';
import { useUserStore } from '@/store/user/userStore';
import { useEffect } from 'react';
import {Card} from '@/components/ui/card';
import UserTable from './UserTable';
import { Button } from '../../../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { translate } from '@/lib/utils';

export default function UserList({trans}:any) {
  const router = useRouter();
  const { users, loading, error, fetchUsers,deleteUser } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    router.push('/user/add');
  }

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!users) return <p>No user data.</p>;
  return (
    <Card className='p-5'>
      <div className="flex flex-wrap items-center gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-medium text-default-700 mb-2">{translate('user list', trans)}</h3>
        </div>
        <div className="flex-none">
          <Button type="button"  onClick={() => handleAddUser()}>Add User</Button>
        </div>
      </div>
      <UserTable users={users} deleteUser={deleteUser}/>
    </Card>
  );
}
