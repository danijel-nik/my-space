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
            console.log(error);
        }
    }

    if (req.method === 'PUT') {
        try {
            const note = await prisma.note.update({
                where: {
                    id: Number(noteId)
                },
                data: req.body
            })
            res.json(note)
        } catch (error) {
            console.log(error);
        }
    }
}