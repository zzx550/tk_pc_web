import axios from './index'

// 注册
export const api_register = (p: any) => axios.post('login/register', p)

// 获取是否已经注册
export const api_getIsRegister = (p: any) =>
  axios.post('login/getIsRegister', p)

// 登录
export const api_login = (p: any) => axios.post('login/login', p)

// 退出登录
export const api_logout = (p: any) => axios.post('login/logout', p)

// 个人信息
export const api_getInfo = (p: any) => axios.post('user/info', p)

// 生成投入推广商品订单
export const api_createPlace = (p: any) => axios.post('order/createPlace', p)

// 领取本月礼包
export const api_getGiftPack = (p: any) => axios.post('user/getGiftPack', p)

// 我的供应商列表
export const api_mySupplier = (p: any) => axios.post('user/mySupplier', p)

// 绑定供应商
export const api_bindSupplier = (p: any) => axios.post('user/bindSupplier', p)

// 商品分类
export const api_goodsCategory = (p: any) =>
  axios.post('goods/goodsCategory', p)

// 供应商商品列表
export const api_goodsList = (p: any) => axios.post('goods/goodsList', p)

// 商品详情
export const api_goodsDetails = (p: any) => axios.post('goods/details', p)

// 添加商品
export const api_addGoods = (p: any) => axios.post('goods/addGoods', p)

// 获取配置
export const api_getOption = (p: any) => axios.post('option/list', p)

// 文章列表
export const api_newsList = (p: any) => axios.postForm('option/newsList', p)

// 文章详情
export const api_newsDetail = (p: any) => axios.post('option/newsDetail', p)

// 我的钱包
export const api_wallet = (p: any) => axios.post('user/wallet', p)

// 资金记录
export const api_transferLog = (p: any) => axios.post('user/transferLog', p)

// 问题反馈
export const api_problemFeedback = (p: any) =>
  axios.post('user/problemFeedback', p)

// 助力
export const api_help = (p: any) => axios.post('user/help', p)

// 助力记录
export const api_helpLog = (p: any) => axios.post('user/helpLog', p)

// 我的商品橱窗
export const api_myGoods = (p: any) => axios.post('goods/myGoods', p)

// 推广商品
export const api_extend = (p: any) => axios.post('goods/extend', p)

// 订单列表
export const api_orderList = (p: any) => axios.post('order/list', p)

// 订单详情
export const api_orderDetail = (p: any) => axios.post('order/detail', p)

// 我的账单
export const api_getAccountLog = (p: any) =>
  axios.post('index/User/getAccountLog', p)

// 订单支付
export const api_pay = (p: any) => axios.post('order/pay', p)

// 统计
export const api_mainStatistics = (p: any) =>
  axios.post('user/mainStatistics', p)

// 统计图表
export const api_echartStatistics = (p: any) =>
  axios.post('user/echartStatistics', p)

// 获取页面描述
export const api_optionDesc = (p: any) => axios.get('option/optionDesc', p)

// 获取各订单状态数量
export const api_getOrderTypeNum = (p: any) =>
  axios.post('order/getOrderTypeNum', p)

// 完善用户信息
export const api_save_user_info = (p: any) =>
  axios.post('user/storeUserInfo', p)

// 提现
export const api_withdraw = (p: any) => axios.post('trade/withdraw', p)

// 提现记录
export const api_withdraw_list = (p: any) => axios.post('trade/withdrawList', p)

// 绑定邀请码
export const api_bind_invite_code = (p: any) =>
  axios.post('user/bindInviteCode', p)

// 获取推荐团队列表
export const api_team_list = (p: any) => axios.post('user/getTeamList', p)

// 商品排序榜
export const api_GoodsRanking = (p: any) =>
  axios.post('goods/getGoodsRankingList', p)

// 是否显示好友助力弹框
export const api_get_showHelp = (p: any) => axios.post('user/getShowHelp', p)

// 设置好友助力弹框已显示
export const api_set_showHelp = (p: any) => axios.post('user/setShowHelp', p)

// 绑定店铺信息
export const api_bind_shopInfo = (p: any) => axios.post('user/bindShopInfo', p)

// 修改店铺名称
export const api_update_shopInfo = (p: any) =>
  axios.post('user/updateShopInfo', p)

// 设置客服消息已读
export const api_set_msgRead = (p: any) => axios.post('user/setMsgRead', p)

// 返佣信息
export const api_rebateInfo = (p: any) => axios.post('user/rebateInfo', p)

// 返佣记录
export const api_rateList = (p: any) => axios.post('user/rebateList', p)

// 取消订单
export const api_cancelOrder = (p: any) => axios.post('order/cancelOrder', p)

// 申请退货
export const api_applyReturnOrder = (p: any) =>
  axios.post('order/applyReturnOrder', p)

// 提现方式
export const api_tradeWay = (p: any) => axios.post('trade/payment', p)

// 商品下架
export const api_removeGood = (p: any) => axios.post('goods/delistGoods', p)

// 创建订单
export const api_createOrder = (p: any) => axios.post('order/createOrder', p)

// 在线充值
export const api_recharge = (p: any) => axios.post('trade/recharge', p)

// 上传图片
export const api_uploadImg = (p: any) => axios.postForm('upload/uploadImg', p)

// 完善信息
export const api_saveInfo = (p: any) => axios.post('user/storeUserInfo', p)

// 设置安全密码
export const api_setPwd = (p: any) => axios.post('user/updatePayword', p)

// 获取用户绑定银行卡信息
export const api_getUserBindBankInfo = (p: any) =>
  axios.post('user/getUserBindBankInfo', p)

// 推荐商品列表
export const api_getRecommendGoods = (p: any) =>
  axios.post('mall_store/getRecommendGoods', p)

// 商户店铺列表
export const api_getShopList = (p: any) =>
  axios.post('mall_store/getShopList', p)

// 商户店铺详情
export const api_getShopDetail = (p: any) =>
  axios.post('mall_store/getShopDetail', p)

// 商户店铺商品列表
export const api_getShopGoodsList = (p: any) =>
  axios.post('mall_store/getShopGoodsList', p)

// 询单消息列表
export const api_getConsultMsgList = (p: any) =>
  axios.post('consult_msg/list', p)

// 询单消息详情
export const api_getConsultMsgDetail = (p: any) =>
  axios.post('consult_msg/detail', p)

// 询单消息回复
export const api_replyConsultMsg = (p: any) =>
  axios.post('consult_msg/store', p)

// 联系买家
export const api_contactBuyer = (p: any) => axios.post('order/contactBuyer', p)

// 风控提示/系统公告
export const api_riskNewsInfo = (p: any) =>
  axios.post('option/getRiskNewsInfo', p)

// 更新风控提示/系统公告已读状态
export const api_updateNewsStatus = (p: any) =>
  axios.post('option/updateNewsStatus', p)

// 商品一键上架
export const api_addAllGoods = (p: any) => axios.post('goods/addAllGoods', p)

// web版本的登录
export const api_web_login = (p: any) => axios.post('login/loginWeb', p)

// web版本的注册
export const api_web_regitser = (p: any) => axios.post('login/registerWeb', p)

// 添加收藏/取消收藏
export const api_collect_good = (p: any) =>
  axios.post('user/setUserCollectionGoods', p)

// 收藏列表
export const api_collect_list = (p: any) =>
  axios.post('user/getUserCollectionList', p)

// 获取邮箱验证码
export const api_sendEmailCode = (p: any) =>
  axios.post('login/sendEmailCode', p)

// 日志
export const api_addLog = (p: any) => axios.post('index/addAppApiLog', p)
