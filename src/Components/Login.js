import React, {Component} from 'react';

const appStyle = {
    margin: '0%',
    width: '100%',
    height: '100%',
    backgroundColor: '#41476B'
}
const buttonStyle = {
   
}

export default class Login extends Component {

    login() {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;

        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }

    render() {
        return(
            <div className='App' style={appStyle}>
                <h1 className='button'>
                    <button onClick={this.login} style={buttonStyle}>Login</button>
                </h1>
            </div>
        )
    }
}