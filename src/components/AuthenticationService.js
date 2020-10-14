

class AuthenticationService {
    registerSuccessfullLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLogged(){
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null){
            return false
        }
        return true
    }


}

export default new AuthenticationService()