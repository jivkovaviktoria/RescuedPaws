export const ApiEndpoints = {
    'base': 'https://localhost:7138',
    'auth': {
        'login': '/authentication/login?useCookies=false&useSessionCookies=false',
        'register': '/authentication/register'
    },
    'administration': {
        'usersCount': '/Administration/UsersCount',
        'postsCount': '/Administration/PostsCount',
        'eventsCount': '/Administration/EventsCount',
    }
}