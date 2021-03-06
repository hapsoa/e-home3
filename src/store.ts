/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
// import firebase from '@/firebase';
import { User } from '@/form/class';

Vue.use(Vuex);

const initState: {
  myUser: User | null | undefined; // 로그인상태 | 로그인안된 상태 | 유저정보 확인이 아직 안된 상태
  isLogin: boolean;
  savedMethods: Array<() => void>;
  isLoading: boolean;
  lastDiaryIndex: number | null;
} = {
  myUser: undefined,
  isLogin: false,
  savedMethods: [],
  isLoading: true,
  lastDiaryIndex: null
};

export default new Vuex.Store({
  state: initState,
  mutations: {
    login(state, user) {
      state.isLogin = true;
      state.myUser = user;
    },
    logout(state) {
      state.isLogin = false;
    },
    saveMethod(state, method) {
      state.savedMethods.push(method);
    },
    shotMethods(state) {
      if (!_.isEmpty(state.savedMethods)) {
        _.forEach(state.savedMethods, method => method());
        console.log('saved methods are shot');
      }
      state.savedMethods = [];
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
      console.log('loading end');
    },
    addLastDiaryIndex(state) {
      if (!_.isNil(state.lastDiaryIndex)) {
        state.lastDiaryIndex += 1;
        console.log('success addLastIndex');
      }
    }
  },
  actions: {
    // async setLastDiaryIndex(context) {
    //   context.state.lastDiaryIndex = (await firebase.database.getDiaryLastIndex()) as number;
    //   console.log('setted lastIndex: ', context.state.lastDiaryIndex);
    // },
  }
});
