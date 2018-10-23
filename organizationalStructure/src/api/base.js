
import request from '@/utils/request'

/**
 * 查看现有租户
 */
export function readMyModelList(data) {
  
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
 * 获取客户专员信息
 */
export function getClient(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/module_order/get/operating_person',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 提交客户专员信息
 */
export function addClient(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/module_order/insert/order/model',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

// /dept/read/tree


/**
 * 部门分页
 */
export function readDeptPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 部门全部
 */
export function readDeptList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 部门树形
 */
export function readDeptTree(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept/read/tree',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 添加部门
 */
export function updateDept(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 启用部门
 */
export function updateUseDeptOpen(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept/use/open',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 禁用部门
 */
export function updateUseDeptStop(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept/use/stop',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 删除部门
 */
export function deleteDept(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dept',
      method: 'delete',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

// /user/read/page	
/**
 * 查看部门下的员工分页
 */
export function readUserPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 查看所有员工
 */
export function readUserList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 添加员工
 */
export function updateUser(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量添加员工
 */
export function batchUpdateUser(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/update/all',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量修改员工
 */
export function updateUserByList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/update/by/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 禁止登录 禁用 
 */
export function modfyUser(data,lj) {
  const params = JSON.stringify(data);
  return request({
      url: `/deehow-CMS-Web/user/operation/${lj}`,
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改密码
 */
export function reseatPassword(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/update/reset_userpwd',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 角色分页
 */
export function readRolePage(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 角色列表全部
 */
export function readRoleList(data) {
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
 * 人员拥有的角色
 */
export function readUserRoleList(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/read/role',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 人员拥有的角色
 */
export function updateUserRole(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/update/role',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 角色下包括的人员
 */
export function RoleUser(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/read/user',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 角色人员关系维护
 */
export function RoleUserDo(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/update/user',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 角色分页
 */
export function updateRole(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 删除角色
 */
export function deleteRole(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role',
      method: 'delete',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 角色权限字典值
 */
export function readDicList(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/dic/read/list',
      method: 'put',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 角色拥有的权限
 */
export function readRoleMenu(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/read/menu',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改角色拥有的权限
 */
export function updateRoleMenu(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/update/menu',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改角色拥有的权限的功能
 */
export function updateRoleMenuPermission(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/role/update/permission',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
