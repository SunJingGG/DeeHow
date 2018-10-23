

import request from '@/utils/request'

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
 * 修改类目树
 */
export function updateCategory(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/category/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 添加类目树
 */
export function deleteCategory(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/category/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 获取所有属性
 */
export function readPropertyList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/property/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 查看节点有属性
 */
export function readHavePropertyList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/category/property/relation/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改节点属性
 */
export function updateHaveProperty(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/category/property/relation/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 删除节点属性
 */
export function deleteHaveProperty(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/category/property/relation/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 获取类目下的物品
 */
export function readCategoryGoods(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/category/read/anon/tree/goods',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 物品详情接口
 */
export function readCategoryGoodsDetail(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/product/anon/read/detail_by_id',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 物品详情中生命周期接口
 */
export function readCategoryGoodsDetaillife(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/manufacturersLife/anon/life/cycle',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 物品详情表格中价格和库存接口
 */
export function readCategoryGoodsDetailprice(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/componentSuppliersPriceLog/anon/read/list_by_supplier',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 物品详情表格接口
 */
export function readCategoryGoodsDetailtable(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/suppliers/anon/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 物品分页接口
 */
export function readCategoryGoodsPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/product/anon/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
// elib/category