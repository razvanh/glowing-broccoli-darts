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


    it('should calculate leaderboard correctly', () => {
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

        expect(wrapper.state('scores')[0].name).toBe('Jollyby');
        expect(wrapper.state('scores')[0].score).toBe(42);

        expect(wrapper.state('scores')[1].name).toBe('Janet Pluchinsky');
        expect(wrapper.state('scores')[1].score).toBe(30);

        expect(wrapper.state('scores')[2].name).toBe('Alice Quinn');
        expect(wrapper.state('scores')[2].score).toBe(27);

        expect(wrapper.state('scores')[3].name).toBe('Julia Wicker');
        expect(wrapper.state('scores')[3].score).toBe(27);

        expect(wrapper.state('scores')[4].name).toBe('Eliot Waugh');
        expect(wrapper.state('scores')[4].score).toBe(1);

        expect(wrapper.state('scores')[5].name).toBe('Quentin Coldwater');
        expect(wrapper.state('scores')[5].score).toBe(0);
        });

});

