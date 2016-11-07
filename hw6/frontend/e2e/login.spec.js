import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

const webdriver = require('selenium-webdriver')


describe('Test HW5 Frontend', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(expect(findId('user_img')).to.be.ok)
        .then(done)
    })


    // it("Create new article and validate article appears in feed", (done) => {
    //     let oldlength = 0
    //     let newarticle = "test new article"
    //     sleep(500)
    //     .then(findId('card').findElements(webdriver.By.className('originalArticle')).then(
    //         (children)=>{
    //             expect(children.length).to.be.at.least(1)
    //             oldlength = children.length
    //         }
    //     ))
    //     .then(findId('post').clear())
    //     .then(findId('textarea').sendKeys(newarticle))
    //     .then(findId('publish').click())
    //     .then(sleep(500))
    //     .then(findId('card').findElements(webdriver.By.className('originalArticle')).then(
    //         (children)=>{
    //             expect(children.length).to.be.eql(oldlength+1)
    //         }
    //     ))
    //     .then(sleep(500))
    //     .then(done)
    // })


    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        let new_headline = "test new headline"
        findId('new_status').sendKeys(new_headline)
        .then(findId('btn_update_user_info').click())
        .then(sleep(1000))

        .then(findId('status').getText().then(
            text => {
                expect(text.substring(text.indexOf('"'))).to.equal('test new headline')
            })
        )
        .then(findId('new_status').clear())

        .then(findId('new_status').sendKeys('TEXT'))
        .then(findId('btn_update_user_info').click())
        .then(sleep(1000))

        .then(findId('status').getText()
            .then(
            text => {
                expect(text.substring(text.indexOf('"'))).to.equal('TEXT')
            })
        )
        .then(done)
    })


    // it("Add the 'Follower' user and verify following count increases by one", (done) => {
        
    // })


    // it("Remove the Follower user and verify following count decreases by one, test should be safe", (done) => {
        
    // })

    it("Update user email and verify", (done) => {
        sleep(500)
        .then(findId('profile').click())
        .then(sleep(500))
        .then(expect(findId('current_info')).to.be.ok)

        var oldemail = 'jp64@rice.edu'
        var newemail = 'abc@xyz.com'
        sleep(500)
        .then(findId('email').clear())
        .then(findId('email').sendKeys(newemail))
        .then(findId('submit').click())
        .then(sleep(1000))
        .then(findId('email').getAttribute('placeholder')
        .then(text=>{
            expect(text).to.eql(newemail)
        }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(oldemail))
        .then(findId('submit').click())
        .then(sleep(1000))
        .then(findId('email').getAttribute('placeholder')
        .then(text=>{
            expect(text).to.eql(oldemail)
        }))
        .then(sleep(500))
        .then(done)
    })

    it("Update user zipcode and verify", (done) => {
        sleep(500)
        
        var oldzipcode = 11111
        var newzipcode = 22222
        sleep(500)
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(newzipcode))
        .then(findId('submit').click())
        .then(sleep(1000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{
            expect(parseInt(text)).to.eql(newzipcode)
        }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(oldzipcode))
        .then(findId('submit').click())
        .then(sleep(1000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{
            expect(parseInt(text)).to.eql(oldzipcode)
        }))
        .then(sleep(500))
        .then(done)
    })

    it("Update user password and verify", (done) => {
        sleep(500)
        
        var password = 123
        sleep(500)
        .then(findId('password').clear())
        .then(findId('password2').clear())
        .then(findId('password').sendKeys(password))
        .then(findId('password2').sendKeys(password))
        .then(findId('submit').click())
        .then(sleep(1000))
        .then(findId('errorMessage').then((element)=>{
            expect(element).to.be.ok
        }))
        .then(sleep(500))
        .then(done)
    })

    after('should log out', (done) => {
        sleep(500)
        common.logout().then(done)
    })
})
