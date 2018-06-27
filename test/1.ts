console.log("test");
let a:Number[] = [1,2,3,4]
a.forEach(element => {
    console.log(element);
});

function print<T>(arg:Array<T>):void{
    arg.forEach(element=>{
        console.log(element)
    });
}
print(a);