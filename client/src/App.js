import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import AdminMainpage from './pages/admin-mainpage/admin-mainpage.component'

class App extends Component {

  async componentDidMount() {
    /* const testResponse = await axios.get('/api/status'); 
    console.log(testResponse); */
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/admin' component={AdminMainpage} />
        </Switch>

      </div>
    );
  }

}

export default App;
