import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import { userUserStore } from '@/stores/user.ts'

//  TOASTS
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//  FIREBASE
import {AUTH} from "@/utils/firebase.ts";
import {onAuthStateChanged} from 'firebase/auth'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(ToastPlugin);


const userStore = userUserStore();
onAuthStateChanged(AUTH, (user) => {
    if (user) {
        userStore.setUser({
            uid: user.uid,
            email: user.email ?? undefined,
            isAdmin: false,
        });
    } else {
        userStore.setUser(null);
    }
});

app.mount('#app');



