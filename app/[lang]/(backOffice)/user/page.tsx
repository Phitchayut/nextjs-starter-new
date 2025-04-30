// app/[lang]/(backOffice)/user/page.tsx
import UserList from '@/app/[lang]/(backOffice)/user/_components/UserList';
import { getDictionary } from '@/app/dictionaries';

const UserPage = async ({ params: { lang } }: { params: { lang: any } }) => {
  const trans = await getDictionary(lang);
  return (
    <div>
      <UserList trans={trans} />
    </div>
  );
};

export default UserPage;
