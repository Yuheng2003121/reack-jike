//封装和文章相关的接口函数
import { request } from "@/utils";


// 1.获取频道列表 
export function getChannelAPI(){
  return request({
    method:'get',
    url:'/channels'  
  })
}


//2. 提交文章表单
export function createArticleAPI(data){
  return request({
    method:'post',
    url:'/mp/articles?draft=false',
    data
  })
}