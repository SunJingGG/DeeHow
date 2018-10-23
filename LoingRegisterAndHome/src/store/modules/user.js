import { loginByUsername, logout, getUserInfo , login , getMenu , loginDyn} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { exitApp } from '../../utils/auth';


function getSessionMenu(){
  return new Promise((resolve, reject)=>{
    let ymenus = JSON.parse(localStorage.getItem('operationMaintenance'));
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
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
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
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
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
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
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
        logout(state.token).then(() => {
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
                  // setToken(data.token)
                  // commit('SET_TOKEN', data.token);
                  let menus = response.data;
                  console.log(menus)
                  if(!menus){
                    // exitApp()
                    reject('未获取到菜单');
                    return false;
                  }
                  localStorage.setItem('userMenu', JSON.stringify(response.data));
                  let operationMaintenance = [];
                  let organizationalStructure = [];
                  let ElectronicComponents = [];
                  let ApprovalProcess = [];
                  let RuleBaseManage = [];
                  let BOMManage = [];
                  let ProductStructure = [];
                  let CodeRuleManagement = [];
                  menus.forEach((v, i) => {
                    if (v.remark == "operationMaintenance") {
                      operationMaintenance.push(v)
                    } else if(v.remark == "organizationalStructure") {
                      organizationalStructure.push(v);
                    } else if(v.remark == "ElectronicComponents") {
                      ElectronicComponents.push(v);
                    } else if(v.remark == "ApprovalProcess") {
                      ApprovalProcess.push(v);
                    } else if(v.remark == "RuleBaseManage") {
                      RuleBaseManage.push(v);
                    } else if(v.remark == "BOMManage") {
                      BOMManage.push(v);
                    } else if(v.remark == "ProductStructure") {
                      ProductStructure.push(v);
                    } else if(v.remark == "CodeRuleManagement") {
                      CodeRuleManagement.push(v);
                    } 
                    
                  })
                  localStorage.setItem("operationMaintenance", JSON.stringify(operationMaintenance))
                  localStorage.setItem("organizationalStructure", JSON.stringify(organizationalStructure))
                  localStorage.setItem("ElectronicComponents", JSON.stringify(ElectronicComponents))
                  localStorage.setItem("ApprovalProcess", JSON.stringify(ApprovalProcess))
                  localStorage.setItem("RuleBaseManage", JSON.stringify(RuleBaseManage))
                  localStorage.setItem("BOMManage", JSON.stringify(BOMManage))
                  localStorage.setItem("ProductStructure", JSON.stringify(ProductStructure))
                  localStorage.setItem("CodeRuleManagement", JSON.stringify(CodeRuleManagement))
                  setToken(data.token)
                  commit('SET_TOKEN', data.token);
                  resolve()
                  console.log(window.location.href)
                }
              }).catch(error => {
                console.log(error)
              })
              // resolve()
              break;
          }
        }).catch(error => {
          reject(error)
        });
      });
    },
    DynLog({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        loginDyn(userInfo).then(response => {
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
                    reject('未获取到菜单');
                    return false;
                  }
                  localStorage.setItem('userMenu', JSON.stringify(response.data));
                  let operationMaintenance = [];
                  let organizationalStructure = [];
                  menus.forEach((v, i) => {
                    if (v.remark == "operationMaintenance") {
                      operationMaintenance.push(v)
                    } else if(v.remark == "organizationalStructure") {
                      organizationalStructure.push(v);
                    } 
                  })
                  localStorage.setItem("operationMaintenance", JSON.stringify(operationMaintenance))
                  localStorage.setItem("organizationalStructure", JSON.stringify(organizationalStructure))
                  setToken(data.token)
                  commit('SET_TOKEN', data.token);
                  resolve()
                  console.log(window.location.href)
                }
              }).catch(error => {
                console.log(error)
              })
              // resolve()
              break;
          }
        }).catch(error => {
          reject(error)
        });
      });
    },
    CodeLog({ commit }) {
      return new Promise((resolve, reject) => {
        const data = {
          token: 'manger'
        }
        getMenu({}).then(response => {
          if (response.httpCode == 200) {
            let menus = response.data;
            if(menus.length==0){
              reject('未获取到菜单');
              return false;
            }
            localStorage.setItem('userMenu', JSON.stringify(response.data));
            let operationMaintenance = [];
            let organizationalStructure = [];
            menus.forEach((v, i) => {
              if (v.remark == "operationMaintenance") {
                operationMaintenance.push(v)
              } else if(v.remark == "organizationalStructure") {
                organizationalStructure.push(v);
              } 
            })
            localStorage.setItem("operationMaintenance", JSON.stringify(operationMaintenance))
            localStorage.setItem("organizationalStructure", JSON.stringify(organizationalStructure))
            setToken(data.token)
            commit('SET_TOKEN', data.token);
            resolve()
          }
        }).catch(error => {
          reject(error)
          console.log(error)
        })
      });
    },
  }
}

export default user
