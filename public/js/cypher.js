'use strict';

var Cypher = (function () {
    function createAlph() {
        var alph = [];
        for (var i = 0; i < 26; i++) {
            var char = String.fromCharCode(97 + i);
            alph.push(char);
        }

        return alph;
    }


    function createFullArray() {
        var allChars = createAlph();
        allChars.push(String.fromCharCode(32));
        for (var i = 0; i <= 9; i++) {
            var char = String.fromCharCode(48 + i);
            allChars.push(char);
        }

        return allChars;
    }

    function createEncodingArray() {
        var encode = createFullArray();
        for (var i = 0; i < 10; i++) {
            encode.push(encode.shift());
        }

        return encode;
    }

    function encodeAlph(msg) {
        msg = msg.toLowerCase();

        var originalString = [];
        var originalArr = createFullArray();

        var encodedString = [];
        var encodingArr = createEncodingArray();


        for (var i = 0; i < msg.length; i++) {
            //console.log(msg[i]);
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

        storeMsg(encodedString);
        return encodedString;
    }

    function storeMsg(encodedString) {
        localStorage.setItem("msg", encodedString);
    }

    function decodeAlph() {
        //Right now I'm "decoding" this by running it through the encoding array and concatenating the alph value.
        // There has to be a better way to do this, though

        var decodedMsg = "";

        var originalArr = createFullArray();

        var encodedArr = createEncodingArray();

        var encodedString = [3, 31, 11, 31, 7];

        for (var i = 0; i < encodedString.length; i++) {
            var temp;
            temp = encodedString[i] + 10;
            if (temp > 37) {
                temp = temp - 37;
            }
            decodedMsg += originalArr[temp];
        }

        console.log(decodedMsg);
        return decodedMsg;
    }

    return {
        encodeAlph: encodeAlph
    }
})();