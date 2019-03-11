import Web3 from 'web3';

export default async ({app, store, $axios}) => {
    // let instance = new Web3();
    // const instanceWS = new Web3.providers.WebsocketProvider('ws://10.13.37.11:13378');
    // instance.setProvider(instanceWS);

    if (process.client) {
        // const instance = new Web3(Web3.givenProvider || window.web3.currentProvider || new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${Config.INFURA_API_KEY}`));
        let instance;
        try {
            instance = new Web3(window.web3.currentProvider);
        } catch (e) {
            try {
                instance = new Web3(Web3.givenProvider);
            } catch (e) {
                try {
                    new Web3.providers.HttpProvider(`https://mainnet.infura.io/`)
                } catch (e) {
                    console.log("No Metamask detected!");
                }
            }
        }

        window.$web3 = instance;
        store.state.web3 = instance;

        window.$web3.eth.getAccounts().then(accounts => {
            if (accounts.length && accounts[0]) {
                // just get the account address and balance
                window.$web3.eth.getBalance(accounts[0]).then(balance => {
                    const data = {
                        account: accounts[0],
                        balance: Number(window.$web3.eth.utils.fromWei(balance)).toFixed(3).toLocaleString(),
                    };

                    console.log(data);

                    store.state.account.address = data.account;
                });
            } else if (window.ethereum) {
                // privacy mode on
                window.ethereum.enable().then(accounts => {
                    window.$web3.eth.getBalance(accounts[0]).then(balance => {
                        const data = {
                            account: accounts[0],
                            balance: Number(window.$web3.eth.utils.fromWei(balance)).toFixed(3).toLocaleString(),
                        };

                        console.log(data);

                        store.state.account.address = data.account;
                    });
                });
            }
        });

        // Login.getAccount().then(ret => {
        //     store.state.account.address = ret.account;
        //     store.state.account.balance = ret.balance;
        //     $axios.$post(`/user/${ret.account}`).then(async ret =>  {
        //         console.log("[API]", ret);
        //         store.state.account.nonce = ret.result.nonce;
        //         let signature = app.$cookies.get('signature');
        //         if (!signature) {
        //             signature = await createSignature(store.state.account.address, store.state.account.nonce);
        //         }
        //         store.state.account.signature = signature;
        //         app.$cookies.set('wallet_address', store.state.account.address, {
        //             path: '/',
        //             maxAge: 60 * 60 * 24
        //         });
        //         app.$cookies.set('signature', signature, {
        //             path: '/',
        //             maxAge: 60 * 60 * 24
        //         });
        //         store.state.Loaders.elements.account = true;
        //     });
        // }).catch((e) => {
        //     console.log("[USER] Can not get MetaMask Wallet");
        //     console.log("[USER] Try to sign in (/sign-in)");
        //     store.state.Loaders.elements.account = true;
        // });

        return instance;
    }
}