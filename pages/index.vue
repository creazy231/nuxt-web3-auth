<template>
    <section class="container text-center">
        <h1 class="text-uppercase mb-4">This page is top secret!</h1>
        <p>Logged in with account: {{ $store.state.account.address }}</p>
        <h3 v-if="$store.state.data">{{ $store.state.data }}</h3>
        <button @click="logout" class="btn btn-danger">Logout</button>
    </section>
</template>

<script>
    const Cookie = process.client ? require('js-cookie') : undefined;
    export default {
        middleware: ['authenticated'],
        methods: {
            logout() {
                Cookie.remove('auth');
                window.location.reload();
            }
        }
    }
</script>