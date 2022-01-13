

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];
const invalid6 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

/**
 * Check whether the card number is valid using Luhn algorithm with one distinction, instead of checking  
 * whether the sum divided by 10 has a remainder that equal the last digit in the card I'm checking if the sum  
 * has a remainder of 0 then the number is valid. 
 * @param {*} arr represent the card number 
 * @returns true if the card is valid, false otherwise
 */
function validateCred(arr){
  let modifiedArr = JSON.parse(JSON.stringify(arr));
  for(let i = arr.length - 2; i >= 0; i -= 2){ //changing every other number from right to left
    let modifiedElement = modifiedArr[i] * 2;
    if( modifiedElement > 9){
      modifiedElement -= 9;
    }
    modifiedArr[i] = modifiedElement; 
  }
  let sum = modifiedArr.reduce((previousValue, currentValue) => previousValue + currentValue,
  0);
  return (sum % 10 === 0);
}
//console.log(invalid1);

/**
 * This function gets an array of credit cards and return an array of invalid cards
 * @param {*} nestedArr 
 * @returns 
 */
function findInvalidCards(nestedArr) {
  let arrCopy = JSON.parse(JSON.stringify(nestedArr));
  let invalidCards = [];
  for(let i = 0; i < arrCopy.length; i++){
    if(!validateCred(arrCopy[i])){
      invalidCards.push(nestedArr[i])
    }
  }
  return invalidCards;
}

/**
 * The function return an array of companies that have mailed out cards with invalid numbers.
 * @param {} invalidNum 
 * @returns 
 */
function idInvalidCardCompanies(invalidNum){
  let companies = [];
  let visa = 0;
  let amex = 0;
  let mastercard = 0;
  let discover = 0;
  let arrCopy = JSON.parse(JSON.stringify(invalidNum));
  for(let i = 0; i < arrCopy.length; i++){
    if(visa === 0 && arrCopy[i][0] === 4){
      visa += 1;
      companies.push('Visa');
    }else if(amex === 0 && arrCopy[i][0] === 3){
      amex += 1;
      companies.push('Amex');
    }else if(mastercard === 0 && arrCopy[i][0] === 5){
      mastercard += 1;
      companies.push('Mastercard');
    }else if(discover === 0 && arrCopy[i][0] === 6){
      discover += 1;
      companies.push('Discover');
    }
  }
  if(visa === 0 && amex === 0 && mastercard === 0 && discover === 0){
    return 'Company not found';
  }
  return companies;
}


/**
 * The function accepts a string and converts it into an array of numbers.
 * @param {} str 
 * @returns 
 */
function stringToArray(str){
  let arr = str.split('').map(Number);
  return arr;
}

/**
 * This function will convert invalid numbers into valid numbers. By subtracting the remainder of the digits of the card
 * @param {*} invalidArr 
 * @returns 
 */
function invalidToValid(invalidArr){
  let sum = cardNumbersSum(invalidArr);
  let remainder = sum % 10;
  let index = invalidArr.length - 1;
  while(remainder !== 0 && index >= 0){//the remainder must be 0 for the card to be valid
    if((invalidArr[index] - remainder) < 0){
      remainder -= invalidArr[index]; //Subtracting only the current digit from the remainder to avoid negative number
      invalidArr[index] -= invalidArr[index];
      index -= 2;
    }else{
      invalidArr[index] -= remainder;//Subtracting the remainder from the current number
      remainder -= remainder;
    }
  }
  return invalidArr;
} 

/**
 * Helper function: Adding all the numbers together after  
 * multiplying the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to any result higher than 9.
 * @param {} arr 
 * @returns sum
 */
function cardNumbersSum(arr){
  let modifiedArr = JSON.parse(JSON.stringify(arr));
  for(let i = arr.length - 2; i >= 0; i -= 2){ //changing every other number from right to left
    let modifiedElement = modifiedArr[i] * 2;
    if( modifiedElement > 9){
      modifiedElement -= 9;
    }
    modifiedArr[i] = modifiedElement; 
  }
  let sum = modifiedArr.reduce((previousValue, currentValue) => previousValue + currentValue,
  0);
  return sum;
}

/**
 * Helper Function: returning the reminder of the sum divided by ten.
 * @param {*} arr 
 * @returns 
 */
function modTen(arr){
  let sum = cardNumbersSum(arr);
  return (sum % 10);
}
