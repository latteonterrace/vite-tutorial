
class MyClass {
  constructor() {
    console.log("MyClass==============");
  }
}


function hello() {
  console.log("hello==============");
}


export { hello as default, MyClass };