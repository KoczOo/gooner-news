import {userUserStore} from "@/stores/user";
import {ref} from "vue";
import {onAuthStateChanged} from "firebase/auth";
import {AUTH} from "@/utils/firebase.ts";

export const firstLoad = () => {
    const userStore = userUserStore();
    const loading = ref(true);

    onAuthStateChanged(AUTH, async (user) => {
        if (user) {
            await userStore.autoSignIn(user.uid)
        }
        loading.value = false;
    })
    return {loading};
}
