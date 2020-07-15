import React, { Component } from 'react';
import axios from 'axios'

import HomePage from './pages/homepage/homepage.component'

class App extends Component {

  async componentDidMount() {
    /* const testResponse = await axios.get('/api/status'); 
    console.log(testResponse); */
  }

  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }

}

export default App;
