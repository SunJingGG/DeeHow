import request from '@/utils/request'
/**
 * bom导入解析
 */
export function byConnectionAttribute(data) {
  
  const params = data;
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/excel/analysis/by_connection_attribute',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'multipart/form-data'
      }
  });
}
/**
 * bom比较
 */
export function readProductListByName(data) {
  
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
 * 导入BOM
 */
export function updateBomVersionManage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/insert/database',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
// /bomVersionManage/excel/analysis/by_connection_attribute

/**
 * 产品版本树的接口
 */
export function readProductTree(data) {
  
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
 * 产品版本树之间的对比
 */
export function readBomCompareFrom(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product_compare/bom_compare_from_export',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * BOM对比结果 , 
 */
export function readProductCompareResult(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product_compare/compare_result_format',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * BOM对比结果 , 导出excel
 */
export function exportExcleComparResult(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product_compare/export/compare_list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * BOM对比结果 , 导出excel
 */
export function bomVersionCompare(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product_compare/bom_compare',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 导入数据与产品对比对比结果 , 导出excel
 */
export function AndProductCompare(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/product_compare/component_compare_from_export',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}