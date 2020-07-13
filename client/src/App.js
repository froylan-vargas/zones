import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

class App extends Component {

  async componentDidMount(){
    const testResponse = await axios.get('/api/status'); 
    console.log(testResponse);
  }

  render() {
    return (
      <div className="App">
        <span>Hello from zones</span>
      </div>
    );
  }

}

export default App;
