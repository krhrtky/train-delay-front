import * as React from 'react';
import { shallow } from "enzyme";
import { Text } from './Text';

describe('Loading text', () => {
    it('inner text', () => {
        const wrapper = shallow(<Text />);
        expect(wrapper.text()).toEqual('Loading....');
    })
});
