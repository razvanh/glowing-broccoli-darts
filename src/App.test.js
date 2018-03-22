import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import App from './App';
import {handleSubmit} from './App';
import ScoreList from './App';
require('jest-localstorage-mock');

Enzyme.configure({ adapter: new Adapter() });

const scores = [
    {
        id:1,
        name:'Razvan',
        score:100
    }
];

const sample_scores = [

];

describe('<App />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('can set scores state in App component and count state number', () => {
        const wrapper = shallow(<App />);
        wrapper.setState({ scores: scores });
        expect(wrapper.state('scores').length).toBe(1);
    });

    it('can render ScoreList in App component', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find(ScoreList).type()).toBe(ScoreList);
    });


    it('should display leaderboard correctly', () => {
        const fakeEvent = { preventDefault: () => {}
        };
        const wrapper = mount(<App />);
        expect(wrapper.find('#new-score-form').length).toBe(1);

        wrapper.setState({ text: 'Janet Pluchinsky, 10' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Eliot Waugh, 1' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Alice Quinn, 27' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Julia Wicker, 7' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Quentin Coldwater, 0' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Janet Pluchinsky, 20' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Julia Wicker, 20' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);

        wrapper.setState({ text: 'Jollyby, 42' });
        wrapper.find('#new-score-form button').simulate('submit', fakeEvent);


        expect(wrapper.state('scores').length).toBe(6);

        expect(wrapper.find('ul').html()).toBe('<ul><li class="leaderboard"><span class="leaderboard__rank">1</span><span class="leaderboard__name">Jollyby</span><span class="leaderboard__score">42 pts</span></li><li class="leaderboard"><span class="leaderboard__rank">2</span><span class="leaderboard__name">Janet Pluchinsky</span><span class="leaderboard__score">30 pts</span></li><li class="leaderboard"><span class="leaderboard__rank">3</span><span class="leaderboard__name">Alice Quinn</span><span class="leaderboard__score">27 pts</span></li><li class="leaderboard"><span class="leaderboard__rank">3</span><span class="leaderboard__name">Julia Wicker</span><span class="leaderboard__score">27 pts</span></li><li class="leaderboard"><span class="leaderboard__rank">5</span><span class="leaderboard__name">Eliot Waugh</span><span class="leaderboard__score">1 pts</span></li><li class="leaderboard"><span class="leaderboard__rank">6</span><span class="leaderboard__name">Quentin Coldwater</span><span class="leaderboard__score">0 pts</span></li></ul>');
        });

});

