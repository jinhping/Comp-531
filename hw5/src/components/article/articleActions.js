import Action, { resource } from '../../actions'

export function fetchArticles() {
    return (dispatch, getState) => {
        resource('GET', 'articles')
        .then((response) => {
            const articles = response.articles.reduce((o,v) => {
                o[v._id] = v
                return o
            }, {})
            dispatch({ type: Action.UPDATE_ARTICLES, articles})

            const avatars = getState().articles.avatars
            const authors = new Set(response.articles.reduce((o, article) => {
                article.comments.map((c) => c.author).forEach((author) => o.push(author))
                return o
            }, []).filter((author) => !avatars[author]))
            if (authors.size > 0) {
                resource('GET', `avatars/${[...authors].join(',')}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        avatars[s.username] = s.avatar
                    })
                    dispatch({ type: Action.UPDATE_AVATARS, avatars })
                })
            }
        })
    }
}


export function searchKeyword(keyword) {
    return { type: Action.SEARCH_KEYWORD, keyword }
}

