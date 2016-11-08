import { expect } from 'chai'
import { findId, sleep, findCSS} from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: "jp64test",
    password: "universe-courage-taste"
}

exports.login = () => 
    sleep(500)
    .then(findId('account_name_login').clear())
    .then(findId('password_login').clear())
    .then(findId('account_name_login').sendKeys(exports.creds.username))
    .then(findId('password_login').sendKeys(exports.creds.password))
    .then(findId('landing_login_button').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('e2elogout').click())
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'
    .then(sleep(1000))

    .then(expect(findId('account_name_login')).to.be.ok)

    .then(sleep(500))

