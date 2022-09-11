import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqUserLogout,
} from "@/api";

const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
};
const actions = {
  //获取验证码，返回的是验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    console.log("获取验证码返回的信息", result);
    if ((result.code = 200)) {
      commit("GETCODE", result.data);
    } else {
      Promise.reject(new Error("faile"));
    }
  },
  //进行注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log("注册时返回的信息", result);
    if (result.code == 200) {
      return 200;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //登录并获取token
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    console.log("登录后返回的信息", result);
    if (result.code == 200) {
      commit("USERLOGIN", result.data);
      return 200;
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log("获取用户信息", result);
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return 200;
    } else {
      console.log("error");
      return Promise.reject(new Error(result.message));
    }
  },
  //退出登录
  async userLogout({ commit }) {
    let result = await reqUserLogout();
    console.log("退出登录返回的信息", result);
    if (result.code == 200) {
      commit("CLEARUSERINFO");
      return 200;
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  //储存验证码
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, data) {
    //持久化储存token
    localStorage.setItem("TOKEN", data.token);
    state.token = data.token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除仓库中和本地储存中用户相关的数据
  CLEARUSERINFO(state) {
    localStorage.removeItem("TOKEN");
    state.userInfo = {};
    state.token = "";
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
