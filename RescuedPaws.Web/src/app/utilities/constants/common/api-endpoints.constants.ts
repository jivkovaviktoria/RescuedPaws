export const ApiEndpoints = {
    'base': 'https://localhost:7138',
    'auth': {
        'login': '/authentication/login?useCookies=false&useSessionCookies=false',
        'register': '/authentication/register',
        'getUserRoutePermissions': '/Common/UserPermissions',
        'getUserData': '/Common/UserData',
    },
    'administration': {
        'usersCount': '/Administration/UsersCount',
        'postsCount': '/Administration/PostsCount',
        'eventsCount': '/Administration/EventsCount',
        'getUsers': '/Administration/Users',
        'getRoles': '/Administration/Roles',
        'getRole': '/Administration/Role',
        'addOrUpdateRole': '/Administration/Role',
        'deleteRole': '/Administration/Role',
        'assignToUser': '/Administration/AssignToUser',
        'unassignToUser': '/Administration/UnassignFromUser',
        'getAnimalTypes': '/Administration/AnimalTypes',
        'getAnimalType': '/Administration/AnimalType',
        'deleteAnimalType': '/Administration/AnimalType',
        'addOrUpdateAnimalType': '/Administration/AnimalType',
        'getAnimalSizes': '/Administration/AnimalSizes',
        'getAnimalSize': '/Administration/AnimalSize',
        'addOrUpdateAnimalSize': '/Administration/AnimalSize',
        'deleteAnimalSize': '/Administration/AnimalSize',
    },
    'nomenclatures': {
        'users': '/Nomenclatures/Users'
    }
}