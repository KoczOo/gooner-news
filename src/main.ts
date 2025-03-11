import './assets/main.css';

import {createApp, type App} from 'vue';
import {createPinia} from 'pinia';

import ApComponent from '@/App.vue';
import router from './router';

/// TOASTS
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

/// VUETIFY
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

/// FIREBASE
import {AUTH} from '@/utils/firebase';
import {onAuthStateChanged} from 'firebase/auth';

const vuetify = createVuetify({
    components,
    directives,
});

let app: App<Element> | undefined;

onAuthStateChanged(AUTH, () => {
    if (!app) {
        app = createApp(ApComponent);
        app.use(createPinia());
        app.use(router);
        app.use(vuetify);
        app.use(ToastPlugin);

        app.mount('#app');
    }
});
