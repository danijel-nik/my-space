import { prisma } from 'lib-server/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { userRegistrationSchema } from 'lib-server/validation'
import { apiHandler } from 'lib-server/nc'
import { hash } from 'bcryptjs'

const handler = apiHandler()

handler.post(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { name, email, password } = req.body
        const result = userRegistrationSchema.safeParse({name, email, password})
        if (!result.success) {
            throw new Error('User registration error. Please check all inputs')
        }
        const passwordHash = await hash(password, 10)

        try {
            await prisma.user.create({
                data: { name, email, password: passwordHash }
            })
            res.status(200).json({ message: 'User was created' })
        } catch (error) {
            console.log("Failure")
            res.status(500).json({ message: error })
        }
    }
)

export default handler