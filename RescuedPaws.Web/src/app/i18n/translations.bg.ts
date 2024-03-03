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
                'sign-in': 'Вход'
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
            }
        }
    },
    'navigation': {
        'bg': {
            'links': {
                'home': 'Начало',
                'adopt': 'Осинови ме',
                'about-us': 'За нас'
            }
        },
        'en': {
            'links': {
                'home': 'Home',
                'adopt': 'Adopt Me',
                'about-us': 'About Us'
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