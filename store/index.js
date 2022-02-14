import Vuex from "vuex";
import cookieparser from "cookieparser";
import user from "./user";

const createStore = () => {
    return new Vuex.Store({
        modules: {
            user
        },
        actions: {
            nuxtServerInit({commit, dispatch}, {req}) {
                let userInfo = null;
                if (req.headers.cookie) {
                    const parsed = cookieparser.parse(req.headers.cookie);
                    try {
                        userInfo = JSON.parse(parsed.user);
                    } catch (err) {
                        // No valid cookie found
                    }
                }
                dispatch('user/setUserInfoAction', userInfo);
            }
        }
    })
}

export default createStore;
