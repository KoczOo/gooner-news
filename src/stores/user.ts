import {defineStore} from "pinia";
import type User from "@/dto/model/User";
//// FIREBASE
import {AUTH, DB, doc} from "@/utils/firebase.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getDoc, setDoc} from 'firebase/firestore';
import router from "@/router";


const DEFAULT_USER: User = {
    uid: null,
    email: null,
    firstName: null,
    lastName: null,
    isAdmin: null
}

export const userUserStore = defineStore('user', {
    state: () => ({
        loading: false,
        user: DEFAULT_USER,
        auth: false,
        error: null as string | null
    }),
    actions: {
        setUser(user: User) {
            this.user = {...this.user, ...user};
            this.auth = true;
        },

        async getUserProfile(uuid: string) {
            try {
                this.loading = true;
                const useRef = await getDoc(doc(DB, 'users', uuid));
                if (!useRef.exists()) {
                    throw new Error('Nie znaleziono użtykownika!')
                }
                return useRef.data();
            } catch (error) {
                this.error = (error as Error).message;
                return false;
            } finally {
                this.loading = false;
            }
        },

        async signIn(formData: any) {
            try {
                this.loading = true;
                //  SIGN IN USER
                const response = await signInWithEmailAndPassword(AUTH, formData.email, formData.password);

                //  GET USER DATA
                const userData = await this.getUserProfile(response.user.uid);

                //  UPDATE LOCAL STATE
                console.log(userData as User);
                this.setUser(userData as User);

                //  REDIRECT USER
                await router.push({name: 'dashboard'})

            } catch (error) {
                throw new Error((error as Error).message);
            } finally {
                this.loading = false;
            }
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
                const newUser = {
                    uid: response.user.uid,
                    email: response.user.email,
                    isAdmin: false
                }
                await setDoc(doc(DB, 'users', response.user.uid), newUser);

                //  UPDATE LOCAL STATE
                this.setUser(newUser as User);

            } catch (error) {
                throw new Error((error as Error).message);
            } finally {
                this.loading = false;
            }
        },

        async autoSignIn(uuid: string) {
            try {
                const userData = await this.getUserProfile(uuid);
                /// UPDATE LOCAL STATE
                this.setUser(userData as User);
                return true;
            } catch (error) {
                console.error(error);
            }
        },

        async signOut() {
            await signOut(AUTH);
            this.user = DEFAULT_USER;
            this.auth = false;
            await router.push({name: 'home'});
        }
    },
    getters: {}
})
