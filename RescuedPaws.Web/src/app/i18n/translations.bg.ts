export const translations: Translation = {
    'authentication': {
        'bg': {
            'sign-up': {
                'display-name': 'Регистрация',
                'create-account': 'Създай профил',
                'username': 'Потребителско име',
                'password': 'Парола',
                'confirm-password': 'Потвърди паролата',
                'email': 'Имейл',
                'agree-with': 'Регистрирайки се, вие се съгласявате с',
                'terms-of-use': 'Общите условия',
                'privacy-policy': 'Политиката за поверителност',
                'and': 'и',
                'already-user': 'Имате създаден профил?',
                'no-account': 'Нямате създаден профил?',
                'sign-up': 'Регистрация',
                'sign-in': 'Вход',
            },
            'validation': {
                'required-username': 'Моля въведете потребителско име',
                'required-email': 'Моля въведете имейл',
                'required-password': 'Моля въведете парола',
                'required-confirm-password': 'Моля потвърдете паролата',
                'password-missmatch': 'Паролите не съвпадат'
            }
        },
        'en': {
            'sign-up': {
                'display-name': 'Sign Up',
                'create-account': 'Create Account',
                'username': 'Username',
                'password': 'Password',
                'confirm-password': 'Confirm Password',
                'email': 'Email',
                'agree-with': 'By signing up, you agree to the',
                'terms-of-use': 'Terms of Service',
                'privacy-policy': 'Privacy policy',
                'and': 'and',
                'already-user': 'Already have an account?',
                'no-account': 'You don\'t have an account?',
                'sign-up': 'Sign Up',
                'sign-in': 'Sign In'
            },
            'validation': {
                'required-username': 'Username is required',
                'required-email': 'Email is required',
                'required-password': 'Password is required',
                'required-confirm-password': 'Confirm password is required',
                'password-missmatch': 'Passwords do not match'
            }
        }
    },
    'navigation': {
        'bg': {
            'links': {
                'home': 'Начало',
                'adopt': 'Осинови ме',
                'about-us': 'За нас',
                'sign-up': ' Регистрация'
            }
        },
        'en': {
            'links': {
                'home': 'Home',
                'adopt': 'Adopt Me',
                'about-us': 'About Us',
                'sign-up': 'Sign Up'
            }
        }
    },
    'home': {
        'bg': {
            'main-page': {
                'main-text-first': 'ЖИВОТНИТЕ ИМАТ НУЖДА',
                'main-text-second': 'ОТ ТВОЯТА ПОМОЩ',
                'adopt-now': 'ОСИНОВИ СЕГА',
                'secondary-text': 'Заедно можем да направим промяна!',
                'learn-more': 'Научете повече за осиновяването на животно',
                'learn-more-text': 'Обмисляте ли да осиновите животно? Не пропускайте да разгледате нашите съвети как се случва осиновяването и да научите подробности за отглеждането. Може също да разгледате истински истории за животни, намерили своите постоянни домове.'
            }
        },
        'en': {
            'main-page': {
                'main-text-first': 'ANIMALS NEED',
                'main-text-second': 'YOUR HELP',
                'adopt-now': 'ADOPT NOW',  
                'secondary-text': 'Together we can make a difference!',
                'learn-more': 'Learn More About Adopting a Pet',
                'learn-more-text': 'Are you considering adopting a dog? Be sure to check out our tips on how to adopt a dog and also learn about fostering. And you’ll enjoy our real-life stories about rescue dogs finding their forever homes.'
            }
        }
    }
}

interface Translation {
    [module: string]: {
        [lang: string]: {
            [key: string]: string | { [subKey: string]: string }
        }
    }
}