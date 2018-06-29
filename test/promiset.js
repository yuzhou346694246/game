function print1(v) {
    console.log(v);
}
for (let i of [1, 2, 3]) {
    // print1(i);
}
let count = 0;
for (let i of [1, 2, 3, 4, 5]) {
    // console.log(new Date());
    count = count + 1;
    setTimeout(() => {
        console.log(new Date());
        console.log(i);
    }, 1000 * count);
}
//# sourceMappingURL=promiset.js.map