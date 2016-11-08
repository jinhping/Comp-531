import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findClassName, findElements } from './selenium'
import common from './common'

const webdriver = require('selenium-webdriver')



describe('Test HW5 Frontend', () => {


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


    it('should log in as the test user', (done) => {
        sleep(500)
        .then(common.login)
        sleep(500)
        .then(expect(findId('user_img')).to.be.ok)
        .then(done)
    })


    it("Create new article and validate article appears in feed", (done) => {
        sleep(500)
        let newarticle = "test new article"
        sleep(500)
        .then(findId('textarea').clear())
        .then(findId('textarea').sendKeys(newarticle))
        .then(findId('publish').click())
        .then(sleep(500))
        .then(findClassName('contentId').getText()
                .then(text => {
                     expect(text).to.equal(newarticle)

                })
                .then(done)
            )
    })


    it("Edit an article and validate the article text has updated", (done) => {
        sleep(500)
        var newarticle = "test newarticle"
        var oldarticle;
        sleep(500)
        .then(findClassName('contentId').getText()
                .then(text => {
                    oldarticle = text
                    findClassName('contentId').clear()
                    sleep(500)
                    findClassName('contentId').sendKeys(newarticle)
                    sleep(500)
                    findClassName('button_articles').click()           
                    findClassName('contentId').getText()
                        .then (text => {
                            expect(text).to.equal(newarticle)
                            expect(text).to.not.equal(oldarticle)
                        })
                })

                .then(done)
                )
     
    })

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
    
    it("Count the number of followed users", (done) => {
        var oldlength;
        sleep(500)
        .then(findElements('[name="follower"]')
            .then(elements => {
                oldlength = elements.length
                expect(oldlength).to.be.at.least(3)
            })
        )
        .then(done)    
    })

    it("Add the 'Follower' user and verify following count increases by one", (done) => {
        var oldlength;
        var newfollower = 'Follower'
        var newlength;
        sleep(500)
        .then(findElements('[name="follower"]')
            .then(elements => {
                oldlength = elements.length
                findId('add_new_follower').sendKeys(newfollower)
                findId('add_follower').click()
                sleep(500)
                findElements('[name="follower"]')
                .then(elements => {
                    newlength = elements.length
                    expect(newlength).to.equal(oldlength + 1)
                })

            })
            .then(done))    

    })


    it("Remove the Follower user and verify following count decreases by one, test should be safe", (done) => {
        var oldlength;
        var newfollower = 'Follower'
        var newlength;
        sleep(500)
        .then(findElements('[name="follower"]')
            .then(elements => {
                oldlength = elements.length
                findId('unfollow_btn').click()
                sleep(500)
                findElements('[name="follower"]')
                .then(elements => {
                    newlength = elements.length
                    expect(newlength).to.equal(oldlength - 1)
                })

            })
            .then(done))    
    })


    it("Search for special &quot;Only One Article Like This&quot; article and verify author", (done) => {
        var searchkey = "Only One Article Like This"
        sleep(500)
        .then(findId('search_box').sendKeys(searchkey))
        sleep(500)
        .then(findClassName("authorname").getText()
            .then(name => {
                expect(name).eql('jp64test')
            }))
        .then(findElements('[name="article"]')
            .then(elements => {
                expect(elements.length).to.equal(1)
            })
        .then(done))

    })


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
        .then(sleep(2000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{
            expect(parseInt(text)).to.eql(newzipcode)
        }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(oldzipcode))
        .then(findId('submit').click())
        .then(sleep(2000))
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
