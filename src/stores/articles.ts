import {defineStore} from "pinia";
import router from '@/router';
import {userUserStore} from '@/stores/user';

/// FIREBASE
import {DB} from '@/utils/firebase';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    startAfter,
    updateDoc
} from 'firebase/firestore';
import {useToast} from "vue-toast-notification";
import type Article from "@/dto/model/Article.ts";

const $toast = useToast();


let articleCollection = collection(DB, "articles");

export const useArticleStore = defineStore('article', {
    state: () => ({
        homeArticles: [] as Article[],
        adminArticles: [] as Article[],
        adminLastVisible: null as any
    }),
    getters: {
        getFeaturesSlides(state) {
            return state.homeArticles.slice(0, 2);
        }
    },
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
        },
        async getAdminArticles(docLimit: number) {
            try {
                const q = query(articleCollection, orderBy('timestamp', 'desc'), limit(docLimit));
                const querySnapshot = await getDocs(q);

                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

                this.adminArticles = querySnapshot.docs.map(doc => {
                    const articleData = doc.data();
                    return {
                        id: doc.id,
                        ...articleData
                    } as Article;
                });
                this.adminLastVisible = lastVisible;


            } catch (error) {
                $toast.success((error as Error).message)
            }
        },
        async getAdminMoreArticles(docLimit: number) {
            try {
                if (this.adminLastVisible) {
                    let currentArticles = this.adminArticles;

                    const q = query(
                        articleCollection,
                        orderBy('timestamp', 'desc'),
                        startAfter(this.adminLastVisible),
                        limit(docLimit)
                    );

                    const querySnapshot = await getDocs(q);
                    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    const newArticles = this.adminArticles = querySnapshot.docs.map(doc => {
                        const articleData = doc.data();
                        return {
                            id: doc.id,
                            ...articleData
                        } as Article;
                    });

                    this.adminArticles = [
                        ...currentArticles,
                        ...newArticles
                    ]
                    this.adminLastVisible = lastVisible;

                }
            } catch (error) {
                $toast.success((error as Error).message)
            }
        },
        async removeAdminArticle(id: string) {
            try {
                await deleteDoc(doc(DB, "articles", id));
                this.adminArticles = this.adminArticles.filter(article => article.id !== id);
                $toast.success('Usunięto artykuł')

            } catch (error) {
                $toast.error((error as Error).message)
            }
        },
        async getArticles(docLimit: number) {
            try{
                const q = query(articleCollection, orderBy('timestamp','desc'),limit(docLimit))
                const querySnapshot = await getDocs(q);
                this.homeArticles = (this.adminArticles = querySnapshot.docs.map(doc => {
                    const articleData = doc.data();
                    return {
                        id: doc.id,
                        ...articleData
                    } as Article;
                }));
            } catch(error){
                $toast.success((error as Error).message)
            }
        }
    }
})
