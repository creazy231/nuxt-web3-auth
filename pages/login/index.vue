<template>
    <section class="container text-center">
        <p>Please select your login method.</p>
        <p>For the purpose of this demo, only <span style="font-weight: bold;">MetaMask</span> login is implemented.</p>

        <div class="login-buttons">
            <button @click="login" class="btn btn-metamask">Login with MetaMask</button>
            <button class="btn btn-facebook">Login with Facebook</button>
            <button class="btn btn-github">Login with GitHub</button>
        </div>
    </section>
</template>

<script>
    const Cookie = process.client ? require('js-cookie') : undefined;

    export default {
        async mounted() {
            window.$state = this.$store.state;
        },

        methods: {
            getAccount() {
                return new Promise((resolve) => {
                    window.$web3.eth.getAccounts().then(res => {
                        if (!res.length) {
                            alert("Please login to MetaMask!");
                            return;
                        }
                        return resolve(res[0]);
                    });
                });
            },

            createSignature(address, nonce) {
                return new Promise((resolve, reject) => {
                    window.$web3.eth.personal.sign(`Sign Nonce: ${nonce}`, address.toLowerCase(), '').then(signature => {
                        return resolve(signature);
                    }).catch(e => {
                        return reject(e);
                    });
                });
            },

            async login() {
                const address = this.$store.state.account.address;
                if (!address) return alert("Please login to Metamask first");
                const nonce = (await this.$axios.$get(`/api/v1/user/nonce/${address}`)).nonce;

                const signature = await this.createSignature(address, nonce);

                console.log(signature);

                this.$store.state.account.signature = signature;

                const auth = {
                    address: address,
                    nonce: nonce,
                    signature: signature,
                };

                Cookie.set('auth', auth);
                this.$router.push('/');

                // this.getAccount().then((address) => {
                //     axios.get(`/api/users/${address.toLowerCase()}`).then((res) => {
                //         if (res.status === 200) {
                //             window.$web3.eth.personal.sign(window.$web3.utils.fromUtf8(`Login with nonce: ${res.data.nonce}`), address.toLowerCase()).then((signature) => {
                //                 axios.get(`/api/users/${address.toLowerCase()}/${signature}`).then((res) => {
                //                     if (!res.data.success) {
                //                         alert("Login failed!");
                //                     } else {
                //                         const auth = {
                //                             signature: signature,
                //                             address: address.toLowerCase(),
                //                         };
                //                         this.$store.state.account.signedIn = res.data.success;
                //                         this.$store.state.account.auth = auth; // mutating to store for client rendering
                //                         Cookie.set('auth', auth); // saving token in cookie for server rendering
                //                         this.$router.push('/');
                //                     }
                //                 });
                //             });
                //         }
                //     });
                // });
            },
        }
    }
</script>

<style lang="scss">
    .login-buttons {

        .btn-metamask {
            color: white;
            background-color: #F6851B;
            padding: 8px 20px;
            border-radius: 0;
            border: 2px solid darken(#F6851B, 5%);

            &:hover {
                background-color: darken(#F6851B, 5%);
            }
        }

        .btn-facebook {
            color: white;
            background-color: #3B5998;
            padding: 8px 20px;
            border-radius: 0;
            border: 2px solid darken(#3B5998, 5%);

            &:hover {
                background-color: darken(#3B5998, 5%);
            }
        }

        .btn-github {
            color: white;
            background-color: #323131;
            padding: 8px 20px;
            border-radius: 0;
            border: 2px solid darken(#323131, 5%);

            &:hover {
                background-color: darken(#323131, 5%);
            }
        }
    }
</style>