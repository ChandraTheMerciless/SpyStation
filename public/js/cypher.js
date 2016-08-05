'use strict';

var Cypher = {
    createAlph: function () {
        var alph = [];
        for (var i = 0; i < 26; i++) {
            var char = String.fromCharCode(97 + i);
            alph.push(char);
        }

        return alph;
    },

    createFullArray: function () {
        var allChars = this.createAlph();
        allChars.push(String.fromCharCode(32));
        for (var i = 0; i <= 9; i++) {
            var char = String.fromCharCode(48 + i);
            allChars.push(char);
        }

        return allChars;
    },

    createEncodingArray: function () {
        var encode = this.createFullArray();
        for (var i = 0; i < 10; i++) {
            encode.push(encode.shift());
        }

        return encode;
    },

    encodeAlph: function (msg) {
        msg = msg.toLowerCase();

        var originalString = [];
        var originalArr = this.createFullArray();

        var encodedString = [];
        var encodingArr = this.createEncodingArray();


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

        this.storeMsg(encodedString);
        return encodedString;
    },

    storeMsg: function(encodedString){
        localStorage.setItem("msg", encodedString);
    },

    decodeAlph: function () {
        //Right now I'm "decoding" this by running it through the encoding array and concatenating the alph value.
        // There has to be a better way to do this, though

        var decodedMsg = "";

        var originalArr = this.createFullArray();

        var encodedArr = this.createEncodingArray();

        var encodedString = [3, 31, 11, 31, 7];

        for(var i = 0; i < encodedString.length; i++){
            var temp;
            temp = encodedString[i] + 10;
            if(temp > 37){
                temp = temp - 37;
            }
            decodedMsg += originalArr[temp];
        }

        console.log(decodedMsg);
        return decodedMsg;
    }
};