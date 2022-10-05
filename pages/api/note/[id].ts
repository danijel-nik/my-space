import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const noteId = req.query.id

    if (req.method === 'DELETE') {
        try {

            const note = await prisma.note.delete({
                where: {
                    id: Number(noteId)
                }
            })
            res.json(note)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    } else if (req.method === 'PUT') {
        try {
            const note = await prisma.note.update({
                where: {
                    id: Number(noteId)
                },
                data: req.body
            })
            res.json(note)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    } else {
        res.status(405).json({
            message: 'Method not allowed'
        })
    }
}