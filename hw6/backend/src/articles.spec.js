/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {
	var num = 0;
	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).length>=3).to.be.true
			num = JSON.parse(body).length
		})
		.then(done)
		.catch(done)
 	
 	}, 200)

	it('should adding an article successfully', (done) => {
	
		let article1 = {text: 'article1 text', author:'article1 author'}

        fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(article1)
        })
        .then((res)=>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then((body)=>{
            expect(body.text).to.eql(article1.text)
            expect(body.author).to.eql(article1.author)
        })

        fetch(url("/articles"))
        .then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).length).to.eql(num + 1)
		})
        .then(done)
        .catch(done)
 	}, 200)



});