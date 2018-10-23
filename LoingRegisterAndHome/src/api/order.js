import request from '@/utils/request'

/**
 * 获取套餐信息
 */
export function getOrderMessage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web//preferential/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 添加订单
 */
export function insertOrder(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/module_order/insert/order',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 获取订单列表
 */
export function getOrderLists(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/module_order/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 认领订单
 */
export function claimOrder(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/module_order/update/person',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}