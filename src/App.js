import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            scores:[],
            text:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({text: e.target.value});
    }

  render() {
    return (
        <div>
            <header>
                <h1>scorekeeper</h1>
            </header>

            <form>
                <label htmlFor="new-score">
                    Enter the name and score 'name, score'
                </label>
                <input
                    id="new-score"
                    onChange={this.handleChange}
                />
                <button>
                    Add to rankings
                </button>
                <button>
                    Clear Rankings
                </button>
            </form>
            <ScoreList/>

        </div>
    );
  }
}

class ScoreList extends React.Component {
    render() {
        return (
            <ol>
                <li>Jollyby, 42 pts</li>
                <li>Janet Pluchinsky, 30 pts</li>
                <li>Alice Quinn, 27 pts</li>
                <li>Julia Wicker, 27 pts</li>
                <li>Eliot Waugh, 1 pt</li>
                <li>Quentin Coldwater, 0 pts</li>
            </ol>
        );
    }
}

export default App;
