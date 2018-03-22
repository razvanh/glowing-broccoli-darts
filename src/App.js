import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            scores:[],
            text:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearRankings = this.clearRankings.bind(this);
    }

    handleChange(e){
        this.setState({text: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        //@todo: validate the input
        // don't do anything if there is no text in the input field
        if (!this.state.text.length) {
            return;
        }
        let currentState = this.state;
        const scoreComponents = currentState.text.split(',');
        const index = _.findIndex(currentState.scores, { 'name': scoreComponents[0] });
        let Score = {};
        if (index >= 0){
            // The name is already in the array
            Score = currentState.scores[index];
            Score.score += Number(scoreComponents[1]);
        }
        else {
            Score = {
                id: Date.now(),
                name: scoreComponents[0],
                score: Number(scoreComponents[1]),
            };
        }
        this.setState(prevState => ({
            // Add the Score, remove duplicates, order by score and name
            // @todo: it would be more efficient to just update the existing object not concat.
            scores: _.orderBy(_.uniq(prevState.scores.concat(Score)), ['score', 'name'],['desc', 'asc']),
            text:''
        }));
    }

    clearRankings(e){
        e.preventDefault();
        this.setState({
            scores:[]
        });
    }
  render() {
    return (
        <div>
            <header>
                <h1>scorekeeper</h1>
            </header>

            <form onSubmit={this.handleSubmit}>
                <label htmlFor="new-score">
                    Enter the name and score 'name, score'
                </label>
                <input
                    id="new-score"
                    onChange={this.handleChange}
                    value = {this.state.text}
                />
                <button>
                    Add to rankings
                </button>
            </form>
            <ScoreList scores={this.state.scores}/>
            <form onSubmit={this.clearRankings}>
                <button>
                    Clear Rankings
                </button>
            </form>
        </div>
    );
  }
}

class ScoreList extends React.Component {
    render() {
        let rank = 1;
        return (
            <ul>
                {this.props.scores.map((score,i,arr) => (
                    <li key={score.id}>{(arr[i-1] === undefined || score.score === arr[i-1].score) ? rank : rank = i +1 }. {score.name}, {score.score} pts</li>
                ))}
            </ul>
        );
    }
}

export default App;
