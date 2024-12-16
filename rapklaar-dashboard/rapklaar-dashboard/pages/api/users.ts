import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const usersData = await fs.promises.readFile(usersFilePath, 'utf8')
      const users = JSON.parse(usersData)
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: 'Error reading users data' })
    }
  } else if (req.method === 'POST') {
    try {
      const updatedUsers = req.body
      await fs.promises.writeFile(usersFilePath, JSON.stringify(updatedUsers, null, 2))
      res.status(200).json({ message: 'Users updated successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Error updating users data' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

