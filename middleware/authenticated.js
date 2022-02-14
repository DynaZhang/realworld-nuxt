export default function ({ store, route, redirect }) {
    if (!store.state.user.userInfo) {
        redirect('/login')
    }
}
