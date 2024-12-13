const fs = require('fs');
const { parse } = require('path');

// precision used during calculations
const prec = 4;

function logList(nums) {
    for (let i = 0; i < nums.length; i++) {
        let tmpChar = ',';
        if (i === nums.length-1) { tmpChar = ''};
        process.stdout.write(nums[i].toString() + tmpChar);
    }
    console.log();
}


function parseFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');

        const numbers = data.split(',').map(Number);

        // console.log(numbers);

        return numbers;
    } catch (err) {
        console.error('parseFile:', err);
        return [];
    }
}

console.log("Parsing dataset.txt for numbers...");

const filePath = './dataset.txt';
const parsedNumbers = parseFile(filePath);

// logList(parsedNumbers);

// first get the mean
let mean = 0;

for (let i = 0; i < parsedNumbers.length; i++) {
    mean += parsedNumbers[i];
}
mean /= parsedNumbers.length;

// subtract mean from all members
let list_minus_mean = parsedNumbers;

for (let i = 0; i < list_minus_mean.length; i++) {
    list_minus_mean[i] -= mean;
    list_minus_mean[i] = Number(list_minus_mean[i].toPrecision(prec));

}

// square the list_minus_mean
let squared_list_minus_mean = list_minus_mean;

for (let i = 0; i < squared_list_minus_mean.length; i++) {
    squared_list_minus_mean[i] = squared_list_minus_mean[i]*squared_list_minus_mean[i];
}


let squared_mean = 0;

for (let i = 0; i < squared_list_minus_mean.length; i++) {
    squared_mean += squared_list_minus_mean[i];
}

squared_mean /= squared_list_minus_mean.length;

// and sd = sqrt(squared_mean)
let sd = Math.sqrt(squared_mean).toPrecision(prec);

console.log("Standard deviation of dataset is: ", sd);
