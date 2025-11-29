// import performancetimer from "../src/utilits/reusableCode/performancetimer.js";

// const getattribute = document.querySelector('h1');


// setting class atribute
// const setAttribute = getattribute.setAttribute('class', 'class');
// console.log(setAttribute);

// const pastdates = "2025-10-16T12:32:25.383Z";
// const newDate = new Date();

// const dbDate = new Date(pastdates).toISOString().split("T")[0];
// const today = newDate.toISOString().split("T")[0];

// if (dbDate < today) {
//     console.log("DB date is in the past");
// } else if (dbDate === today) {
//     console.log("DB date is today");
// } else {
//     console.log("DB date is in the future");
// };



// for loop is faster maybe,maybe not
const arr = [1, 8, 8, 9, 9, 5, 8];
// for (let index = 0; index < arr.length; index++) {

//     // performancetimer(arr);
//     const element = arr[index];
//     console.log(element)
// };

const res = arr.map(n => n);
console.log(res)

const pero = performance.now()
console.log(pero);


console.log(typeof NaN);


function outer() {
    // const outerVar = "I am from outer function!";
    const outerVar = 500;

    // function inner() {
    //     let innerVar = "I am from inner function!";
    //     console.log(outerVar);  // I can access outerVar!
    //     console.log(innerVar);  // I can access innerVar!
    // }

    // return inner;

    // const inner = () => {
    //     const innerVar = "i am from inner function";
    //     console.log(outerVar)
    //     console.log(innerVar)
    // };


    (function () {
        const innerVar = "i am from inner function";
        console.log(outerVar + innerVar)
        // console.log(innerVar)
    }())

    // inner();
};

// outer();

function takePrompt() {
    let arr = [];

    const askuser = prompt('enter number', '0')
    for (let index = 0; index < askuser.length + 2; index++) {
        console.log(index);
        return arr.push(askuser)
    };
    console.log(arr);
};

// takePrompt();

const str = "reiq";
console.log(str.length + 1);

let emptyarr = [];
const takenum = 1;

for (let index = 0; index < takenum.toString().length + 2; index++) {
    console.log("index:", index);
    emptyarr.push(index)
};

function matchNumbers(a, b, c) {
    if (a === b && b === c) {
        return "All numbers match"
    };
    if (a === b || b === c || a === c) {
        return "Two numbers match"
    };
};


console.log(matchNumbers(5, 5, 5)); 