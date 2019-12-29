import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
// import { Link } from 'react-router-dom'
import { Table, message, Tabs } from 'antd'
import Title from '@/components/title/title'

const { TabPane } = Tabs

class Referrer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, // 获取佣金记录当前页
      current1: 1, // 推广记录当前页
      // 获取佣金记录头部信息
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '徒弟',
          dataIndex: 'username',
          key: 'username',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '明细',
          dataIndex: 'detail',
          key: 'detail',
          align: 'center',
          width: 400,
          render: text => <span>{text}</span>
        },
        {
          title: '获取佣金',
          dataIndex: 'gold',
          key: 'gold',
          align: 'center',
          render: text => <span className='theme'>+{text}</span>
        }
      ],

      // 推广记录头部信息
      columns1: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          render: text => <span>{text}</span>
        },
        {
          title: '徒弟',
          dataIndex: 'username',
          key: 'username',
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
          title: '商家/用户',
          dataIndex: 'role',
          key: 'role',
          align: 'center',
          render: text => <span>{text === 0 ? '用户' : '商家'}</span>
        },
        {
          title: '是否实名',
          dataIndex: 'isReal',
          key: 'isReal',
          align: 'center',
          render: text => (text === 0 ? <span>未实名</span> : <span className='theme'>已实名</span>)
        },
        {
          title: '是否绑定了平台账号',
          dataIndex: 'isPlatform',
          key: 'isPlatform',
          align: 'center',
          render: text => (text === 0 ? <span>未绑定</span> : <span className='theme'>已绑定</span>)
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align: 'center',
          render: text => <span>{text}</span>
        }
      ],
      // 获取佣金记录数据
      data: [],
      // 推广记录数据
      data1: []

    }
  }

  UNSAFE_componentWillMount() {

    // 获取佣金记录数据
    let data = []
    for (let i = 1; i <= 200; i++) {
      data.push({
        key: i,
        index: i,
        username: '徒弟' + i,
        time: '2019-12-22 22:22:10',
        detail: '完成任务[20191214133752]，恭喜您获得金币1.0个',
        gold: 0.5
      })
    }
    this.setState({ data })

    // 序号（前端控制），徒弟，QQ，商家/用户，是否实名，是否绑定了平台账号，注册时间
    // 推广记录数据
    let data1 = []
    for (let i = 1; i <= 5; i++) {
      data1.push({
        key: i,
        index: i,
        username: '徒弟' + i,
        qq: '905690338',
        role: Math.round(Math.random()),
        isReal: Math.round(Math.random()),
        isPlatform: Math.round(Math.random()),
        create_time: '2019-12-22 22:22:10'
      })
    }
    this.setState({ data1 })

  }

  // 复制推广链接
  clipboard = (e) => {
    // console.log(ReactDOM.findDOMNode(this.refs.clip))

    let clip = this.refs.clip
    clip.select()
    try {
      if (document.execCommand("copy", false, null)) {
        document.execCommand("Copy")
        message.success('复制成功')
      } else {
        console.log("复制失败，请手动复制")
      }
    } catch (err) {
      console.log(err)
    }
  }

  changeTab() { }

  // 获取佣金记录表格分页
  changePage = (page) => {
    this.setState({ current: page })
  }

  // 推广记录表格分页
  changePage1 = (page) => {
    this.setState({ current1: page })
  }

  render() {
    const { columns, data, current, columns1, data1, current1 } = this.state

    return (
      <div className='referrer'>
        <Title title='推广分享' />

        <div className='referrer-note'>
          <p>
            分享链接：<span className='theme'>http://www.redu.com/register?uid=100000</span>
            <span id='clip' className='clip' onClick={this.clipboard}>复制</span>
            <input ref="clip" defaultValue='http://www.redu.com/register?uid=100000' style={{ position: 'fixed', top: '-1000px' }} />
          </p>
          <p>推荐人：<span className='theme'>陈进帮</span></p>
          <p className='theme' style={{ fontWeight: 'bold' }}>分享奖励规则：</p>
          <p className='referrer-note-detail'>
            推广<span className='theme'>1</span>个徒弟（商家），并成功发布<span className='theme'>10</span>个任务，说明推广成功，奖励<span className='theme'>1</span>个金币。每发布<span className='theme'>10</span>个任务，师傅可获取<span className='theme'>0.5</span>个金币，以此内推。
            {/* 推广<span className='theme'>1</span>个徒弟（用户），每完成<span className='theme'>10</span>个任务，师傅可获取<span className='theme'>0.5</span>个金币，以此内推。<br />
            获取的金币自动算入师傅的账户中。 */}
          </p>
          <p>推广<span className='theme'>1</span>个徒弟（用户），每完成<span className='theme'>10</span>个任务，师傅可获取<span className='theme'>0.5</span>个金币，以此内推。</p>
          <p>获取的金币自动算入师傅的账户中。</p>
        </div>

        <div className='referrer-data'>
          <div className='month-data'>
            <div>
              <p>本月获取佣金</p>
              <p><span>10000.20</span> 金币</p>
            </div>
          </div>
          <div className='total-data'>
            <div>
              <p>总计获取佣金</p>
              <p><span>888.20</span> 金币</p>
            </div>
          </div>
        </div>

        <Tabs onChange={this.changeTab}>
          <TabPane tab='获取佣金记录' key='1'>
            <Table columns={columns} dataSource={data} pagination={{ current, showQuickJumper: true, onChange: this.changePage }}></Table>
          </TabPane>
          <TabPane tab='推广记录' key='2'>
            <Table columns={columns1} dataSource={data1} pagination={{ current1, showQuickJumper: true, onChange: this.changePage1 }}></Table>
          </TabPane>
        </Tabs>


      </div>
    )
  }
}

export default Referrer