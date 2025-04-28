import { z } from "zod";

export const formUserSettingValidateSchema = z.object({
    name: z.string().min(2, { message: 'Your name is invalid.' }),
    email: z.string().email({ message: 'Your email is invalid.' }),
  });
export const formPartnerSettingValidateSchema = z.object({
    name: z.string().min(2, { message: 'Your name is invalid.' }),
    email: z.string().email({ message: 'Your email is invalid.' }),
  });
export const formMemberSettingValidateSchema = z.object({
    name: z.string().min(2, { message: 'Your name is invalid.' }),
    email: z.string().email({ message: 'Your email is invalid.' }),
  });