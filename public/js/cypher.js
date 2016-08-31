'use strict';

var Cypher = (function () {




  //creates array of alphabetical characters
    function createAlph() {
        var alph = [];
        for (var i = 0; i < 26; i++) {
            var char = String.fromCharCode(97 + i);
            alph.push(char);
        }

        return alph;
    }





  //adds digits to array of alphabetical characters
    function createFullArray() {
        var allChars = createAlph();
        allChars.push(String.fromCharCode(32));
        for (var i = 0; i <= 9; i++) {
            var char = String.fromCharCode(48 + i);
            allChars.push(char);
        }

        return allChars;
    }






   //creates Caesar cypher by removing first 7 elements
   //of full array and placing them at end
    function createEncodingArray() {
        var encode = createFullArray();
        for (var i = 0; i < 7; i++) {
            encode.push(encode.shift());
        }

        return encode;
    }






  //accepts user input and encodes msg to array of numbers
    function encodeAlph(msg) {
        msg = msg.toLowerCase();

        var originalString = [];
        var encodedString = [];

        var originalArr = createFullArray();
        var encodingArr = createEncodingArray();

        for (var i = 0; i < msg.length; i++) {
            var charOr = originalArr.indexOf(msg[i]);
            if (charOr < 0) {
                charOr = 99;
            }
            originalString.push(charOr);
        }

        for (var i = 0; i < msg.length; i++) {
            var charEn = encodingArr.indexOf(msg[i]);
            if (charEn < 0) {
                charEn = 99;
            }
            encodedString.push(charEn);
        }
        return encodedString;
    }






   //decodes an encoded array of numbers by passing them through
   //same group of arrays
    function decodeAlph(array) {
        var decodedMsg = "";

        var originalArr = createFullArray();

        var encodedNumberArray = array.split(",").map(function(item) {
            return parseInt(item, 10);
        });

        for (var i = 0; i < encodedNumberArray.length; i++) {
            var temp = encodedNumberArray[i] + 7;
            if (temp >= 37) {
                temp = temp - 37;
            }
            //temp element corresponds to numbers, which can be mapped to
            //encoding array to produce original message
            decodedMsg += originalArr[temp];
        }

        return decodedMsg;
    }





   //return two public functions
    return {
        encodeAlph: encodeAlph,
        decodeAlph: decodeAlph
    }




})();
