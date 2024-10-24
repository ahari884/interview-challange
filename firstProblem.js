/**
 * Given an integer array – [6,13,22,18,0,3,45,57,5,12]
 * Write a function that finds the second largest integer in the array using only a single
 * loop, and outputs the result to the console.
 */


// returns -Infinity if there's no second Max, otherwise returns the second maximum value from array
function getSecondMax(inputArr) {
    // Assuming the array is empty or array of length is 1
    if(!inputArr.length || inputArr.length == 1) return -Infinity;

    // Assigning -Infinity to firstMax and secondMax as minimum boundary value
    let firstMax = -Infinity, secondMax = -Infinity;
    for(let el of inputArr) {
        // if the element is greater than firstMax it'll be the recent firstMax (or maximum of all so far)
        // and previous firstMax will be next secondMax
        if(el > firstMax) {
            secondMax = firstMax;
            firstMax = el;
        // if element is not greater than max then it could be the secondMax if secondMax is less than el
        // and secondMax can't be equal to firstMax to avoid duplicate elements in array
        } else if(el > secondMax && el != firstMax) { 
            secondMax = el;
        }
    }
    return secondMax;
}

let inputArr = [6,13,22,18,0,3,45,57,5,12];
let secondMax = getSecondMax(inputArr)
console.log('1. Second max is ' + secondMax);
console.log('2. Second max is ' + getSecondMax([6,6,6]))
console.log('3. Second max is ' + getSecondMax([7,6,6]))
console.log('2. Second max is ' + getSecondMax([-1,-2,-2]))


