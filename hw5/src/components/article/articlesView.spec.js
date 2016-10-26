import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {shallow} from 'enzyme'
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import Action from '../../actions'
import {ArticlesView} from './articlesView'
import {NewArticle} from './newArticle' 

import Reducer from '../../reducers'
import {articles} from '../../reducers'

let initialState = {
    common:{error:'', success: '',location: ''},
    articles:{articles:{},searchKeyword:'', avatars: {} },
    profile: { username: '',headline: '',avatar: '',email: '',zipcode: '',dob: ''},
    followers:{ followers: {}}
}


describe('ArticlesView Test ', ()=>{



    it('should render articles', ()=>{
    	const articles = [
						  {_id:1,  author:'jp64', date:'09-03-2015',comments:[]}
						  ]
		const node = shallow(
			<div>
			<ArticlesView articles = {articles} dispatch={_ => _}/>
			</div>
			)

		expect(node.children().length).to.eql(1);
	
    })

    let articles = {1:{id:1,author:'jp64', text:'hello1'}, 2:{id:2,author:'Scott', text:'hello2'}}  
    let new_article = {id:3,author:'jp64', text:'hello3'}
    let new_articles = {...articles, 3: new_article}

    it('should dispatch actions to create a new article',()=> {
        expect(Reducer(Reducer(undefined, {type:'UPDATE_ARTICLES', articles}), {type:'ADD_ARTICLE',article: new_article }))
       .to.eql({...initialState, articles: {...initialState.articles, articles:new_articles }})
    })
})



   