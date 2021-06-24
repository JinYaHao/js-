// 利用async await 实现休眠效果
// interval为1000，实现倒计时的效果
function sleep(interval) {
  return new Promise((reslove, reject) => {
    setTimeout(reslove, interval);
  });
}

async function one2FiveInAsync(awaitLength) {
  for (let i = 1; i <= awaitLength; i++) {
    console.log(i)
    await sleep(1000);
  }
}
one2FiveInAsync(5)