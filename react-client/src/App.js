import React, { Component } from 'react';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theWord: ''
    }
  }
  sendWord = (word) => {
    console.log('me', this.state.theWord)
    axios.post('/defWord', { word: word })
      .then(() => {
        console.log('done');
      })
      .catch((err) => {
        throw err;
      })
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Dictionary</h2>
          <TextField
            id="theWord"
            label="Word"
            name='theWord'
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            fullWidth
            className="text"
          />
          <br/>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.sendWord(this.state.theWord)}
          >Defintion
          </Button>
          <div className="Word">

          </div>
        </header>
      </div>
    );
  }
}

export default App;
