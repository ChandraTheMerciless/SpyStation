'use strict';






//define dom object variables for code readability
var DomObj = {
    userInput: document.getElementById("secret-msg"),
    ringTone: document.getElementById("ringtone"),
    consoleContainer: document.getElementById("console-container"),
    msgStart: document.getElementById("msg-start")
};









var AppModule = function () {







    //handle user input to decide whether to send tweet or get tweet
    function handleInput(e) {
        var userInput = DomObj.userInput.value;
        var hashtagMsg = /^(#msg)[a-z]+$/;
        var getTweetPass = "decryptMsg";

        var strArray = userInput.split(",");
        console.log(strArray);

        var userPassword = strArray[0];
        var userReq = strArray[1];

        if ((e.keyCode === 13) && (userPassword.match(hashtagMsg))) {
            broadcastMsg(userPassword, userReq);
        } else if ((e.keyCode == 13) && (userPassword.match(getTweetPass))) {
            decodeMsg(userPassword, userReq);
        }
    };







    function broadcastMsg(userPassword, userReq) {
        var originalMsg = userReq || "";
        var code = Cypher.encodeAlph(originalMsg);
        var codeStr = code.toString();

        // DomObj.ringTone.play();
        //
        // DomObj.ringTone.addEventListener('ended', function () {
        //     responsiveVoice.speak(codeStr, "UK English Male",
        //         {
        //             //rate: 0.8,
        //             //pitch: 1
        //         });
        // });

        //tweets going to server should be in json format
        var tweet = {
            status: userPassword + " " + codeStr
        };

        var test = sendAjaxReq(tweet, "sending");
    }







    function decodeMsg(userPassword, userReq) {
        var searchTweets = userReq.trim() || "";

        //when I get array from twitter, run it through this
        sendAjaxReq(searchTweets, "getting");
    }









    //define xhr request object before deciding whether to make get or post
    function sendAjaxReq(request, reqType) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    var response = xhr.responseText || "";
                    pushTextToConsole(response);
                }
                else if (xhr.status == 400) {
                    console.log('There was an error 400');
                }
                else {
                    console.log('something else other than 200 was returned');
                }
            }
        };

        if (reqType == "sending") {
            sendTweet(xhr, request);
            pushTextToConsole("")
        } else if (reqType == "getting") {
            var data = getTweet(xhr, request);
        }
    };







    function sendTweet(xhr, tweet) {
        xhr.open('POST', '/api/sendTweet', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(tweet));
    };







    function getTweet(xhr, hashtagPw) {
        var url = '/api/getTweet?q=' + hashtagPw;
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(hashtagPw));
    };






    function pushTextToConsole(response) {
        var element = DomObj.consoleContainer;
        var msgInput = DomObj.msgStart;

        var paraConfirm = document.createElement("p");
        var nodeConfirm = document.createTextNode("Request sent.");
        paraConfirm.appendChild(nodeConfirm);
        element.insertBefore(paraConfirm, msgInput);

        //if response of tweet text was returned from server request
        if (response.trim().length > 0) {
            response = response.split(" ");
            //removes hashtag code, which is first item of array
            response.shift();
            response = response.join();

            response = Cypher.decodeAlph(response);
            var paraCode = document.createElement("p");
            var nodeCode = document.createTextNode("> > > > > > > > " + response);
            paraCode.appendChild(nodeCode);
            element.insertBefore(paraCode, msgInput);
        }

        var paraInstruc = document.createElement("p");
        var nodeInstruc = document.createTextNode("What is your next request?");
        paraInstruc.appendChild(nodeInstruc);
        element.insertBefore(paraInstruc, msgInput);

        DomObj.userInput.value = "";
    };









  //the only function we need to access these jobs
    return {
        handleInput: handleInput
    };






}();






DomObj.userInput.addEventListener("keydown", AppModule.handleInput);
