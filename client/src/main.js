
import Vue from 'vue'
import 'jquery'
import 'materialize-css'
import App from './App'
import router from './router'
import store from './store';
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    beforeCreate:function(){
    
    },
})
