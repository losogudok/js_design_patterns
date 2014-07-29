// Декоратор предоставляет гибкую альтернативу практике 
// создания подклассов с целью расширения функциональности.

/*==========  Пример 1  ==========*/

function Coffee() {
    this.cost = function() {
	return 1;
    };
}
 
// Decorator A
function Milk(coffee) {
    this.cost = function() {
	return coffee.cost() + 0.5;
    };	
}
 
// Decorator B
function Whip(coffee) {
    this.cost = function() {
	return coffee.cost() + 0.7;
    };
}
 
// Decorator C
function Sprinkles(coffee) {
    this.cost = function() {
	return coffee.cost() + 0.2;
    };
}
 
// Можно использовать, например, так:
var coffee = new Milk(new Whip(new Sprinkles(new Coffee())));
console.log( coffee.cost() );
 
// Или более наглядно:
var coffee = new Coffee();
coffee = new Sprinkles(coffee);
coffee = new Whip(coffee);
coffee = new Milk(coffee);
console.log(coffee.cost());


/*==========  Пример 2   ==========*/

// The constructor to decorate
function MacBook() {
 
  this.cost = function () { return 997; };
  this.screenSize = function () { return 11.6; };
 
}
 
// Decorator 1
function memory( macbook ) {
 
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
 
}
 
// Decorator 2
function engraving( macbook ){
 
  var v = macbook.cost();
  macbook.cost = function(){
    return  v + 200;
  };
 
}
 
// Decorator 3
function insurance( macbook ){
 
  var v = macbook.cost();
  macbook.cost = function(){
     return  v + 250;
  };
 
}
 
var mb = new MacBook();
memory( mb );
engraving( mb );
insurance( mb );
 
// Outputs: 1522
console.log( mb.cost() );
 
// Outputs: 11.6
console.log( mb.screenSize() );

/*==========  Пример 3  ==========*/

// Данный пример отличается от остальных лишь тем,
// что в нем мы держим дектораторы в статическом методе
// ф-ии конструктора
// Также стоит отметить, что цена изменяется не сразу при
// вызове декоратора, а только в момент вызова декорируемого
// метода, getPrice.

function Sale(price) {
	this.price = (price > 0) || 100;
	this.decorators_list = [];
}
Sale.prototype.decorate = function (decorator) {
	this.decorators_list.push(decorator);
};
Sale.prototype.getPrice = function () {
	var price = this.price,
	i,
	max = this.decorators_list.length,
	name;

	for (i = 0; i < max; i += 1) {
		name = this.decorators_list[i];
		price = Sale.decorators[name].getPrice(price);
	}
	return price;
};
Sale.decorators = {};
Sale.decorators.fedtax = {
	getPrice: function (price) {
		return price + price * 5 / 100;
	}
};
Sale.decorators.quebec = {
	getPrice: function (price) {
		return price + price * 7.5 / 100;
	}
};
Sale.decorators.money = {
	getPrice: function (price) {
		return "$" + price.toFixed(2);
	}
};
var sale = new Sale(100);
sale.decorate('fedtax');
sale.decorate('quebec');
sale.decorate('money');
console.log(sale.getPrice());
