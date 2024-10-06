export type goods_fl = {
  cat_id: number
  sort: number
  cat_name: string
}

export type goods = {
  visits: number
  day_sales_num: number
  week_sales_num: number
  goods_price: number
  goods_profit: number
  goods_name:string
  cover_img:string
}

export type goods_tj = {
  create_time: string
  goods: goods
  goods_id: number
  hot_time: string
  is_hot: number
  is_promotion: number
  sale_num: number
  status: number
  ug_id: number
  uid: number
  update_time:string
}