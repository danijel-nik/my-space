import { prisma } from 'lib-server/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiHandler } from 'lib-server/nc'

const handler = apiHandler()

handler.get(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { include_notes } = req.query || false
        const includeNotes = include_notes === 'true' ? true : false
    
        try {
            const categories = await prisma.noteCategory.findMany({
                include: {
                    notes: includeNotes
                }
            })
            res.status(200).json({ categories })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
)

export default handler