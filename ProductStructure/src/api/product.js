
import request from '@/utils/request'

/**
 * 添加产品的接口
 */
export function AddProduct(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomProductManage/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 产品树的接口
 */
export function ProductTree(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomProductManage/read/tree',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 删除产品的接口
 */
export function deleteProduct(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomProductManage/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 所有产品列表的接口
 */
export function Allproductlist(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomProductManage/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 版本添加接口
 */
export function AddbomVersion(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 所有版本列表的接口
 */
export function Allversionlist(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 版本删除接口
 */
export function deleteVersion(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 分类列表接口
 */
export function classList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomClassManage/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 元器件列表接口
 */
export function partList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomComponentManage/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 产品复制接口
 */
export function productCopy(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/product/version/clone',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 产品结构图接口
 */
export function productStructure(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/product/assumption/diagram',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 产品结构图接口
 */
export function readProductInfoData(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product_compare/query_product_info',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 类目树
 */
export function readCategoryTree(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/category/read/anon/tree',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 在版本下新增BOM
 */
export function updateBomComponentManage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomComponentManage/create/component',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 在版本下替换BOM
 */
export function replaceBomComponentManage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomComponentManage/replace/component',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 在版本下删除BOM
 */
export function deleteBomComponentManage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomComponentManage/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 版本关联版本
 */
export function updateBomVersionRelation(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionRelation/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 获取关联的版本列表
 */
export function readBomVersionRelationList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionRelation/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 删除关联的版本
 */
export function deleteBomVersionRelation(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionRelation/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 查看版本之间的关系
 */
export function readVersionAssumption(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/version/assumption/diagram',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}