import React, {Component} from 'react';
import mtnBackground from '../../photos/mtnBackground.png'
import './Login.scss';

export default class Login extends Component {


    login() {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;

        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }

    render() {
        return(
            <div id='App' >
            <body>
                <img src={mtnBackground} class='mtnBackground' alt='mtnBackground'/>
                <div id='body'>
                    <h1 id='outAbout'>Out & About</h1>
                    <ul className='button'>
                        <button id='login' onClick={this.login}>Login</button>
                    </ul>
                </div>
            </body>
            </div>
        )
    }
}