
import request from '@/utils/request'

// /elib/component/add_apply/data/read/detail
/**
 * 通过申请流程Key 获取详情
 */
export function readAddApplyDetialByKey(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/add_apply/data/read/detail',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 通过修改流程Key 获取详情
 */
export function readeditApplyDetialByKey(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/revise_apply/data/read/detail',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


