
import request from '@/utils/request'

/**
 * 租户列表
 */
export function readRegisterPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/register/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 租户审核打回 1 通过 2 打回 0 初始
 */
export function updateRegister(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/register/audit_unit',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 查看现有租户
 */
export function readSelectTenantUnitPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/unit/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 查看现有租户拥有的模块
 */
export function readSelectTenantModelList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/sys_tenant_model/read/my_model/by_tenant',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 选择租户查看租户所目前的模块状态
 */
export function readSelectTenantModelListStatus(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/sys_tenant_model/read/all_model/by_tenant',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 选择租户查看租户所目前的模块状态
 */
export function updateSelectTenantModelListStatus(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/sys_tenant_model',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 查看模块列表
 */
export function readAppList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/app/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改模块
 */
export function updateApp(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/app/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改模块
 */
export function clearCache(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/cache/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

// /cache/update




/**
 * 系统任务调度列表页面
 */
export function scheduledList(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled/read/tasks',
      method: 'put',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统任务调度执行日志页面
*/
export function scheduledLogList(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled/read/log',
      method: 'put',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统任务调度update
*/
export function scheduledUpdate(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统任务调度delete
*/
export function scheduledDelete(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled',
      method: 'delete',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统任务调度run
*/
export function scheduledRun(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled/run',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统任务调度close
*/
export function scheduledClose(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled/close',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统任务调度open
*/
export function scheduledOpen(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/scheduled/open',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}

/**
* 系统日志列表页面        /api/event/read/list

*/
export function sysEventList(data) {
  let params = JSON.stringify(data)
  return fetch({
      url: '/deehow-CMS-Web/event/read/list',
      method: 'post',
      data: params,
      headers: {
          'content-type': 'application/json'
      }
  });
}