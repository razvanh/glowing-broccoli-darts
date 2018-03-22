import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import logo from './logo.svg';

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

    componentDidMount(){
        if (localStorage.getItem("glowing-broccoli-darts") === null) {
            localStorage.setItem("glowing-broccoli-darts", JSON.stringify([]));
        }

        let scores =  JSON.parse(localStorage.getItem("glowing-broccoli-darts"));
        this.setState({
            scores:scores,
        });//setState
    }//componentDidMount


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
        let newScores = _.orderBy(_.uniq(currentState.scores.concat(Score)), ['score', 'name'],['desc', 'asc']);
        localStorage.setItem("glowing-broccoli-darts", JSON.stringify(newScores));
        this.setState(() => ({
            // Add the Score, remove duplicates, order by score and name
            // @todo: it would be more efficient to just update the existing object not concat.
            scores: newScores,
            text:''
        }));
    }

    clearRankings(e){
        e.preventDefault();
        localStorage.setItem("glowing-broccoli-darts", JSON.stringify([]));
        this.setState({
            scores:[]
        });
    }
  render() {
    return (
        <div id="wrapper">
            <Header />
            <form id="new-score-form" onSubmit={this.handleSubmit}>
                <label htmlFor="new-score">
                    Enter the name and score using the <i>'name, score'</i> format:
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
                <button className="button--cancel">
                    Clear Rankings
                </button>
            </form>
        </div>
    );
  }
}

class Header extends React.Component {
    render(){
        return(
            <header>
                <img src={logo} alt="scorekeeper"/>
            </header>
            );
    };
}

class ScoreList extends React.Component {
    render() {
        let rank = 1;
        return (
            <ul>
                {this.props.scores.map((score,i,arr) => (
                    <li key={score.id} className="leaderboard">
                        <span className="leaderboard__rank">
                            {(arr[i-1] === undefined || score.score === arr[i-1].score) ? rank : rank = i +1 }
                        </span>
                        <span className="leaderboard__name">
                            {score.name}
                        </span>
                        <span className="leaderboard__score">
                            {score.score} pts
                        </span>
                    </li>
                ))}
            </ul>
        );
    }
}

export default App;
