import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{shallow,mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {handleSubmit} from './App';
import ScoreList from './App';
require('jest-localstorage-mock');

Enzyme.configure({ adapter: new Adapter() });

const scores = [
    { id: 1521862590631, name: 'Jollyby', score: 42 },
    { id: 1521862590600, name: 'Janet Pluchinsky', score: 30 },
    { id: 1521862590609, name: 'Alice Quinn', score: 27 },
    { id: 1521862590612, name: 'Julia Wicker', score: 27 },
    { id: 1521862590605, name: 'Eliot Waugh', score: 1 },
    { id: 1521862590618, name: 'Quentin Coldwater', score: 0 }
    ];

describe('<ScoreList />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ScoreList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('can set scores state in ScoreList component and count state number', () => {
        const wrapper = shallow(<ScoreList />);
        wrapper.setState({ scores: scores });
        expect(wrapper.state('scores').length).toBe(6);
    });

});

