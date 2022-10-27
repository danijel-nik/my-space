import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, categoryID } = req.body

    try {
        await prisma.note.create({
            data: {
                title,
                content,
                categories: {
                    connect: {
                        id: parseInt(categoryID)
                    }
                }
            }
        })
        res.status(200).json({ message: 'Note Created' })
    } catch (error) {
        console.log("Failure")
        res.status(500).json({ message: error })
    }
}