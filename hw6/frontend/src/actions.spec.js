
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

import Action, {apiUrl, updateError, updateSuccess, navToProfile, navToMain, navToOut, resource} from './actions'


describe('Validate actions (these are functions that dispatch actions)', () => {

	let Action, actions,url,resource
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			resource = require('./actions').resource
  			url = require('./actions').url
		
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
			json: {sample:'test'}

		})

		resource('GET', 'sample').then((response) => {
			expect(response.sample).to.exist;
			done()
		})

		.catch((err)=>{console.log(err);done()})

	})


	it('resource should give me the http error', (done)=> {
		resource('GET', 'wrong_http').catch((error) => {
			expect(error).to.exist
		})
		.then(done)
		.catch(done)
	})


	it('resource should be POSTable', (done)=> {
		let username = 'jp'
		let password = 'calm-engine-cage'
		
		mock(`${apiUrl}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, result:'success'}
		})

		resource('POST', 'login', {username, password }).then((response) => {
			expect(response.username).to.eql(username)
            expect(response.result).to.eql('success')
		})
		.then(done)
		.catch(done)
	})


	it('should update error message (for displaying error mesage to user)', ()=>{
		const text = 'error message';
		const expectAction = {
			type: Action.ERROR,
			error: text
		}
		expect(updateError(text)).to.eql(expectAction);
	})


	it('should update success message (for displaying success message to user)', ()=>{
		const text = 'success message';
		const expectAction = {
			type: Action.SUCCESS,
			success: text
		}
		expect(updateSuccess(text)).to.eql(expectAction);
	})


	it('should navigate (to profile, main, or landing)', ()=>{
		expect(navToOut()).to.eql({type: Action.NAV_OUT});
		expect(navToMain()).to.eql({type: Action.NAV_MAIN});
		expect(navToProfile()).to.eql({type: Action.NAV_PROFILE});
	})
})