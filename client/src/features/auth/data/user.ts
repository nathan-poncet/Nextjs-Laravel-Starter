import { z } from "zod"

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  email_verified_at: z.date().nullable(),
})

export type UserType = z.infer<typeof UserSchema>; 
