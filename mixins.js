// В традиционных языках программирования 
// Миксины это классы, которые легко могут быть
// наследованы саб-классами с целью их расширения
// В javascript миксины применяются очень часто и 
// представляют из себя по сути создание объектов 
// путем копирования свойств и методов других объектов

var _ = require('lodash');

function mix() {
	var arg, prop, child = {};
		for (arg = 0; arg < arguments.length; arg += 1) {
			for (prop in arguments[arg]) {
				if (arguments[arg].hasOwnProperty(prop)) {
					child[prop] = arguments[arg][prop];
				}
			}
		}
	return child;
}

/*==========  Пример 1  ==========*/

function Cat(name) {
	this.name = name || '';
}

Cat.prototype.meow = function() {
	return this.name + ' meows';
}

function Bird(name) {
	this.name = name || '';
}

Bird.prototype.fly = function() {
	return this.name + ' flies';
}

function CatBird(name) {
	this.name = name || '';
}

CatBird.prototype = mix(Cat.prototype, Bird.prototype);

var catBird = new CatBird('FooCat');
console.log(catBird.meow());
console.log(catBird.fly());

/*==========  Пример 2  ==========*/

// Объект, который мы будем встраивать

var myMixins = {
 
  moveUp: function(){
    return "move up";
  },
 
  moveDown: function(){
  	return "move down";
  },
 
  stop: function(){
    return "stop! in the name of love!";
  }
 
};

// A skeleton carAnimator constructor
function CarAnimator(){
	this.moveLeft = function(){
		return "move left";
	};
}
 
// A skeleton personAnimator constructor
function PersonAnimator(){
	this.moveRandomly = function(){ /*..*/ };
}
 
// Extend both constructors with our Mixin
_.extend( CarAnimator.prototype, myMixins );
_.extend( PersonAnimator.prototype, myMixins );
 
// Create a new instance of carAnimator
var myAnimator = new CarAnimator();
console.log(myAnimator.moveLeft());
console.log(myAnimator.moveDown());
console.log(myAnimator.stop());
 
// Outputs:
// move left
// move down
// stop! in the name of love!


/*==========  Пример 3  ==========*/

// В данном пример у нас есть возможность 
// брать из миксинов только те свойства и методы, 
// которые нам нужны



// Define a simple Car constructor
var Car = function ( settings ) {
 
    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";
 
};
 
// Mixin
var Mixin = function () {};
 
Mixin.prototype = {
 
    driveForward: function () {
        console.log( "drive forward" );
    },
 
    driveBackward: function () {
        console.log( "drive backward" );
    },
 
    driveSideways: function () {
        console.log( "drive sideways" );
    }
 
};
 
 
// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
 
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
 
            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
 
            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}
 
 
// Расширяем прототим класса Car методами driveForvard и driveBackward
augment( Car, Mixin, "driveForward", "driveBackward" );
 
// Create a new Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});
 
// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();
 
// Outputs:
// drive forward
// drive backward
 
// В даннном пример мы берем все методы их миксина
augment( Car, Mixin );
 
var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});
 
mySportsCar.driveSideways();
 
// Outputs:
// drive sideways
