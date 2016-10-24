import Promise from 'bluebird'
import Action, { resource, updateError } from '../../actions'


export function fetchFollowers(method, name) {
    return (dispatch, getState) => {
        if (method == 'PUT' && getState().followers.followers[name]) {
            return dispatch(updateError(`You are already following ${name}`))
        }

        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        

        .then((response) => {

            if (method == 'PUT' && response.following.indexOf(name) < 0) {
                return dispatch(updateError(`${name} is not a real user`))
            }

            const followers = response.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
            const followerList = response.following.join(',')

            const headlinePromise = resource('GET', `headlines/${followerList}`)
                .then((response) => {
                    response.headlines.forEach((u) => {
                        const user = followers[u.username]
                        if (user) {
                            user.headline = u.headline
                        }
                    })
                })

            const avatarPromise = resource('GET', `avatars/${followerList}`)
                .then((response) => {
                    response.avatars.forEach((u) => {
                        const user = followers[u.username]
                        if (user) {
                            user.avatar = u.avatar
                        }
                    })
                })

            Promise.all([headlinePromise, avatarPromise]).then(() => {
                dispatch({type: Action.FOLLOWER_UPDATE, followers})
            })
        }).catch((err) => {
            dispatch(updateError(`Error appears while getting your list of followed users ${err}`))
        })
    }
}



export function delFollower(name) { 
    return fetchFollowers('DELETE', name) 
}

export function addFollower(name) { 
    return fetchFollowers('PUT', name) 
}