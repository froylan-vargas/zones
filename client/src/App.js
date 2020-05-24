import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'

import './App.css';

class App extends Component {
  
  responseFacebook = async (fbRes) => {
    const {id,email,first_name,picture, accessToken} = fbRes
    const fbUser = {
      fbId:id,
      accessToken,
      email,
      first_name,
      picture : picture.data.url
    }

    console.log(fbUser)

    //If no token, then redirect to login routes. 
    const fbloginRes = await axios.post('api/auth/fblogin',fbUser)
    if (fbloginRes){
      console.log(fbloginRes.data)
    }
  }

  render() {
    return (
      <div className="App">
        <FacebookLoginBtn
          appId={process.env.REACT_APP_FB_APP_ID}
          disableMobileRedirect={true}
          autoLoad = {false}
          fields="name,email,picture,first_name"
          callback={this.responseFacebook}
          render={renderProps => (
            <button onClick={renderProps.onClick}>This is my custom FB button</button>
          )}
        />
      </div>
    );
  }

}

export default App;
