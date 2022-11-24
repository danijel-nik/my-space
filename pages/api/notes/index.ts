import { prisma } from 'lib-server/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiHandler } from 'lib-server/nc'

const handler = apiHandler()

handler.get(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const notes = await prisma.note.findMany({
            include: {
                categories: true
            }
            /*
            select: {
                id: true,
                title: true,
                content: true
            }
            */
        })
        res.status(200).json({ notes })
    }
)

export default handler