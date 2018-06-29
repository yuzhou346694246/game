var p = new Promise((resolve, reject) => {
    resolve(12345);
});
p.then((v) => {
    // console.log(v);
});
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve('time now'), time);
    });
}
delay(1000).then((v) => {
    // console.log(v);
});
function delay1(v) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(v), 1000);
    });
}
// Promise.all([delay1(1),delay1(2),delay1(3)]).then((res)=>{
//     console.log(res);
// })
delay1(1).then((v) => {
    // console.log(v);
});
// console.log(typeof(delay1(1)));//object
let p2 = Promise.resolve(10);
// console.log(typeof(p2));//object
p2.then((v) => {
    // console.log(v);
    return Promise.resolve(v + 1);
}).then((v) => {
    // console.log(v);
});
var a1 = [1, 2, 3, 4, 5];
for (let i of a1) {
    // console.log(i);
}
for (let i of a1) {
    console.log(new Date());
    setTimeout(() => {
        console.log(new Date());
        console.log(i);
    }, 1000);
}
// console.log(new Date());
// setTimeout(()=>{
//     console.log(10)
//     console.log(new Date());
// },1000);//延时是正确的
//# sourceMappingURL=promiselearn.js.map