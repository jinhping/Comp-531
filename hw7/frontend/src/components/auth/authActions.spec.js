import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


let resource,url, authActions
describe('Validate authenticate actions', () => {
    
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').default
            url = require('../../actions').apiUrl
            authActions = require('./authActions')
        }

    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    }) 
 
    it('should log in the user', (done)=>{

        const username = 'jp64'
        const password = 'calm-engine-cage'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

     
        authActions.localLogin(username, password)(
            (action)=>{
                                   
                    expect(action).to.eql({
                        type:'LOGIN_LOCAL',
                        username
                   })
         
                    done()
            }
        )
    })


     it('should not log in an invalid user', (done)=>{

        const username = 'fakeusername'
        const password = 'fakepassword'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

     

        authActions.localLogin(username, password)(
            (action)=>{
                    expect(action).to.eql({
                        type:'ERROR',
                        error : `Error appears when logging in as ${username}`
                   })
       
                    done()
            }
        )
    })


    it('should log out a user (state should be cleared, this is tested in another test case)', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })


        authActions.logout()(
            (action)=>{
                expect(action).to.eql({
                    type:'NAV_OUT'
                })
                done()
            }
        )
        
    })



})
