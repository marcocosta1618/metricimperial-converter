function ConvertHandler() {
  
  this.getNum = function(input) {
    // get numeric part from input string:
    let number = input.split(/[a-zA-Z]/)[0];
    // no number case:
    if (number === '') {
      return 1
    };
    // get fractional parts, if any:
    const fraction = number.split('/');
    // double fraction case or '/' at start or end of number case (both invalid)
    if (fraction.length > 2 || fraction.indexOf('') !== -1) {
      return null
    };
    // now fraction is an array of either 1 or 2 elements
    // check if all elements are valid numbers:
    const regex = /^(\d+(\.\d*)?|\.\d+)$/;
    if (!fraction.every(num => regex.test(num))) {
      return null
    };
    // 1 number (no fraction) case:
    if (!fraction[1]) {
      return parseFloat(fraction[0])
    } 
    // 2 numbers, get result:
    return parseFloat(fraction[0]/fraction[1]);
  };
  
  this.getUnit = function(input) {
    let unit = input.toLowerCase().split(/[0-9./,]+/i).slice(-1)[0];
    if (unit === 'l') {
      unit = 'L'
    }
    const validUnits = ['gal','L','mi','km','lbs','kg'];
    return validUnits.indexOf(unit) === -1
      ? null
      : unit
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
    }
    return result;
  };
  
  this.spellOutUnit = function(unit) {
    let result;
    const spellOut = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    }
    result = spellOut[unit];
    return result;
  };
  
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal' || initUnit === 'L') {
      initUnit === 'gal'
        ? result = initNum * galToL
        : result = initNum / galToL
    } else if (initUnit === 'lbs' || initUnit === 'kg') {
      initUnit === 'lbs'
        ? result = initNum * lbsToKg
        : result = initNum / lbsToKg
    } else {
      initUnit === 'mi'
        ? result = initNum * miToKm
        : result = initNum / miToKm
    }
    //return (Math.trunc(result * 100000)) / 100000
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return string;
  };
  
}

module.exports = ConvertHandler;