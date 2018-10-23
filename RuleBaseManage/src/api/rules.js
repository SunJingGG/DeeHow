
import request from '@/utils/request'

// /elib/component/add_apply/data/read/detail
/**
 * 添加规则接口
 */
export function addRules(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/ruleBase/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 添加模块接口
 */
export function addModels(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/ruleModel/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 规则树列表接口
 */
export function rulesList(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/ruleBase/read/tree',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 删除模型接口
 */
export function deleteModel(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/ruleModel/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 删除规则接口
 */
export function deleteRules(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/ruleBase/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 查询规则条目分页接口
 */
export function rulesTable(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/entry/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 修改或添加条目接口
 */
export function addEntry(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/entry/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 删除条目接口
 */
export function deleteEntry(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/entry/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 获取条目维护值接口
 */
export function uphodeLists(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/maintenanceItem/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 条目图片上传接口
 */
export function entryPicture(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/entry/upload/picture',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 条目文档上传接口
 */
export function entryFile(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ERULEM-Web/erulem/anon/entry/upload/document',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 添加模块接口
 */
export function addItemAttributesData(data) {

  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ERULEM-Web/erulem/anon/maintenanceItem/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/**
 * 查看维护项接口
 */
export function getMaintenanceItem(data) {

  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ERULEM-Web/erulem/anon/maintenanceItem/read/page',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 删除维护项接口
 */
export function deleteMaintenanceItem(data) {

  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ERULEM-Web/erulem/anon/maintenanceItem/delete',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 添加集合类型接口
 */
export function addSetsItem(data) {

  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ERULEM-Web/erulem/anon/maintenanceItemCollection/update',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 查询集合类型接口
 */
export function readSetsItem(data) {

  const params = JSON.stringify(data);
  return request({
    url: '/deehow-ERULEM-Web/erulem/anon/maintenanceItemCollection/read/list',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
