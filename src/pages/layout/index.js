import { Button } from "antd"
import { useNavigate } from "react-router-dom"

function Layout(){
  const navigate = useNavigate()
  return (
    <div>我是Layout
      <Button type="primary" onClick={()=>navigate('/login')}>login</Button>
    </div>
    
  )

}

export default Layout