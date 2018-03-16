import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
