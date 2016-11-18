import React, { PropTypes } from 'react'


import Login from './login'
import Register from './register'

import ErrorMessage from '../errorMessage'



const Landing = () => (
    <div>
        <br/><br/><br/>
        <div class="card_index">
            <div class="container">
                <h1><b>Welcome to RiceBook</b></h1> 
            </div>
        </div>
        
        <ErrorMessage />

        <Register />

        <Login />

    </div>
)

export default Landing
