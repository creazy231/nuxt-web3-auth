import axios from 'axios';

export default async function ({route, store, redirect, $axios}) {

    const noAuth = route.fullPath === '/login';
    if (noAuth) return;

    // If the user is not authenticated
    if (!store.state.account.signature || !store.state.account.address) {
        return redirect('/login');
    } else {
        const success = await $axios.$get('/api/v1/user/verify', {
            headers: {
                'signature': store.state.account.signature,
                'address': store.state.account.address
            }
        });

        if (!success.success) {
            return redirect('/login');
        }
    }
}