
import request from '@/utils/request'

export function deviceDocumentUpateFolder(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/update/folder',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
/**
 * 文件类目 树结构
 */

export function deviceDocumentReadTree(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/read/tree',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
export function deviceDocumentReadList(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/read/list',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 文件类目 树结构
*/

export function deviceDocumentDeleteFolder(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/delete/folder',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
/**
* 文件数据保存在数据库
*/

export function deviceDocumentUpdateDocument(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/update/document',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
/**
* 删除单个文件
*/
export function deviceDocumentDeleteDocument(data) {

  const params = JSON.stringify(data);
  return request({
      url: 'charger-DEV-Web/document/delete/document',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 修改文件名称
*/
export function deviceDocumentUpdate(data) {

  const params = JSON.stringify(data);
  return request({
      url: 'charger-DEV-Web/document/update',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
/**
* 下载文件
*/
export function deviceDocumentDownloadFolder(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/downloadFolder',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
/**
*  部门接口
*/
//
export function apiDeptReadList(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/read/list',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
/**
*  分配接口
*/
//
export function deviceDocumentDownloadUpdate(data) {

  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/document/update/dept',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}
