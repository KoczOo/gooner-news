import {createRouter, createWebHistory} from 'vue-router'
import {isAuth, isLoggedIn} from '@/composables/auth.ts'
import Home from "@/components/home/index.vue";
import SignIn from "@/components/user/signin.vue";
import Dashboard from "@/components/user/dashboard/index.vue"
import DashboardMain from "@/components/user/dashboard/main.vue"
import UserProfile from "@/components/user/dashboard/pages/user_profile.vue";
import AdminArticles from "@/components/user/dashboard/admin/articles.vue";
import AddArticle from "@/components/user/dashboard/admin/add.vue";
import EditArticle from "@/components/user/dashboard/admin/edit.vue";
import NotFound from "@/components/404.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn,
            beforeEnter: isLoggedIn
        },
        {
            path: '/user/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: isAuth, children: [
                {
                    path: '', component: DashboardMain, 'name': 'dashboard_main',
                },
                {
                    path: 'profile', component: UserProfile, 'name': 'user_profile',
                },
                {
                    path: 'articles', component: AdminArticles, 'name': 'admin_articles',
                },
                {
                    path: 'articles/add', component: AddArticle, 'name': 'admin_add_article',
                },
                {
                    path: 'articles/edit/:id', component: EditArticle, 'name': 'admin_edit_article',
                }
            ]
        },
        {
            path: '/:notFound(.*)*', name: '404', component: NotFound
        }
    ],
})

export default router
