import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const users = await prisma.user.findMany();
                res.status(200).json(users);
            } catch (err) {
                res.status(500).json({ error: 'Failed to fetch users' });
            }
            break;

        case 'POST':
            try {
                const { name, email } = req.body;
                const newUser = await prisma.user.create({
                    data: { name, email },
                });
                res.status(201).json(newUser);
            } catch (err) {
                res.status(500).json({ error: 'Failed to create user' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
