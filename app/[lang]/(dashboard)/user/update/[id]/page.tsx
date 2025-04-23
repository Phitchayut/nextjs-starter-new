import Card from '@/components/ui/card-snippet';
import React from 'react';
import FormUpdate from '../../_components/FormUpdate';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: {
    id: string;
  };
};

const Update = ({ params }: Props) => {
  return (
    <>
      <Card title="Add User">
        <FormUpdate userId={params.id} />
      </Card>
      <Link href={`/user`}>
        <Button className="mt-3" color="destructive">
          Back
        </Button>
      </Link>
    </>
  );
};

export default Update;
