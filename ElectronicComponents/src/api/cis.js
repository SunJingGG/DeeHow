
import request from '@/utils/request'
/**
 * 方案列表
 */
export function planList(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/cisScheme/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 新增方案
 */
export function createPlan(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 获取一级类目
 */
export function getHeadCategory(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/elib/category/anon/read/head',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 生成接口
 */
export function createTable(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/create/table',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除方案
 */
export function deleteData(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/delete',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 看是否可用
 */
export function isUse(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/read/tablename',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 获取表名称
 */
export function getAllTables(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/get/tablename',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 数据同步
 */
export function syncData(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/sync/data',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 同步所有数据
 */
export function syncAllData(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/sync/all/data',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 修改表名称
 */
export function updateTableName(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ELIBM-Web/cisScheme/update/tablename',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
