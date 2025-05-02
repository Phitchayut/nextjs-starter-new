import DashBoardLayoutProvider from '@/provider/dashboard.layout.provider';

import { getDictionary } from '@/app/dictionaries';

import { cookies } from 'next/headers';
import { getUsers } from '@/lib/verifyAuthentication';
import { redirect } from 'next/navigation';

const layout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: any };
}) => {
  const trans = await getDictionary(lang);

  const cookieStore = cookies();
  const authToken = await cookieStore.get('Authentication')?.value;
  const users = await getUsers();

  // if (users) {
  //   redirect('http://localhost:3001/auth/logout');
  // }

  return (
    <DashBoardLayoutProvider trans={trans}>
      {children}
    </DashBoardLayoutProvider>
  );
};

export default layout;
