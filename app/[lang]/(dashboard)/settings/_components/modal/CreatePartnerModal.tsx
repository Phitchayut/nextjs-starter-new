import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"; // adjust import if needed
import { Input } from "@/components/ui/input"; // adjust import if needed
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingStore } from "@/store/setting/settingStore";
import router from "next/router";
import ReactSelectOption from "@/app/[lang]/(dashboard)/settings/_components/react-select/react-select-options"; // adjust import if needed

export default function CreatePartnerModal() {
  const { roles, loading, getRolesSetting, createPartnersSetting } = useSettingStore();

  useEffect(() => {
    getRolesSetting(2);
  }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role_id: roles,
  });

  const handleSubmit = async () => {
    const newPartner: Partner = {
      partner_name: form.name,
      partner_email: form.email,
      password_hash: form.password,
      role_id: form.role_id,
    };

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      await createPartnersSetting(newPartner);
      setOpen(false);
      setForm({
        name: "",
        email: "",
        password: "",
        role_id: 0,
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
    console.log("Created User:", newPartner);
    setOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name:", name, "value:", value);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-4">
          <DialogTitle>Create New Partner</DialogTitle>
          <Input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" />
          <Input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
          <Input name="password" value={form.password} onChange={handleInputChange} placeholder="Password" />
          <ReactSelectOption value={form.role_id}/>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
