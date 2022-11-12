import { prisma } from 'lib-server/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiHandler } from 'lib-server/nc'

const handler = apiHandler()

handler.delete(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const noteId = req.query.id
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
    }
)

handler.put(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const noteId = req.query.id
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
    }
)
/*
async (req: NextApiRequest, res: NextApiResponse) => {
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
*/

export default  handler