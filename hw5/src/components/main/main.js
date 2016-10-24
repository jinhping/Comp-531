import React from 'react'

import Headline from './headline'
import Following from './following'
import ArticlesView from '../article/articlesView'

import Nav from './nav'

const Main = () => (
	/*
		Main page gonna show headlines, artciles and followers of the username
	*/
    <div>
    	<br/><br/><br/>
    	<Nav />
        <Headline/>
        <ArticlesView/>
        <Following/>

    </div>
)

export default Main

