import { request } from "@/utils"
import { Button } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Layout(){
  useEffect(()=>{
    request({
      method:'get',
      url:'/user/profile'
    })
  },[])
  
  const navigate = useNavigate()
  return (
    <div>我是Layout
      <Button type="primary" onClick={()=>navigate('/login')}>login</Button>
    </div>
    
  )

}

export default Layout