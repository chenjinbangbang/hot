import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import Title from '@/components/title/title'
import UploadImg from '@/components/uploadimg/uploadimg'
import dict from '@/util/dict'

import userImg from '@/assets/imgs/user.jpg'

let real_dict_class = {
  0: '',
  1: 'warning',
  2: 'error',
  3: 'success'
}

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, // 当前页
      // 公告头部信息
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '编号',
          dataIndex: 'id',
          key: 'id',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '角色',
          dataIndex: 'role',
          key: 'role',
          align: 'center',
          render: text => <span>{dict.role_dict[text]}</span>
        },
        {
          title: '头像',
          dataIndex: 'head_thumb',
          key: 'head_thumb',
          align: 'center',
          render: text => <UploadImg isDetail={true} img_src={text || userImg} shape='circle' ></UploadImg>
        },
        {
          title: '师傅',
          dataIndex: 'referrer_username',
          key: 'referrer_username',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: 'QQ',
          dataIndex: 'qq',
          key: 'qq',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '实名',
          dataIndex: 'real_status',
          key: 'real_status',
          align: 'center',
          render: text => <span className={real_dict_class[text]}>{dict.real_dict[text]}</span>
        },
        {
          title: 'vip',
          dataIndex: 'isVip',
          key: 'isVip',
          align: 'center',
          render: text => <span>{text === 0 ? '否' : '是'}</span>
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '最后登录时间',
          dataIndex: 'last_login_time',
          key: 'last_login_time',
          align: 'center',
          render: text => <span>{text}</span>
        },
      ],
      // 公告数据
      data: []

      // 是否实名：isReal（int，0 未实名，1 待审核，2 已实名）
      // 是否是VIP会员：isVip（int：0 不是，1：是）
      // 真实姓名：name
      // 身份证号码：idcardno
      // 身份证正面：idcard_src
      // 手持身份证半身照：body_idcard_src
      // 是否绑定了平台账号：isPlatform（int，0 未绑定，1 已绑定）
    }
  }

  UNSAFE_componentWillMount() {

    // 获取公告数据
    let data = []
    for (let i = 1; i <= 200; i++) {
      // id,username,role,head_thumb,referrer_username,email,qq,mobile,create_time
      data.push({
        key: i,
        index: i,
        id: 10000 + i,
        username: 'sdusdu',
        role: 1,
        head_thumb: '',
        referrer_username: '我的唯一',
        email: '905690338@qq.com',
        qq: '905690338',
        mobile: '13570648992',
        real_status: 2,
        real_reason: null,
        isVip: 0,
        create_time: '2019-12-22 22:22:10',
        last_login_time: '2019-12-22 22:22:10',
      })
    }
    this.setState({ data })

  }

  // 表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  render() {
    const { columns, data, current } = this.state
    return (
      <div className='user'>
        <Title title='用户管理' />

        <Table columns={columns} scroll={{ x: true, y: false }} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>
      </div>
    )
  }
}

export default User;