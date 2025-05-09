import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"; // adjust import if needed
import { Input } from "@/components/ui/input"; // adjust import if needed
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettingStore } from "@/store/setting/settingStore";
import router from "next/router";
import Select, { GroupBase, OptionProps, components } from "react-select";
import makeAnimated from "react-select/animated";
import { Icon } from "@iconify/react";
import ReactSelectOption from "@/app/[lang]/(dashboard)/settings/_components/react-select/react-select-options"; // adjust import if needed

export default function EditPartnerModal({
  open,
  onOpenChange,
  partner,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: any; // Ideally type this
}) {
  const { editPartnersSetting } = useSettingStore();

  const [form, setForm] = useState({
    name: "",
    avatar: "",
    title: "",
    email: "",
    amount: 0,
    status: "",
  });

  useEffect(() => {
    if (partner) {
      setForm({
        name: partner.user?.name || "",
        avatar: partner.user?.avatar || "",
        title: partner.user?.title || "",
        email: partner.email || "",
        amount: partner.amount || 0,
        status: partner.status || "",
      });
    }
  }, [partner]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const updatedUser = {
      ...partner,
      user: {
        name: form.name,
        avatar: form.avatar,
        title: form.title || undefined,
        email: form.email,
      },
      role: {
        id: partner.role?.id || 1,
        name: partner.role?.name || "",
        scope: partner.role?.scope || 1,
      },
      email: form.email,
      amount: Number(form.amount) || 0,
      status: form.status || "Active",
    };

    try {
      await editPartnersSetting(updatedUser, partner.id);
      onOpenChange(false);
    } catch (err) {
      console.error("Error updating partner:", err);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex flex-col gap-4">
          <DialogTitle>Edit Partner</DialogTitle>
          <Input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" />
          <Input name="avatar" value={form.avatar} onChange={handleInputChange} placeholder="Avatar URL" />
          <Input name="title" value={form.title} onChange={handleInputChange} placeholder="Title" />
          <Input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
          <ReactSelectOption />

          <Input name="status" value={form.status} onChange={handleInputChange} placeholder="Status (optional)" />
          <Button onClick={handleSubmit}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
