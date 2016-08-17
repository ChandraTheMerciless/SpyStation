'use strict';

var DomObj = {
    userInput: document.getElementById("secret-msg"),
    ringTone: document.getElementById("ringtone")
};

var AppModule = function () {

    function speakMsg(e) {
        if (e.keyCode == 13) {

            var code = Cypher.encodeAlph(DomObj.userInput.value);


            var codeStr = code.toString();

            //DomObj.ringTone.play();

            //DomObj.ringTone.addEventListener('ended', function () {
            responsiveVoice.speak(codeStr, "UK English Male",
                {
                    //rate: 0.8,
                    //pitch: 1
                });
            //});

            //send this to server with url 'statuses/update'
            var tweet = {
                status: "#secretcode " + codeStr
            };

            pushTextToConsole();
            var test = sendAjaxReq(tweet);
            console.log(test);
        }
    };

    function pushTextToConsole() {
        var element = document.getElementById("console-container");
        var msgInput = document.getElementById("msg-start");

        var paraConfirm = document.createElement("p");
        var nodeConfirm = document.createTextNode("Message sent.");
        paraConfirm.appendChild(nodeConfirm);
        element.insertBefore(paraConfirm, msgInput);

        var paraInstruc = document.createElement("p");
        var nodeInstruc = document.createTextNode("What's your message?");
        paraInstruc.appendChild(nodeInstruc);
        element.insertBefore(paraInstruc, msgInput);
    };

    function sendAjaxReq(tweet) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    console.log(xhr.responseText);
                }
                else if (xhr.status == 400) {
                    console.log('There was an error 400');
                }
                else {
                    console.log('something else other than 200 was returned');
                }
            }
        };


        xhr.open('POST', '/api/code', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(tweet));
    };

    return {
        speakMsg: speakMsg
    };
}();


DomObj.userInput.addEventListener("keydown", AppModule.speakMsg);