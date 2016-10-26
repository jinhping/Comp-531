import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'



let resource, url, profileActions

describe('ProfileActions Test: ', () => {


	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			url = require('../../actions').apiUrl
            resource = require('../../actions').resource
            profileActions = require('./profileActions')
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
	  	}
	})

	it('should update the status message', (done) => {
  
  		// the result from the mocked AJAX call
  		const username = 'sep1test'
  		const headline = 'A new headline!'

  		mock(`${url}/headline`, {
  			method: 'PUT',
  			headers: {'Content-Type':'application/json'},
  			json: { username, headline }
  		})

  		// review how complex actions work in Redux
  		// updateHeadline returns a complex action
 		// the complex action is called with dispatch as an argument
  		// dispatch is then called with an action as an argument

  		profileActions.updateHeadline('test test test')(
  			fn => fn(action => {
	  		expect(action).to.eql({ 
	  			headline, type:'UPDATE_PROFILE'
	  		})
	  		done()
  		}))

	})

	it('should fetch the user profile information', (done) => {
  
  		let avatar = 'avatar'
  		let zipcode = '48105'
  		let  email = 'xyz@gmail.com'
  		let dob = '07/04/1994'


  		mock(`${url}/avatars`, {
  			method: 'GET',
  			headers: {'Content-Type':'application/json'},
  			json: { avatars : [{avatar}] }
  		})

  		mock(`${url}/zipcode`, {
  			method: 'GET',
  			headers: {'Content-Type':'application/json'},
  			json: { zipcode }
  		})	
  		
  		mock(`${url}/email`, {
  			method: 'GET',
  			headers: {'Content-Type':'application/json'},
  			json: { email }
  		})

      mock(`${url}/dob`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: {dob}
        })

  		var tmp = 0;
  		profileActions.fetchProfile()(
  			fn => fn(action => {
         

                if (tmp == 0){
                    expect(action).to.eql({
                        avatar:avatar, type:'UPDATE_PROFILE'
                    })
                   	tmp++                 
                }
                else if (tmp == 1){

                    expect(action).to.eql({
                        zipcode, type:'UPDATE_PROFILE'
                    })
                    tmp++
                }
                else if (tmp == 2){

                    expect(action).to.eql({
                        email, type:'UPDATE_PROFILE'
                    })
                    tmp++
                    //done()
                 } 
                 else if (tmp == 3){
                    expect(action).to.eql({
                        dob, type:'UPDATE_PROFILE'
                    })
                    tmp++
                    done()
                }
                
  		}))

	})

})



