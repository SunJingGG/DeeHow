
import request from '@/utils/request'

/**
 * 表单库添加修改接口
 */
export function flowAddForm(data) {
  
  // const params = JSON.stringify(data);
  const params =data;//提交表单数据和上传文件
  return request({
      url: '/deehow-BPM-Web/elib/process_form/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'multipart/form-data'  //application/json
      }
  });
}

/**
 * 表单库列表查询接口
 */
export function flowFormList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_form/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 表单库列表查询接口(全部)
 */
export function flowFormListAll(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_form/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 待办任务列表查询接口
 */
export function waitDoList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/select_pending_task',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 获取表单的url集合接口
 */
export function formUrlList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_form/query_form_url',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 流程启动接口
 */
export function startflow(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/start_process_instance',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 申请页面申请元器件接口
 */
export function ApplyPart(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/order/home/insert',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'multipart/form-data'
      }
  });
}

/**
 * 审批页元器件申请详情接口
 */
export function ApplyDetail(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/order/read/detail_by_id',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 审批页元器件修改详情接口
 */
export function editDetail(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/revise_apply/read/more',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 流程审批同意接口
 */
export function AgreeProcess(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/agree_process_task',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 修改申请同意接口
 */
export function AgreeEditProcess(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/revise_apply/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 审批页修改业务数据状态接口
 */
export function UpdateApply(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/order/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 流程审批打回接口
 */
export function DisAgreeProcess(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/repulse_process_task',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 修改申请打回接口
 */
export function DisAgreeEditProcess(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/revise_apply/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 流程审批历史接口
 */
export function ProcessHis(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/select_process_history',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 流程审批转办接口
 */
export function TurnProcess(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/repulse_process_transfer',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 动态流程图加载接口
 */
export function ProcessImg(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/select_process_diagram',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}



/**
 * 已办任务列表查询接口
 */
export function HaveDone(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/select_process_task',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 我的审批（全部审批）流程列表接口
 */
export function AllData(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/select_process_apprval',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 选择人员部门树形接口
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
 * 查看部门下的员工分页(所有员工)
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
 * 流程设计列表查询接口
 */
export function flowDesignPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/model/query_process_templet',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 流程模板创建接口
 */
export function flowCreate(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/model/create',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 流程人员设置信息加载接口
 */
export function flowUsersFit(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/get_process_set',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 流程人员设置信息保存接口
 */
export function flowUsersFitSave(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-BPM-Web/elib/process_approve/save_process_set',
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
 * 用户id查询部门接口
 */
export function userIdDept(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/get_departments',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 元器件申请入库同意打回接口
 */
export function agreeDatebase(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/add_apply/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 元器件修改入库同意打回接口
 */
export function editagreeDatebase(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/elib/component/revise_apply/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
