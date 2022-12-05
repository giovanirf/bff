// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.username === 'admin') {
    return res.status(200).json({ 
      workOrder: { title: 'any', number: 2 }, 
      content: ['workorder.changeStatus', 'workorder.comment'] 
    })
  }

  if (req.query.username === 'executant') {
    return res.status(200).json({ 
      workOrder: { title: 'any', number: 2 }, 
      content: ['workorder.changeStatus'] 
    })
  }

  if (req.query.username === 'viewer') {
    return res.status(200).json({ 
      workOrder: { title: 'any', number: 2 }, 
      content: ['workorder.viewStatus'] 
    })
  }

  if (req.query.username === 'not_allowed') {
    return res.status(200).json({ 
      workOrder: null, 
      content: [] 
    })
  }
}

