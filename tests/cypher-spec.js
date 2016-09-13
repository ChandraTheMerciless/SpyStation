'use strict';

describe('Cypher', function(){
    var message, numArray, stringArray;

    beforeEach(function(){
        message = "never gonna give you up";
        numArray = [6, 34, 14, 34, 10, 19, 36, 7, 6, 6, 30, 19, 36, 1, 14, 34, 19, 17, 7, 13, 19, 13, 8];
        stringArray = "6, 34, 14, 34, 10, 19, 36, 7, 6, 6, 30, 19, 36, 1, 14, 34, 19, 17, 7, 13, 19, 13, 8";
    });

    it('should convert a string into an array of numbers', function(){
        var arrayTest = Cypher.encodeAlph(message);

        expect(arrayTest).toEqual(numArray);
    });

    it('should convert an array of numbers into a string', function(){
        var stringTest = Cypher.decodeAlph(stringArray);

        expect(stringTest).toEqual(message);
    })
});