"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PartnersDataTable from "../tables/PartnersDataTable";
// import SettingTable from "./SettingTable";
// import { useSettingStore } from "@/store/setting/settingStore";
// import { useEffect } from "react";
// import { Button } from "@components/ui/button";
// import { useRouter } from "next/navigation";

export default function SettingPartnersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Partners</CardTitle>
        <div className="flex justify-end">
          <Button>Create</Button>
        </div>
        <CardDescription>Make changes to your user here. Click save when you're done.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <PartnersDataTable />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
