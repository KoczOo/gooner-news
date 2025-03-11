import {defineStore} from "pinia";
import router from '@/router';
import {userUserStore} from '@/stores/user';

/// FIREBASE
import {DB} from '@/utils/firebase';
import {collection, doc, getDoc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {useToast} from "vue-toast-notification";
import type Article from "@/dto/model/Article.ts";

const $toast = useToast();


let articleCollection = collection(DB, "articles");

export const useArticleStore = defineStore('article', {
    state: () => ({
        homeArticles: '',
        adminArticles: '',
        adminLastVisible: ''
    }),
    getters: {},
    actions: {
        async getArticleById(id: string) {
            try {
                const docRef = await getDoc(doc(DB, "articles", id));
                if (!docRef.exists()) {
                    throw new Error('NIe znaleziono artykułu');
                }
                return docRef.data();
            } catch (error) {
                await router.push({name: '404'});
            }
        },
        async updateArticleById(id: string, formData: Article) {
            try {
                const docRef = doc(DB, "articles", id);
                await updateDoc(docRef, {
                    ...formData
                });
                $toast.success('Artykuł zaktualizowany!')
            } catch (error) {
                $toast.success((error as Error).message);
            }
        },
        async addArticle(formData: any) {
            try {
                //  GET USER PROFILE
                const userStore = userUserStore();
                const user = userStore.getUserData;

                //  POST DOC IN DB
                const newArticle = doc(articleCollection);
                await setDoc(newArticle, {
                    timestamp: serverTimestamp(),
                    owner: {
                        uuid: user.uid,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    ...formData,
                });
                //  REDIRECT USER
                await router.push({name: 'admin_articles'});
                return true;

            } catch (error) {
                console.log(error);
            }
        }
    }
})
