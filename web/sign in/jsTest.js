var peter = {
	name: "young",
	age: 18,
};
var littlePeter = peter;
console.log(peter.name);
console.log(littlePeter.age);
delete littlePeter.age;  // 传递的是指针， 因此peter的age属性也被删除了
console.log(peter.age);

var f = function c() {
	// console.log(typeof(c));
};
f();
console.log(typeof(c));

window.onload = function() {
	for (var i = 0; i < 4; ++i) {
		alert(i);
	}
}