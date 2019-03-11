<template>
    <div id="body">
        <div class="jumbotron">
            <div class="container text-center">
                <div class="logos">
                    <img class="nuxt" src="../assets/nuxt.svg" alt="">
                    <div class="plus">
                        +
                    </div>
                    <img class="metamask" src="../assets/metamask-fox.svg" alt="">
                </div>
                <h1>Welcome to Login with MetaMask Demo using Nuxt</h1>
            </div>
        </div>
        <main role="main">

            <div class="container">
                <nuxt/>
            </div>

        </main>
    </div>
</template>

<style lang="scss">
    .jumbotron {
        background-color: #222222;
        color: #f0f0f0;
        border-radius: 0;

        .logos {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                height: 100px;

                &.metamask {
                    height: 150px;
                }
            }
        }

        .plus {
            font-size: 64px;
            margin: 0 25px;
        }
    }
</style>