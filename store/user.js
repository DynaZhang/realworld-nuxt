import Cookies from 'js-cookie'

export default {
    namespaced: true,
    state() {
        return {
            userInfo: null
        }
    },
    getters: {
        getUserInfo: state => state.userInfo
    },
    mutations: {
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo;
            Cookies.set('user', JSON.stringify(userInfo));
        }
    },
    actions: {
        setUserInfoAction({commit}, userInfo) {
            commit('setUserInfo', userInfo);
        }
    }
}
