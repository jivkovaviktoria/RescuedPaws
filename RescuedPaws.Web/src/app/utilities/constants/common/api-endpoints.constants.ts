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
        'getUsers': '/Administration/Users',
        'getRoles': '/Administration/Roles',
        'getRole': '/Administration/Role',
        'assignToUser': '/Administration/AssignToUser',
        'getAnimalTypes': '/Administration/AnimalTypes',
        'getAnimalType': '/Administration/AnimalType',
        'getAnimalSizes': '/Administration/AnimalSizes',
        'getAnimalSize': '/Administration/AnimalSize',
    },
    'nomenclatures': {
        'users': '/Nomenclatures/Users'
    }
}