const myTest =  require('./index');

test('myTest', () => {
	expect(myTest()).toBe('this is a test!');
});