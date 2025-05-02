"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UsersDataTable from "../tables/UsersDataTable";
import CreateUserModal from "../modal/CreateUserModal";

export default function SettingUsersTable() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCreateUser = (user: any) => {
    console.log('Created User:', user);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <div className="flex justify-end">
            {/* <Button onClick={() => setOpenCreateModal(true)}>Create User</Button> */}
            <CreateUserModal open={openCreateModal} onOpenChange={setOpenCreateModal} onCreate={handleCreateUser} />
        </div>
        <CardDescription>Make changes to your user here. Click save when you're done.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <UsersDataTable />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
