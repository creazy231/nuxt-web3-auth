export default async function ({route, store, redirect, $axios}) {

    const noAuth = route.fullPath === '/login';
    if (noAuth) return;

    // If the user is not authenticated
    if (!store.state.account.signature || !store.state.account.address) {
        return redirect('/login');
    } else {
        const ret = await $axios.$get('/api/v1/user/top-secret-content');

        if (ret.success) {
            store.state.data = ret.data;
        } else {
            return redirect('/login');
        }
    }
}