import { prisma } from 'lib-server/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiHandler } from 'lib-server/nc'

const handler = apiHandler()

handler.delete(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const noteCatId = req.query.id
        const category = await prisma.noteCategory.delete({
            where: {
                id: Number(noteCatId)
            }
        })
        res.status(200).json(category)
    }
)

handler.put(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const noteCatId = req.query.id
        const category = await prisma.noteCategory.update({
            where: {
                id: Number(noteCatId)
            },
            data: req.body
        })
        res.json(category)

    }
)

export default handler