const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // convert valid input, invalid unit, invalid number, invalid number and unit,
    // and noNumber unit using the api 
    test('01_convertValidInput', (done) => {
        chai.request(server)
            .keepOpen() // prevent chai-http to stop server for fCC testing
            .get('/api/convert/?input=10L')
            .end((err, res) => {
                assert.equal(res.text, 
                    '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}'
                );
                done();
            });
    });
    test('02_convertInvalidUnit', (done) => {
        chai.request(server)
            .keepOpen()
            .get('/api/convert/?input=1j')
            .end((err, res) => {
                assert.equal(res.text, '"invalid unit"');
                done();
            });
    });
    test('03_convertInvalidNumber', (done) => {
        chai.request(server)
            .keepOpen()
            .get('/api/convert/?input=1/7/2mi')
            .end((err, res) => {
                assert.equal(res.text, '"invalid number"');
                done();
            });
    });
    test('04_convertInvalidNumAndUnit', (done) => {
        chai.request(server)
            .keepOpen()
            .get('/api/convert/?input=1,8T')
            .end((err, res) => {
                assert.equal(res.text, '"invalid number and unit"');
                done();
            });
    });
    test('05_convertNoNumber', (done) => {
        chai.request(server)
            .keepOpen()
            .get('/api/convert/?input=lbs')
            .end((err, res) => {
                assert.equal(res.text, '{"initNum":1,"initUnit":"lbs","returnNum":0.45359,"returnUnit":"kg","string":"1 pounds converts to 0.45359 kilograms"}');
                done();
            });
    });
});
