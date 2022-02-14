export default function ({ store, route, redirect }) {
    if (!store.state.user.userInfo) {
        redirect('/login');
    } else if (store.state.user.userInfo && (route.path === '/login' || route.name === '/register')) {
        redirect('/');
    }
}
