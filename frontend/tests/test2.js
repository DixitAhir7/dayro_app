// for (let index = 0; index < 3; index++) {
//     let input = Number(prompt("user input"))
//     console.log(input)
// }

const arr = [5, 88, null];

const filtered = arr.filter((a,i) =>{
    return a == null
})

console.log(arr);
console.log(filtered);