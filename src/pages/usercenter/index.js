// function Parent() {
//   this.age = 11;
// }
// function Child() {
//   // this.age = 11;
// }

// Child.prototype = new Parent();
// const child = new Child();
// console.log(child.prototype);

// function Parent(age) {
//   this.age = age;
// }
// function Child() {
//   // this.age = age;
//   Parent.call(this, "11");
//   console.log(this);
// }

// const child = new Child();
// console.log(child);

function Parent(name) {
  this.name = name;
  this.colors = ["red"];
}

Parent.prototype.sayName = () => {
  console.log(this.name);
};

function child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

child.prototype = new Parent();
child.prototype.constructor = child;
child.prototype.sayAge = () => {
  console.log(this.age);
};
