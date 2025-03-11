const errorCoders = (code: string) => {
    let msg = 'Przepraszamy... Wystąpił nieoczekiwany błąd, spróbuj ponownie później...';

    switch (code) {
        case 'Firebase: Error (auth/invalid-credential).':
            msg = 'Niepoprawne dane logowania'
            return msg;
        case 'Firebase: Error (auth/email-already-in-use).':
            msg = 'Konto już istnieje na podany email'
            return msg;
        case 'Firebase: Error (auth/wrong-password).':
            msg = 'Niepopranwe hasło'
            return msg;
        default:
            return msg;

    }
}

export default errorCoders;
