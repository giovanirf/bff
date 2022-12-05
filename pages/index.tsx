import { useState } from "react"
import axios from 'axios'

enum Content {
  VIEW_STATUS = 'workorder.viewStatus',
  CHANGE_STATUS = 'workorder.changeStatus',
  COMMENT = 'workrder.comment'
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [logged, setLogged] = useState(false)

  const [workOrder, setWorkOrder] = useState<any>()
  const [content, setContent] = useState<Content[]>([])

  const handleLogin = async () => {
    if (!username) {
      window.alert('Digite seu nome de usuário')
      return
    }
    const response = await axios.get(`http://localhost:3000/api/content?username=${username}`)
    if (response.data) {
      setWorkOrder(response.data.workOrder)
      setLogged(true)
      setContent(response.data.content)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
      {logged ? (
        <>
          <span>Hello, {username}</span>
          <WorkOrder content={content} data={workOrder} />
          <button onClick={() => {
            setLogged(false)
            setUsername('')
          }}>Logout</button>
        </>
      ) : (
        <>
          <span>Hello, World</span>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="admin, executant, viewer, not_allowed" />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  )
}

const WorkOrder = ({ data, content }: any) => {
  if (content.length === 0) {
    return (
      <span>Unauthorized</span>
    )
  }

  return (
    <div>
      {content.includes('workorder.changeStatus') ? <ChangeStatus /> : content.includes('workorder.viewStatus') ? <ViewStatus /> : null}
      {content.includes('workorder.comment') && <input placeholder="Campo de comentários" />}
    </div>
  )
}

const Status = ({ canEdit }: any) => {
  return (
    <div>
      <h4>Status</h4>
      {canEdit ? 'Pode alterar' : 'Pode ver'}
    </div>
  )
}

const ChangeStatus = () => {
  return <Status canEdit />
}

const ViewStatus = () => {
  return <Status canEdit={false} />
}

