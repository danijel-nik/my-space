import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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