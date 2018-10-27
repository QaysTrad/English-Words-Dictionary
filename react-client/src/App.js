import React, { Component } from 'react';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theWord: '',
      data: [],
    }
  }
  sendWord = (word) => {
    var meaning = []
    var lexicalCategory = []
    axios.post('/defWord', { word: word })
      .then((data) => {
        for (var i = 0; i < data.data.results.length; i++) {
          meaning.push(data.data.results[i].lexicalEntries);
        }
        for (var j = 0; j < meaning.length; j++) {
          for (var s = 0; s < meaning[j].length; s++) {
            lexicalCategory.push(meaning[j][s])
          }
        }
        this.setState({ data: lexicalCategory })
      })
      .catch((err) => {
        alert("there's no such a thing");
        window.location.reload();
      })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  render() {
    return (
      <div className="bod">
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
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.sendWord(this.state.theWord)}
            >Defintion
          </Button>
            <div className="Word">
              {this.state.data.map(mean => {
                console.log(mean)
                return (
                  <div>
                    <h3>Category: {mean.lexicalCategory}
                    </h3>
                    {mean.entries.map(s => {
                      return (
                        <div>
                          {s.senses.map(v => {

                            if (v.definitions !== undefined) {
                              return (
                                <div>
                                  <h4>definition : {v.short_definitions[0]}</h4>
                                </div>
                              )
                            }
                          })}
                          {s.senses.map(ex => {
                            if (ex.examples !== undefined) {
                              for (var x = 0; x < ex.examples.length; x++) {
                                return (
                                  <div>
                                    <h4>example : {ex.examples[x].text}</h4>
                                  </div>
                                )
                              }
                            }
                          })}
                        </div>
                      )
                    })
                    }
                  </div>
                )
              })
              }
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
