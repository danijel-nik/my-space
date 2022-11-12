import { prisma } from 'lib-server/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiHandler } from 'lib-server/nc'

const handler = apiHandler()

handler.post(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { name } = req.body
        try {
            await prisma.noteCategory.create({
                data: {
                    name
                }
            })
            res.status(200).json({ message: 'Note Category was successfully created' })
        } catch (error) {
            console.log("Failure", error)
            res.status(500).json({ message: error })
        }
    }
)

export default handler