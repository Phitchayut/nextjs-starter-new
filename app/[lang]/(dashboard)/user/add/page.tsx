import Card from '@/components/ui/card-snippet';
import React from 'react';
import FormAdd from '../_components/FormAdd';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {};

function Add({}: Props) {
  return (
    <>
      <Card title="Add User">
        <FormAdd />
      </Card>
      <Link href={`/user`}>
        <Button className="mt-3"  color="destructive">Back</Button>
      </Link>
    </>
  );
}

export default Add;
