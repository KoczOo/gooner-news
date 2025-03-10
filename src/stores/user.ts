import {defineStore} from "pinia";
import type User from "@/dto/model/User";
//// FIREBASE
import {AUTH, DB, doc} from "@/utils/firebase.ts";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc} from 'firebase/firestore';
import router from "@/router";


export const userUserStore = defineStore('user', {
    state: () => ({
        loading: false,
        user: null as User | null,
        auth: false,
        error: null as string | null
    }),
    actions: {
        setUser(user: User) {
            this.user = {...this.user, ...user};
            this.auth = true;
        },
        async registerUser(formData: any) {
            try {
                this.loading = true;
                this.error = null;

                /// REGISTER USER
                const response = await createUserWithEmailAndPassword(
                    AUTH,
                    formData.email,
                    formData.password
                );

                //  REDIRECT USER
                await router.push({name: 'dashboard'})

                //  ADD USER TO DB
                const newUser: User = {
                    uid: response.user.uid,
                    email: response.user.email ?? undefined,
                    isAdmin: false,
                };
                await setDoc(doc(DB, 'users', response.user.uid), newUser);

                //  UPDATE LOCAL STATE
                this.setUser(newUser);

            } catch (error) {
                this.error = (error as Error).message || "An unknown error occurred";
                return false;

            } finally {
                this.loading = false;
            }
        }
    },
    getters: {}
})
