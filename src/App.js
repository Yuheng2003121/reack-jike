import {Button} from 'antd' 
import { useNavigate } from 'react-router-dom'

function App(){
  const navigate = useNavigate()
  return (
    <div>This is an App
      <Button type='primary' >按钮</Button>
      
    </div>
  )
}

export default App