import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export function createStore(){
    return new Vuex.Store({
        state:{
            count:10,
            time:0
        },
        mutations:{
            setCount(state){
                state.count ++
    },
            setTime(state){
                state.time ++
            }
        },
        actions:{
          delayAdd({commit}){
             return new Promise((resolve)=>{
                  setTimeout(()=>{
                      commit('setCount')
                      resolve()},2000)
              })

          },
            addTime({commit}){
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        commit('setTime')
                        resolve()},2000)
                })
            }
        }
    })
}

