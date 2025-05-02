import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"; // adjust import if needed
import { Input } from "@/components/ui/input"; // adjust import if needed
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingStore } from "@/store/setting/settingStore";
import router from "next/router";

const statuses = ["Active", "Inactive", "Pending"]; // example statuses
let idCounter = 1;

export default function CreateUserModal() {
  const { createUsersSetting, loading } = useSettingStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    title: "",
    email: "",
    amount: 0,
    status: "",
    role: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const newUser: Settings = {
      id: idCounter++,
      user: {
        name: form.name,
        avatar: form.avatar,
        title: form.title || undefined,
        email: form.email,
      },
      role: {
        id: 1, // default role ID, adjust as needed
        name: form.role, // default role name, adjust as needed
        scope: 1, // default scope, adjust as needed
      },
      email: form.email, // top-level email too
      amount: Number(form.amount) || 0,
      status: form.status || "Active",
    };

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      const res = await createUsersSetting(newUser);
      console.log(res);
      console.log("Created User:", newUser);
      setOpen(false);
      // setForm({
      //   name: "",
      //   avatar: "",
      //   title: "",
      //   email: "",
      //   amount: 0,
      //   status: "",
      // });
    } catch (err) {
      console.error("Error creating user:", err);
    }

    console.log("Created User:", newUser);
    setOpen(false); // close modal after save
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-4">
          <DialogTitle>Create New User</DialogTitle>
          <Input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" />
          <Input name="avatar" value={form.avatar} onChange={handleInputChange} placeholder="Avatar URL" />
          <Input name="title" value={form.title} onChange={handleInputChange} placeholder="Title" />
          <Input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
          <Select value={form.status} onValueChange={(e) => handleInputChange(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>

          <Input name="status" value={form.status} onChange={handleInputChange} placeholder="Status (optional)" />
          <Button onClick={handleSubmit}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
