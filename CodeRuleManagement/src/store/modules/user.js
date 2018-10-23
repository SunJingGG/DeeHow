import { loginByUsername, logout, getUserInfo , login , getMenu} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
function handleData (item) {
  const localItem = {
    path: item.menuUrl,
    name: item.menuName
  }
  return localItem;
}
function mapRoles (menus) {
  menus.forEach(item => {
    let localItem = {}
    localItem = handleData(item)
    window.roles.push(localItem)
    if (localItem) {
      if (item.children && item.children.length) {
        mapRoles(item.children)
      }
    }
  })
}

function mapMenus (menus) {
  const arrayOfSquares = menus.map(item => {
    let localItem = {}
    localItem = handleData(item)
    if (localItem) {
      if (item.children && item.children.length) {
        localItem.children = mapMenus(item.children)
      }
      return localItem
    }
    return false;
  });
  return arrayOfSquares
}
function getSessionMenu(){
  return new Promise((resolve, reject)=>{
    let ymenus = JSON.parse(localStorage.getItem('CodeRuleManagement'));
    if(ymenus){
      let obj = {data:ymenus}
      resolve(obj)
    }else{
      reject()
    }
  })
}

const user = {
  state: {
    userDetail: {},
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    navbarMenus: [],
    currentRouter: [],
    userRuls: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERDETAIL: (state, info) => {
      state.userDetail = info
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAVBARMENUS: (state, menus) => {
      state.navbarMenus = menus
    },
    SET_CURRENTROUTER: (state, router) => {
      state.currentRouter = router
    },
    SET_USERRULS: (state, router) => {
      state.userRuls = router
    },

  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          commit('SET_USERDETAIL', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户菜单
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSessionMenu().then(response => {
          const data = response.data;
          if(data.length==0){
            alert('未获取到菜单信息');
            reject('未获取到菜单信息');
            return false;
          }
          // 处理所有菜单，用户核对路由表进行挂载
          const menus = mapMenus(data)
          // 根据后台的菜单权限数据，生成前端对应的权限表，
          // 为了和前端的路由匹配，制作成一维数组格式，用于稍后和前端路由表过滤匹配
          // 内容处理后先存放到window.roles, 然后在存放到数据中心的权限表
          // 数据例子如下[{path:'/OA', name: 'OA管理'},{path: 'userManagement',name: '用户管理'}]
          // 把后台权限表的多维数据转化为1位数组
          // console.log(menus)
          console.log(menus)
          window.roles = []
          mapRoles(data)
          commit('SET_ROLES', window.roles);
          // console.log(menus)
          // console.log(window.roles)
          window.roles = []
          commit('SET_CURRENTROUTER', menus)
          commit('SET_USERRULS', data)
          resolve(response);
        }).catch(error => {
          console.log(error)
          removeToken();
          resolve();
          console.log('调用菜单接口出错');
          // reject(error);
        });
      });
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({}).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },

    Login({ commit }, userInfo) {

      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          switch (response.httpCode) {
            case 303:
              alert(response.msg)
              this.loading = false;
              break;
            default:
              const data = {
                token: 'manger'
              }
              getMenu({}).then(response => {
                if (response.httpCode == 200) {
                  let menus = response.data;
                  if(menus.length==0){
                    reject('未获取到菜单')
                  }
                  localStorage.setItem('userMenu', JSON.stringify(response.data));
                  let ApprovalProcess = [];
                  let organizationalStructure = [];
                  let CodeRuleManagement = [];
                  menus.forEach((v, i) => {
                    // v.menuUrl == "/OA" || v.menuUrl == "/BASE" || v.menuUrl == "/WK" || v.menuUrl == "/HR" || v.menuUrl == "/FC" || v.menuUrl == "/CPK" || v.menuUrl == "/CHART" || v.menuUrl == "/INTECC"
                    if (v.remark == "ApprovalProcess") {
                      ApprovalProcess.push(v)
                    } else if(v.remark == "organizationalStructure") {
                      organizationalStructure.push(v);
                    } else if(v.remark == "CodeRuleManagement") {
                      CodeRuleManagement.push(v);
                    } 
                  })
                  localStorage.setItem("ApprovalProcess", JSON.stringify(ApprovalProcess))
                  localStorage.setItem("organizationalStructure", JSON.stringify(organizationalStructure))
                  localStorage.setItem("CodeRuleManagement", JSON.stringify(CodeRuleManagement))
                  console.log(menus)
                  setToken(data.token)
                  commit('SET_TOKEN', data.token);
                  resolve()
                }
              }).catch(error => {
                console.log(error)
              })
          }
        }).catch(error => {
          reject(error)
        });
      });
    },
  }
}

export default user
