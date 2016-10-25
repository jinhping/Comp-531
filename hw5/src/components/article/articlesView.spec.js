// import React from 'react'
// import TestUtils from 'react-addons-test-utils'
// import {findDOMNode} from 'react-dom'
// import {shallow} from 'enzyme'
// import {expect} from 'chai'


// import Action from '../../actions'
// import {ArticlesView} from './articlesView'
// import {NewArticle} from './newArticle' 


// describe('ArticlesView Test ', ()=>{

//     it('should render articles', ()=>{
//     	const articles = [{_id:1, text:'hello test1', author:'jp64', date:'09-03-2015',comments:[],img:''},
// 						  {_id:2, text:'hello test2', author:'jp64', date:'09-03-2015',comments:[],img:''}]
// 		const node = shallow(<ArticlesView articles = {articles} dispatch={_ => _}/>)
// 		expect(node.children().length).to.eql(5);
// 		expect(node.children().nodes[3].key).to.eql('1');
// 		expect(node.children().nodes[4].key).to.eql('2');
//     })



// })