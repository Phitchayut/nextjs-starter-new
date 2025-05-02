"use client";
import SettingTabs from '@/app/[lang]/(dashboard)/settings/_components/tabs/SettingTabs';

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Role Settings</h1>
      <SettingTabs />
    </div>
  );
};

export default SettingsPage;
