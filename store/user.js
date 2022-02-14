export default {
    namespaced: true,
    state: {
        userInfo: null
    },
    getters: {
        getUserInfo: state => state.userInfo
    },
    mutations: {
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo;
        }
    },
    actions: {
        setUserInfoAction({commit}, userInfo) {
            commit('setUserInfo', userInfo);
        }
    }
}
