import * as yup from "yup";

import {userUserStore} from "@/stores/user.ts";
import {ref} from "vue";

export const updateProfile = () => {
    const userStore = userUserStore();
    const firstName = ref(userStore.user.firstName);
    const lastName = ref(userStore.user.lastName);

    const loading = ref(false);
    const formSchema = yup.object({
        firstName: yup.string()
            .required('Imię jest wymagane')
            .max(100, 'Imię może zawierać maksymalnie 100 znaków'),
        lastName: yup.string()
            .required('Nazwisko jest wymagane')
            .max(100, 'Nazwisko jest wymagane'),
    })

    function onSubmit(value: any, {resetForm}: { resetForm: () => void }) {
        console.log(value)
    }

    return {loading, formSchema, onSubmit, firstName, lastName};
}
