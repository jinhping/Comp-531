// import { expect } from 'chai'
// import mockery from 'mockery'
// import fetch, { mock } from 'mock-fetch'

// import * as profileActions from './profileActions'

// import {apiUrl}  from '../../actions'

// let Action, actions

// beforeEach(() => {
//   if (mockery.enable) {
// 	 mockery.enable({warnOnUnregistered: false, useCleanCache:true})
// 	 mockery.registerMock('node-fetch', fetch)
// 	 require('node-fetch')
  
//   apiUrl = require('../../actions').url
//   resource = require('../../actions').resource
//   profileActions = require('./profileActions')

//   }
//   Action = require('../../actions').default
//   actions = require('../../actions')
// })

// afterEach(() => {
//   if (mockery.enable) {
// 	mockery.deregisterMock('node-fetch')
// 	mockery.disable()
//   }
// })

// it('should update the status message', (done) => {
  
//   // the result from the mocked AJAX call
//   const username = 'sep1test'
//   const headline = 'A new headline!'

//   mock(`${apiUrl}/headline`, {
//   	method: 'PUT',
//   	headers: {'Content-Type':'application/json'},
//   	json: { username, headline }
//   })

//   // review how complex actions work in Redux
//   // updateHeadline returns a complex action
//   // the complex action is called with dispatch as an argument
//   // dispatch is then called with an action as an argument

//   profileActions.updateHeadline('does not matter')(
//   	fn => fn(action => {
// 	  expect(action).to.eql({ 
// 	  	headline, type: actions.UPDATE_PROFILE
// 	  })
// 	  done()
//   	}))

// })