// 字典表
let dict = {
  // ======================================= 前端获取 =======================================
  // 任务状态字典表
  task_dict: {
    0: '未开始',
    1: '进行中',
    2: '待审核',
    3: '审核通过',
    4: '审核不通过',
    5: '违规',
    6: '已取消'
  },
  // 任务审核不通过原因字典表
  task_status_reason_dict: {
    0: '没有关注',
    1: '没有点赞',
    2: '没有收藏',
    3: '没有评论',
    4: '有评论但和评论内容不符',
    5: '没有转发',
    6: '有转发但和转发内容不符'
  },

  // 用户实名状态字典表
  real_dict: {
    0: '未实名',
    1: '待审核',
    2: '审核不通过',
    3: '已实名'
  },
  // 银行卡审核状态字典表
  bank_status_dict: {
    0: '待审核',
    1: '未通过',
    2: '正常'
  },
  // 平台状态字典表
  platform_status_dict: {
    0: '待审核',
    1: '未通过',
    2: '正常',
    3: '冻结'
  },
  // 充值状态字典表
  pay_status_dict: {
    0: '已充值，待到账',
    1: '充值失败',
    2: '成功成功'
  },

  // ======================================= 后端获取 =======================================
  // 用户角色字典表
  role_dict: {
    0: '刷手',
    1: '创作者',
    2: '管理者'
  },
  // 实名审核不通过原因字典表
  real_reason_dict: {
    0: '真实姓名与身份证信息不一致',
    1: '身份证号码与身份证信息不一致',
    2: '身份证正面模糊，请重新上传',
    3: '手持身份证半身照模糊，请重新上传',
    4: '身份证正面与手持身份证半身照不一致，请重新上传'
  },
  // 平台类型字典表
  platform_dict: {
    0: '今日头条',
    1: '抖音短视频',
    2: '火山小视频',
    3: '快手'
  },
  // 规定任务完成时间字典表
  complete_countdown_time_dict: {
    0: 10,
    1: 20,
    2: 30,
    3: 40,
    4: 50,
    5: 60
  },
  // 关注保留时间字典表
  attention_time_dict: {
    0: '3个月',
    1: '半年',
    2: '1年',
    3: '2年',
    4: '3年'
  },
  // 银行卡审核不通过原因字典表
  bank_reason_dict: {
    0: '开户行与银行卡信息不对应',
    1: '开户支行与银行卡信息不对应',
    2: '开户姓名与银行卡信息不对应',
    3: '银行卡号填写有误'
  },
  // 平台账号审核不通过原因字典表
  platform_reason_dict: {
    0: '平台不存在该账号',
    1: '平台账号头像与账号不对应',
    2: '平台账号截图和填写的信息不对应'
  },
  // 平台账号冻结原因字典表
  platform_freeze_reason_dict: {
    0: '违规账号'
  },

  // 财务类型字典表
  wealth_dict: {
    0: '购买金币',
    1: '金币兑换现金',
    2: '发布任务',
    3: '完成任务',
    4: '现金提现',
    5: '现金充值',
    6: '刷手违规扣除金币',
    7: '刷手违规返回金币',
    8: '徒弟完成任务',
    9: '徒弟推广一个创作者成功',
    10: '徒弟发布了10个任务',
    11: '徒弟完成了10个任务'
  },
  // 银行卡字典表
  bank_dict: {
    0: '中国银行',
    1: '中国农业银行',
    2: '中国建设银行',
    3: '中国工商银行',
    4: '交通银行',
    5: '中信银行',
    6: '中国光大银行',
    7: '中国民生银行',
    8: '招商银行',
    9: '兴业银行',
    10: '平安银行',
    11: '广东发展银行',
    12: '中国邮政储蓄银行',
    13: '华夏银行'
  },
  // 今日头条分享字典表
  share_dict_toutiao: {
    0: '分享到头条',
    1: '分享到微信',
    2: '分享到微信朋友圈',
    3: '分享到QQ',
    4: '分享到QQ空间'
  },
  // 抖音短视频分享字典表
  share_dict_douyin: {
    0: '分享到抖音',
    1: '分享到微信',
    2: '分享到微信朋友圈',
    3: '分享到QQ',
    4: '分享到QQ空间',
    5: '分享到新浪微博',
    6: '分享到今日头条'
  },
  // 火山小视频分享字典表
  share_dict_huoshan: {
    0: '分享到微信',
    1: '分享到微信朋友圈',
    2: '分享到QQ',
    3: '分享到QQ空间',
    4: '分享到新浪微博'
  },
  // 快手分享字典表
  share_dict_kuaishou: {
    0: '分享到微信',
    1: '分享到微信朋友圈',
    2: '分享到QQ',
    3: '分享到QQ空间',
    4: '分享到新浪微博'
  },
}

export default dict