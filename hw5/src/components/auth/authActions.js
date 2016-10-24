import Action, { resource, updateError, updateSuccess, navToMain, navToOut, apiUrl } from '../../actions'

import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile, validateProfile } from '../profile/profileActions'

export function initialVisit() {
    return (dispatch) => {
        
        let tmp1 = dispatch(fetchProfile())
        let tmp3 = dispatch(fetchFollowers())
        let tmp4 = dispatch(fetchArticles())
        let tmp2;

        resource('GET', 'headlines').then((response) => {

             tmp2 = dispatch({type: Action.UPDATE_HEADLINE,
                 username: response.headlines[0].username,
                 headline: response.headlines[0].headline
             })
        })
        Promise.all([tmp1,tmp2,tmp3,tmp4]).then(()=>{
            dispatch(navToMain())
        })
    }



}

export function localLogin(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
        .then((response) => {
            dispatch({type: Action.LOGIN_LOCAL, username: response.username})
            dispatch(initialVisit())
        }).catch((err) => {
            dispatch(updateError(`Error appears when logging in as ${username}`))
        })
    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
        .catch((err) => {
            dispatch({type: Action.LOGIN_LOCAL, username: undefined})
            dispatch(navToOut())
        })
    }
}

export function register({username, email, phone, birth, zipcode, password, pwconf}) {
    return (dispatch) => {
        if (!username || !email || !phone || !birth || !zipcode || !password || !pwconf) {
            return dispatch(updateError('All fields must be supplied'))
        }

        const err = validateProfile({username, email, phone, birth, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }

        resource('POST', 'register', {username, email, phone, birth, zipcode, password})
        .then((response) => {
            return dispatch(updateSuccess(`Success!  You can now log in as "${response.username}".`))
        }).catch((err) => {
            return dispatch(updateError("There was an error registering, perhaps your username is already taken?"))
        })
    }
}

