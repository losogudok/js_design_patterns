// Синглтон означает, что у класса
// возможен лишь один экземпляр

var singleton = {};

// Пример посложнее с использованием
// ф-ии конструктора

 function Singleton() {
 	if (Singleton.instance) {
 		return Singleton.instance;
 	}
 	else {
 		this.created = true;
 		Singleton.instance = this;
 		return this;
 	}
 }
 var singleton2 = new Singleton();
console.log(singleton2 === new Singleton());