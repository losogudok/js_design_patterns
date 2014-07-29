// Фабрика шаблон создания объектов, который обычно 
// предоставляет интерфейс, в котором можно указать,
// какой тип объекта мы хотим получить
 
// У нас есть 2 конструктора объектов 
function Car( options ) {
 
  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
 
}
function Truck( options){
 
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}
 
 
// Теперь создадим саму фабрику
function VehicleFactory() {}
 
// Запишем методы в прототип
VehicleFactory.prototype.vehicleClass = Car;
 
// Этот метод в зависимости от типа, переданного фабрики,
// вызывает соответствущий конструктор

VehicleFactory.prototype.createVehicle = function ( options ) {
 
  switch(options.vehicleType){
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
  }
  return new this.vehicleClass( options ); 
};
 
// Создаем экземляр фабрики и запустим его
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );
 
// Проверим, что фабрика действительно выпускает экземляры
// ф-к, который мы обохначили вверху
 
// Outputs: true
console.log( car instanceof Car );
 
// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );

// Создадим новую специлизированную фабрику
// путем наследования 
function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;
 
var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle( {
                    state: "omg..so bad.",
                    color: "pink",
                    wheelSize: "so big" } );
 
// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log( myBigTruck instanceof Truck );
 
// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log( myBigTruck );






// Абстрактная фабрика предоставляет интерфейс
// с помощью которого можно в реальном времени
// добавлять к фабрики новые конструкторы


var abstractVehicleFactory = (function () {
 
  // Storage for our vehicle types
  var types = {};
 
  return {
      getVehicle: function ( type, customizations ) {
          var Vehicle = types[type];
 
          return (Vehicle ? new Vehicle(customizations) : null);
      },
 
      registerVehicle: function ( type, Vehicle ) {
          var proto = Vehicle.prototype;
 
          // only register classes that fulfill the vehicle contract
          if ( proto.drive && proto.breakDown ) {
              types[type] = Vehicle;
          }
 
          return abstractVehicleFactory;
      }
  };
})();
 
 
// Добавляем к нашем фабрики пару конструкторов
 
abstractVehicleFactory.registerVehicle( "car", Car );
abstractVehicleFactory.registerVehicle( "truck", Truck );
 
// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle( "car" , {
            color: "lime green",
            state: "like new" } );
 
// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle( "truck" , {
            wheelSize: "medium",
            color: "neon yellow" } ); 