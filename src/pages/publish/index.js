import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '@/apis/article'

const { Option } = Select

const Publish = () => {

  //获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(()=>{
    //1.封装函数 在函数内部调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    //2.调用函数
    getChannelList()
  },[])


  // 提交表单
  const onFinish = (formValue) => {
    // console.log(formValue);
    //1.按照接口文档的格式处理收集到的表单数据
    const { title, content, channel_id } = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id
    }

    //2.调用接口提交
    createArticleAPI(reqData)
    
  }

  //封面上传回调(在上传图片中会自动触发该函数多次,会自动传入一个参数,其中包含了文件上传的相关信息)
  const [imageList, setImageList] = useState([])
  function onUploadChange(value){
    // console.log(value);
    setImageList(value.fileList)
    
  }

  //点击根据选择的图片属性,切换类型(自动传入e, 其中的e.target.value就是点击的那个选项设置的value属性)
  const [currentType, setCurrentType] = useState(1)
  function onTypeChange(e){
    // console.log(e);
    setCurrentType(e.target.value)
  } 

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item,) => {
                return (
                  /* value属性, 用户选中之后会自动收集作为接口的提交字段 */
                  <Option value={item.id} key={item.id}>{item.name}</Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
           {
            currentType !== 0 &&  //只有当前选中的属性不为0,才显示上传组件
            <Upload
              listType="picture-card" //决定选择框的样式
              showUploadList //该属性控制显示上传列表(默认为true)
              name="image" //接口需要的参数名
              action={'http://geek.itheima.net/v1_0/upload'} //接口url
              onChange={onUploadChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
           }
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器: npm i react-quill -> 导入组件 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
         
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish