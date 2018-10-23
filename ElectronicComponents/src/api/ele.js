

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
 * 删除类目树
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
 * 获取模板下所有属性
 */
export function readPropertyClassList(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/property/read/tree/property',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 获取所有属性属性结构
 */
export function readPropertyTree(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/property/read/tree',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 添加属性属性结构
 */
export function addPropertyTree(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/property/update/template',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 添加属性属性结构
 */
export function copyPropertyTree(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/property/update/template/copy',
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
 * 批量修改节点属性
 */
export function updateAllHaveProperty(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/category/property/relation/update/all',
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
// elib/category
/**
 * 获取订单列表
 */
export function readOrderPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/order/list/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 认领单列表的订单
 */
export function reciveOrder(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/order/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 提交审批认领单列表的订单
 */
export function startProcessOrder(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-BPM-Web/elib/process_approve/start_process_instance',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 三合一接口
 */
export function addApplyStart(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/start/process',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 三合一接口第二部
 */
export function addWarehousingProcess(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/warehousing/start/process',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 提交审批修改追踪状态接口
 */
export function updateProcessMonitor(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-BPM-Web/elib/process_monitor/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 订单详情
 */
export function readOrderDetail(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/order/read/detail_by_id',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 末级节点下的所有属性 , 包括公共的和特殊的属性
 */
export function getLastCateProperty(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/read/property/name',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 获取一级大类
 * 参数{"type":"1"} 标识 原理图
 * 2 标识 为封装符号
 */
export function readComponentOlbLibraryList(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/componentOlbLibrary/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**d
 * 获取大类下面的选项 
 */
export function readComponentOlbLibrarySvgList(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/componentOlbLibrary/svg/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 建库
 */
export function updateAddApply(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/data/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 建库详情
 */
export function readAddApplyDetail(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/data/read/detail',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 建库申请
 */
export function buildLibApply(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 建库申请
 */
export function putInStorage(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/add_apply/confirmation_of_warehousing	',
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
 * 获取类目下的物品分页
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
/**
 * 物品详情接口
 */
export function readCategoryGoodsDetail(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/product/read/detail_by_id',
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
 * 物品修改新旧值
 */
export function updateProjectReviseApply(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 物品修改公海列表
 */
export function readReviseApplyPage(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 认领修改公海的任务
 */
export function updateReviseApplyStatus(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/update/status',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改库数据回显
 */
export function readReviseApplyMore(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/read/more',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改库数据回显
 */
export function readReviseApplyDetail(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/data/read/detail',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 改库
 */
export function updateReviseApply(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/data/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 改库后确认入库
 */
export function updateConfirmationOfWarehousing(data) {
  const params = JSON.stringify(data);
  return request({
      url: 'deehow-ELIBM-Web/elib/component/revise_apply/confirmation_of_warehousing',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 建库详情
 */
export function getImgPublic(data) {
  return request({
      url: 'deehow-CMS-Web/public/file/view?filePath='+data,
      method: 'get',
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
 * 申请页面修改申请元器件接口
 */
export function updateApplyPart(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/order/home/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'multipart/form-data'
      }
  });
}
/**
 * 供应商客户分页
 */
export function readScmSupplierPage(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersAndSuppliers/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 供应商客户列表
 */
export function readScmSupplierList(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersAndSuppliers/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 检查是否有错误数据
 */
export function lookCheckScmSupplier(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersAndSuppliers/retrieval/repetition',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 检查是否有错误数据
 */
export function updateAllScmSupplier(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersAndSuppliers/insertAll',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 修改供应商客户
 */
export function updateScmSupplier(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersAndSuppliers/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 删除供应商客户
 */
export function deleteScmSupplier(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersAndSuppliers/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料分页
 */
export function readManufacturersPage(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料全部
 */
export function readManufacturersList(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料同代理供应商关系接口
 */
export function readManufacturersSuppliersList(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturersSuppliers/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料新增
 */
export function updateManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料修改
 */
export function auditManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/modify',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量导入制造商物料修改
 */
export function importManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/import/lookSure',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量导入制造商物料状态修改
 */
export function importStatusManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/import/status/sure',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量导入制造商物料查询不合格是那几个
 */
export function lookCheckManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/import/look/check',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量导入制造商物料查询状态不合格是那几个
 */
export function lookCheckStatusManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/import/status/check',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料是否被代理
 */
export function lookManufacturersPartIsUse(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/is/use',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 制造商物料删除
 */
export function deleteManufacturers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 代理商代理物料
 */
export function readSuppliersAttrPage(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 代理商代理物料
 */
export function readSuppliersAttrList(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/read/list',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 代理商代理物料
 */
export function updateSuppliersAttr(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 代理商代理物料
 */
export function deleteSuppliersAttr(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 批量导入供应商物料修改
 */
export function lookCheckSuppliers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/import/look/validate',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 批量导入供应商物料修改
 */
export function importSuppliers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/import/look/sure',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 供应商价格更新导出模板：
 /export/format/price
 供应商价格更新导入预览：
 /import/look/price
 供应商价格更新导入预览检查：
 /import/price/look/validate 参数：List<ComponentSuppliers>
 供应商价格更新导入预览确定：
 /import/price/look/sure 参数：List<ComponentSuppliers>
 
 */

/**
 * 批量导入供应商物料修改
 */
export function lookCheckPriceSuppliers(data) {
  const params =data;
  return request({
    url: '/deehow-ELIBM-Web/suppliers/import/price/look/validate',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 批量导入供应商物料修改
 */
export function importAllPriceSuppliers(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/import/price/look/sure',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 元器件导入检查是否有错误数据
 */
export function lookProductCheckData(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/product/check/data',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 元器件批量保存
 */
export function updataProductByList(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/product/import',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 制造商列表
 */
export function manufacturersList(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/suppliers/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 相似器件接口
 */
export function sameparts(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/product/read/similitude_Part',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 元器件可替代物料列表接口
 */
export function fungibleparts(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/product/anon/read/replace_part',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 新增元器件可替代物料列表接口
 */
export function addfungibleparts(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/product/add_Replace_Part',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 删除元器件可替代物料列表接口
 */
export function deletefungibleparts(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/elib/product/delete_replace_part',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 调用关系图的接口
 */
export function Callgraphs(data) {
  const params =data;
  return request({
      url: '/deehow-ELIBM-Web/bomVersionManage/product/part_product_chart',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}