const test = function() {
	return ('this is a test!');
};

class ClassTest {
	constructor(){
		this.name = 'ClassTest';
	}

 test = () => {
	 console.log('this is test!!!');
 }
}

console.log(test());

module.exports = ClassTest;
