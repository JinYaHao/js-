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



// async使用注意点：
// 第一点，await命令后面的Promise对象，运行的结果可能是rejected，所以最好把命令放在await命令放在try……catch代码块里面
// 写法1：
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch(err) {
    console.log(err, 111);
  }
}
// 写法2：
async function myFunction1() {
  await somethingThatReturnsAPromise()
  .catch(function(err) {
    console.log(err)
  })
}

// 第二点，多个await后面的异步操作，如果他们不是继发关系，最好让他们同时触发。
// 写法1
// function getFoo();
// function getBar();
// let [foo, bar] = await Promise.all([ getBar(), getBar() ]);
// 写法2
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromisel;
// let bar = await barPromise;


// 第三点，await只能用在async函数里面，用在普通函数中会报错
// 第四点，async 函数可以保留运行堆栈。