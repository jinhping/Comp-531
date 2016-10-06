import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        let headline_input;
        findId('message').getText().then(text => {
            headline_input = text;
        })

       
        findId('newHeadline').sendKeys("test new headline")
        .then(findId('headline').click())
        sleep(1000)

        .then(findId('message').getText().then(
            text => {
                expect(text.substring(text.indexOf('"'))).to.equal('"test new headline"')
            })
        )
        sleep(1000)


        .then(() => findId('newHeadline').sendKeys(headline_input))
        .then(findId('headline').click())
        sleep(1000)

        .then(findId('message').getText().then(
            text => {
                expect(text.substring(text.indexOf('"'))).to.equal('"test new headline"')
            })
        )
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
