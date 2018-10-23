import request from '@/utils/request'


// 编码分类树形
export function readCodingClassTree(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/codeCategory/read/queryList',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
// 修改编码分类
export function updataCodingClass(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/codeCategory/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
// 删除编码分类
export function deleteCodingClass(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/codeCategory/delete',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

// 修改编码规则
export function updataCodingRule(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/codeRule/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
// 编码规则
export function readCodingRuleList(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/codeRule/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
// 生成编码
export function getBarcode(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/codeValue/getBarcode',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
