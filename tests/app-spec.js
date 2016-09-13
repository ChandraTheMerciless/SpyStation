'use strict';

describe('App', function(){
    var DomObj;

    beforeEach(function(){
        DomObj = {
            userInput: {
                value: ""
            }
        };
    });

    it('should exist', function(){
        expect(AppModule.handleInput).toBeDefined();
    });
});