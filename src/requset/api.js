import { get, post, postForm } from "./http";

// 注册
export const api_register = (p) => post("login/register", p);

// 获取是否已经注册
export const api_getIsRegister = (p) => post("login/getIsRegister", p);

// 登录
export const api_login = (p) => post("login/login", p);

// 退出登录
export const api_logout = (p) => post("login/logout", p);

// 个人信息
export const api_getInfo = (p) => post("user/info", p);

// 生成投入推广商品订单
export const api_createPlace = (p) => post("order/createPlace", p);

// 领取本月礼包
export const api_getGiftPack = (p) => post("user/getGiftPack", p);

// 我的供应商列表
export const api_mySupplier = (p) => post("user/mySupplier", p);

// 绑定供应商
export const api_bindSupplier = (p) => post("user/bindSupplier", p);

// 商品分类
export const api_goodsCategory = (p) => post("goods/goodsCategory", p);

// 供应商商品列表
export const api_goodsList = (p) => post("goods/goodsList", p);

// 商品详情
export const api_goodsDetails = (p) => post("goods/details", p);

// 添加商品
export const api_addGoods = (p) => post("goods/addGoods", p);

// 获取配置
export const api_getOption = (p) => post("option/list", p);

// 文章列表
export const api_newsList = (p) => postForm("option/newsList", p);

// 文章详情
export const api_newsDetail = (p) => post("option/newsDetail", p);

// 我的钱包
export const api_wallet = (p) => post("user/wallet", p);

// 资金记录
export const api_transferLog = (p) => post("user/transferLog", p);

// 问题反馈
export const api_problemFeedback = (p) => post("user/problemFeedback", p);

// 助力
export const api_help = (p) => post("user/help", p);

// 助力记录
export const api_helpLog = (p) => post("user/helpLog", p);

// 我的商品橱窗
export const api_myGoods = (p) => post("goods/myGoods", p);

// 推广商品
export const api_extend = (p) => post("goods/extend", p);

// 订单列表
export const api_orderList = (p) => post("order/list", p);

// 订单详情
export const api_orderDetail = (p) => post("order/detail", p);

// 我的账单
export const api_getAccountLog = (p) => post("index/User/getAccountLog", p);

// 订单支付
export const api_pay = (p) => post("order/pay", p);

// 统计
export const api_mainStatistics = (p) => post("user/mainStatistics", p);

// 统计图表
export const api_echartStatistics = (p) => post("user/echartStatistics", p);

// 获取页面描述
export const api_optionDesc = (p) => get("option/optionDesc", p);

// 获取各订单状态数量
export const api_getOrderTypeNum = (p) => post("order/getOrderTypeNum", p);

// 完善用户信息
export const api_save_user_info = (p) => post("user/storeUserInfo", p);

// 提现
export const api_withdraw = (p) => post("trade/withdraw", p);

// 提现记录
export const api_withdraw_list = (p) => post("trade/withdrawList", p);

// 绑定邀请码
export const api_bind_invite_code = (p) => post("user/bindInviteCode", p);

// 获取推荐团队列表
export const api_team_list = (p) => post("user/getTeamList", p);

// 商品排序榜
export const api_GoodsRanking = (p) => post("goods/getGoodsRankingList", p);

// 是否显示好友助力弹框
export const api_get_showHelp = (p) => post("user/getShowHelp", p);

// 设置好友助力弹框已显示
export const api_set_showHelp = (p) => post("user/setShowHelp", p);

// 绑定店铺信息
export const api_bind_shopInfo = (p) => post("user/bindShopInfo", p);

// 修改店铺名称
export const api_update_shopInfo = (p) => post("user/updateShopInfo", p);

// 设置客服消息已读
export const api_set_msgRead = (p) => post("user/setMsgRead", p);

// 返佣信息
export const api_rebateInfo = (p) => post("user/rebateInfo", p);

// 返佣记录
export const api_rateList = (p) => post("user/rebateList", p);

// 取消订单
export const api_cancelOrder = (p) => post("order/cancelOrder", p);

// 申请退货
export const api_applyReturnOrder = (p) => post("order/applyReturnOrder", p);

// 提现方式
export const api_tradeWay = (p) => post("trade/payment", p);

// 商品下架
export const api_removeGood = (p) => post("goods/delistGoods", p);

// 创建订单
export const api_createOrder = (p) => post("order/createOrder", p);

// 在线充值
export const api_recharge = (p) => post("trade/recharge", p);

// 上传图片
export const api_uploadImg = (p) => postForm("upload/uploadImg", p);

// 完善信息
export const api_saveInfo = (p) => post("user/storeUserInfo", p);

// 设置安全密码
export const api_setPwd = (p) => post("user/updatePayword", p);

// 获取用户绑定银行卡信息
export const api_getUserBindBankInfo = (p) =>
  post("user/getUserBindBankInfo", p);

// 推荐商品列表
export const api_getRecommendGoods = (p) =>
  post("mall_store/getRecommendGoods", p);

// 商户店铺列表
export const api_getShopList = (p) => post("mall_store/getShopList", p);

// 商户店铺详情
export const api_getShopDetail = (p) => post("mall_store/getShopDetail", p);

// 商户店铺商品列表
export const api_getShopGoodsList = (p) =>
  post("mall_store/getShopGoodsList", p);

// 询单消息列表
export const api_getConsultMsgList = (p) => post("consult_msg/list", p);

// 询单消息详情
export const api_getConsultMsgDetail = (p) => post("consult_msg/detail", p);

// 询单消息回复
export const api_replyConsultMsg = (p) => post("consult_msg/store", p);

// 联系买家
export const api_contactBuyer = (p) => post("order/contactBuyer", p);

// 风控提示/系统公告
export const api_riskNewsInfo = (p) => post("option/getRiskNewsInfo", p);

// 更新风控提示/系统公告已读状态
export const api_updateNewsStatus = (p) => post("option/updateNewsStatus", p);

// 商品一键上架
export const api_addAllGoods = (p) => post("goods/addAllGoods", p);

// web版本的登录
export const api_web_login = (p) => post("login/loginWeb", p);

// web版本的注册
export const api_web_regitser = (p) => post("login/registerWeb", p);

// 添加收藏/取消收藏
export const api_collect_good = (p) => post("user/setUserCollectionGoods", p);

// 收藏列表
export const api_collect_list = (p) => post("user/getUserCollectionList", p);

// 获取邮箱验证码
export const api_sendEmailCode = (p) => post("login/sendEmailCode", p);

// 日志
export const api_addLog = (p) => post("index/addAppApiLog", p);
