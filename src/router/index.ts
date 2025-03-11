import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import SignIn from "@/components/user/signin.vue";
import Dashboard from "@/components/user/dashboard/index.vue"
import DashboardMain from "@/components/user/dashboard/main.vue"
import UserProfile from "@/components/user/dashboard/pages/user_profile.vue";
import AdminArticles from "@/components/user/dashboard/admin/articles.vue";
import AddArticle from "@/components/user/dashboard/admin/add.vue";
import EditArticle from "@/components/user/dashboard/admin/edit.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn
        },
        {
            path: '/user/dashboard', name: 'dashboard', component: Dashboard, children: [
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
                    path: 'articles/add/:id', component: EditArticle, 'name': 'admin_edit_article',
                }
            ]
        }
    ],
})

export default router
