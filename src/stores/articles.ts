import {defineStore} from "pinia";
import router from '@/router';
import {userUserStore} from '@/stores/user';

/// FIREBASE
import {DB} from '@/utils/firebase';
import {collection, doc, serverTimestamp, setDoc} from 'firebase/firestore';


let articleCollection = collection(DB, "articles");

export const useArticleStore = defineStore('article', {
    state: () => ({
        homeArticles: '',
        adminArticles: '',
        adminLastVisible: ''
    }),
    getters: {},
    actions: {
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
                await router.push({ name: 'admin_articles' });
                return true;

            } catch (error) {
                console.log(error);
            }
        }
    }
})
