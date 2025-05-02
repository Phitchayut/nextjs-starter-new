"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SettingPartnersTable from "./SettingPartnersTable";
import SettingMembersTable from "./SettingMembersTable";
import SettingUsersTable from "./SettingUsersTable";


export default function SettingTabs() {
  return (
    <>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <SettingUsersTable />
        </TabsContent>
        <TabsContent value="partners">
          <SettingPartnersTable />
        </TabsContent>
        <TabsContent value="members">
          <SettingMembersTable />
        </TabsContent>
      </Tabs>
    </>
  );
}
