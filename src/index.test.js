// const myTest =  require('./index');
import myTest from './index';

test('myTest', () => {
	expect(myTest()).toBe('this is a test!');
});