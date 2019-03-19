import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Result from '@/components/Result';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';

Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'*',
            redirect:'/login',
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/',
            redirect:'/login',
        },
        {
            path:'/SignUp',
            name:'SignUp',
            component:SignUp
        },
        {
            path:'/Result',
            name:'Result',
            component: Result,
            meta:{
                requiresAuth: true
            }
        },
       
    ]
});
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requiresAuth && !currentUser) next('login');
    else if(!requiresAuth && currentUser) next ('Result');
    else next();
});
export default router;