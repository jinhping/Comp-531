
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action, {apiUrl, updateError, updateSuccess, navToProfile, navToMain, navToOut, resource} from './actions'


describe('Validate actions (these are functions that dispatch actions)', () => {

	let Action, actions
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		Action = require('./actions').default
  		actions = require('./actions') 
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${apiUrl}/sample`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		})

		resource('GET', 'sample').then((response) => {
			expect(response.articles).to.exist;
		})
		.then(done)
		.catch(done)
		// let headlines = [{username:'jp64', headline:'test'}]

		// mock(`${apiUrl}/headlines`, {
		// 	method: 'GET',
		// 	headers: {'Content-Type':'application/json'},
  //           json: {headline: "test"}
		// })

		// resource('GET', 'headlines').then((response) => {
			

 	// 	   expect(response).to.eql({headline: "test"})
  //          //expect(response.headline).to.eql(headlines.headline) 		
  //      })
		// .then(done)
		// .catch(done)

	})


	it('- resource should give me the http error', (done)=> {
		const username = 'jp64'
		const password = 'wrong password'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).catch((err) => {
			expect(err.toString()).to.eql('Error: Unauthorized')
		})
		.then(done)
		.catch(done)
	})


	it('- resource should be POSTable', (done)=> {
		const username = 'jp64'
		const password = 'calm-engine-cage'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})

		resource('POST', 'login', {username, password }).then((response) => {
			expect(response).to.eql({username: "jp64", result: "success"})
		})
		.then(done)
		.catch(done)
	})


	it('- should update error message (for displaying error mesage to user)', ()=>{
		const msg = 'test error message';
		const expectAction = {
			type: Action.ERROR,
			error: msg
		}
		expect(updateError(msg)).to.eql(expectAction);
	})


	it('- should update success message (for displaying success message to user)', ()=>{
		const msg = 'test success message';
		const expectAction = {
			type: Action.SUCCESS,
			success: msg
		}
		expect(updateSuccess(msg)).to.eql(expectAction);
	})


	it('- should navigate (to profile, main, or landing)', ()=>{
		expect(navToOut()).to.eql({type: Action.NAV_OUT});
		expect(navToMain()).to.eql({type: Action.NAV_MAIN});
		expect(navToProfile()).to.eql({type: Action.NAV_PROFILE});
	})
})