import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test HW5 Frontend Register New User', () => {

    before('should register in', (done) => {
        go().then(done)
    })

    it('should tell me that I register successfully', (done) => {
        sleep(500)
        .then(findId('account_name').sendKeys('abc'))
        .then(findId('email').sendKeys('jp64@rice.edu'))
        .then(findId('phone_number').sendKeys('123-123-1234'))
        .then(findId('birthday').sendKeys('07041994'))
        .then(findId('zipcode').sendKeys('77030'))
        .then(findId('password').sendKeys('123'))
        .then(findId('password_confirmation').sendKeys('123'))
        .then(findId('btn_submit').click())
        sleep(500)
        .then(findId('successMessage').then((element)=>{
            expect(element).to.be.ok
        }))
        .then(sleep(500))
        .then(done)
    })
})
