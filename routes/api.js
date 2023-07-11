'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    
    const { input } = req.query;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    let string;

    if (!initNum && !initUnit) {
      string = 'invalid number and unit';
      res.json(string);
    } else if (!initNum) {
      string = 'invalid number';
      res.json(string);
    } else if (!initUnit) {
      string = 'invalid unit';
      res.json(string);
    } else {
      string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    }
  });
};
