const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // numbers
    test('01_readWholeNum', () => {
        assert.isNumber(convertHandler.getNum('2gal'));
    });
    test('02_readDecimalNum', () => {
        assert.isNumber(convertHandler.getNum('1.5km'));
    });
    test('03_readFractionNum', () => {
        assert.isNumber(convertHandler.getNum('2/10L'));
    });
    test('04_readDecimalFractNum', () => {
        assert.isNumber(convertHandler.getNum('3.5/9mi'));
    });
    test('05_doubleFractErr', () => {
        assert.isNull(convertHandler.getNum('3.5/9/4lbs'));
    });
    test('06_defaultTo1', () => {
        assert.equal(convertHandler.getNum('mi'), 1);
    });
    // units
    const validUnits = ['gal','L','mi','km','lbs','kg'];
    test('07_readValidUnits', () => {
        const reads = validUnits.map(unit => convertHandler.getUnit(unit));
        assert.notInclude(reads, null);
    });
    test('08_invalidUnitErr', () => {
        assert.isNull(convertHandler.getUnit('nihil'));
    });
    test('09_returnCorrectUnit', () => {
        const input = validUnits;
        const expect = ['L','gal','km','mi','kg','lbs'];
        const result = input.map(unit => convertHandler.getUnit(unit));
        assert.sameDeepMembers(result, expect);
    });
    test('10_spellUnits', () => {
        const input = validUnits;
        const expect = ['gallons', 'liters', 'kilometers', 'miles', 'kilograms', 'pounds'];
        const result = input.map(unit => convertHandler.spellOutUnit(unit));
        assert.sameDeepMembers(result, expect);
    });
    // conversions
    test('11_galConversion', () => {
        const galToL = 3.78541;
        assert.equal(convertHandler.convert(1, 'gal'), galToL);
    });
    test('12_lConversion', () => {
        const lToGal = 0.26417;
        assert.equal(convertHandler.convert(1, 'L'), lToGal);
    });
    test('13_lbsConversion', () => {
        const lbsToKg = 0.45359;
        assert.equal(convertHandler.convert(1, 'lbs'), lbsToKg);
    });
    test('14_kgConversion', () => {
        const kgToLbs = 2.20462;
        assert.equal(convertHandler.convert(1, 'kg'), kgToLbs);
    });
    test('15_miConversion', () => {
        const miToKm = 1.60934;
        assert.equal(convertHandler.convert(1, 'mi'), miToKm);
    });
    test('16_kmConversion', () => {
        const kmToMi = 0.62137;
        assert.equal(convertHandler.convert(1, 'km'), kmToMi);
    });
});