// const myTest =  require('./index');
import myTest, { ClassTest } from '../src/index';

it('myTest', () => {
	expect(myTest()).toBe('this is a test!');
	expect(myTest(1)).toBe(1);
});

it('ClassTest', () => {
	expect(new ClassTest().test()).toBe('this is test!!!');
});