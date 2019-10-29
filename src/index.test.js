// const myTest =  require('./index');
import myTest, { ClassTest } from './index';

test('myTest', () => {
	expect(myTest()).toBe('this is a test!');
	expect(myTest(1)).toBe(1);
});

test('ClassTest', () => {
	expect(new ClassTest().test()).toBe('this is test!!!');
});