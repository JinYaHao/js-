// async await 为generator(形如：* yeild)的语法糖
// async await与genertor的区别
// 1.genertor需要手动执行器，形如：next();async内部有自动执行器，按函数执行的方法，形如a()
// 2.更好的语义
// 3.更广的适用性
// 4.async返回值Promise，generator返回的是Interator对象

function timeout(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 5000)