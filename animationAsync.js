// 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
// 方法一 利用Promise实现
function chainAnimationsPromise(elem, animations) {
  // 遍历ret保存上一个动画的返回值
  let ret = null;
  // 新建一个Promise对象
  let p = new Promise.resolve();
  // 利用then()方法，添加所有动画
  for(let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕获机制的Promise
  return p.catch(function(e) {
    // 忽略错误，继续执行
  }).then(function() {
    return ret;
  })
}

// 方法二 利用Generator实现
// 使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在spawn函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的spawn函数就是自动执行器，它返回一个 Promise 对象，而且必须保证yield语句后面的表达式，必须返回一个
function chainAnimationsGenerator(elem, animations) {
  return spawn(function*() {
    let ret = null;
    try {
      for (let anim of animations) {
        ret = yield anim(elem)
      }
    } catch(e) {
      // 忽略错误，继续执行
    }
    return ret;
  });
}

// 方法三 利用Async实现
function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) {
      ret = await anim(elem)
    }
  } catch(e) {
    // 忽略错误，继续执行
  }
  return ret
}
