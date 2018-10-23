import request from '@/utils/request'

/**
 * 申请页面搜索元器件接口
 */
export function ApplySearch(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product/read/list_by_name',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 申请页面申请元器件接口
 */
export function ApplyPart(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/order/home/insert',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'multipart/form-data'
      }
  });
}