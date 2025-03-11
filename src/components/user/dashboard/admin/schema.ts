import * as yup from 'yup'


const ArticleSchema = yup.object().shape({
        postTitle: yup.string()
            .required('Tytuł jest wymagany'),
        postSubTitle: yup.string()
            .required('Podytuł jest wymagany')
            .min(20, 'Minimum 20 znaków')
            .max(70, 'Maksymalnie 70 znaków'),
        postText: yup.string()
            .required('Tekst jest wymagany')
            .min(20, 'Minimum 100 znaków'),
        /*editor: yup.string()
            .required('Tekst jest wymagany')
            .min(50, 'Minimum 50 znaków')*/
        postRating: yup.string()
            .required('Ocena jest wymagana')
            .notOneOf(['Wybierz ocenę'], 'Musisz wybrać ocenę'),
        postImg: yup.string()
            .required('Źródło do zdjęcia jest wymagane')

    }
)

export default ArticleSchema
