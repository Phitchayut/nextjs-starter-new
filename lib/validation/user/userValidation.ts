import { z } from "zod";

export const formUserValidateSchema = z.object({
    name: z.string().min(2, { message: 'Your name is invalid.' }),
    email: z.string().email({ message: 'Your email is invalid.' }),
  });