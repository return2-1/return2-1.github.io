<template>
    <div>
        <div>home page2</div>
        <div @click="delayA">{{$store.state.count}}</div>
        <h1>{{$store.state.time}}</h1>
        <div @click="add">+</div>

    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {}

        },
        asyncData({store}){
            return Promise.all([store.dispatch('delayAdd'),store.dispatch('addTime')])
        },
        methods:{
            add(){
                this.$store.commit('setCount')
            },
            delayA(){
                this.$store.dispatch('delayAdd')
            }
        }
    }
</script>

<style scoped>

</style>
