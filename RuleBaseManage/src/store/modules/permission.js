import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 比较路由是否在后台的权限表里面,返回true表示有权限，保留路由表中的该项，否则删除该项路由表
 * @param {*} path 当前路由的路径 
 * @param {*} name 路由的名称
 */
function compareRoles(path, name, roles) {
  
  if (path !== '*') {
    return roles.some( role => role.path === path && role.name === name)
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function filterRouter(asyncRouterMap, roles) {
  let accessedRouters = asyncRouterMap.filter(route => {
    // if(route.path == 'prIrOr'){
    //   console.log(123)
    //   console.log(compareRoles("prIrOr", '产品报检作业', roles))
    //   // console.log(route.name)
    //   console.log(compareRoles(route.path, route.name, roles))
    //   console.log(123)
    //   debugger;
    // }
    // console.log(compareRoles("prIrOr", '产品报检作业', roles))
    if (compareRoles(route.path, route.name, roles)) {
      // if(route.path == 'operation'){
      //   console.log(route.children);
      //   debugger;
      // }
      if (route.children && route.children.length) {
        
        route.children = filterRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    GenerateRoutesByMenus({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRouters = [];
        accessedRouters = filterRouter(asyncRouterMap, roles);
        console.log(accessedRouters);
        // debugger
        accessedRouters.forEach((val,ind)=>{
          if(val.path !== '*'){
            let str = val.path;
            str += '/' + val.children[0].path;
            val.redirect = str;
            val.children.forEach((v,i)=>{
              let strr = v.path;
              if(v.children){
                if(v.children[0]){
                  strr += '/' + v.children[0].path;
                  v.redirect = val.path+'/'+ strr
                }
              }
            });
          }
        });
        console.log(accessedRouters);
        console.log('---------')
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}

export default permission
