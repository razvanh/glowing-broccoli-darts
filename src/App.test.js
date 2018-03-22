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

});

