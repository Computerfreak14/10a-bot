const path = require('path');

class HAMILTON {
    constructor() {
        this.description = 'Class to obtain Hamilton quotes';
        //Load the values from "quotes" array of the hamilton.json file as the "quotes" variable
        this.quotes = require(path.join(__dirname, 'hamilton.json')).quotes;
    }

    getrandomquote() {
        //Get a random quote from the quotes variable
        let index = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[index];
    }
}

module.exports = HAMILTON;