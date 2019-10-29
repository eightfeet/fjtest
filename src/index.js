import { isNumber } from './help';
import z from '~/assets/zhe.png';
// import { s } from './index.scss';

document.body.innerHTML = `<h1 class=""><img src="${z}" />是一个测试</h1>`;


const myTest = function(parems) {
	if (isNumber(parems)) {
		return parems;
	}
	return ('this is a test!');
};

export class ClassTest {
	constructor(){
		this.name = 'ClassTest';
	}

    test = () => 'this is test!!!'
}

export default myTest;