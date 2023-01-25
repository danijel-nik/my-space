import { z } from 'zod'

const passwordMin = 6
const passwordMax = 20

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(passwordMin).max(passwordMax)
})

export const userRegistrationSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(passwordMin).max(passwordMax),
        // confirmPassword: z.string().optional()
    })
    /*
    .refine((data) => data.confirmPassword === data.password, {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    })
    */