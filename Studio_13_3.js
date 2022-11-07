const Aaron = pair("Aaron", []);
const Betty = pair("Betty", []);
const Cindy = pair("Cindy", []);
const Dylan = pair("Dylan", []);
const Ethan = pair("Ethan", []);

const students = [Aaron, Betty, Cindy, Dylan, Ethan];
const custodian = Betty;

// Betty gave the bot to Dylan
tail(Betty)[0] = Dylan; 
tail(Dylan)[0] = Betty; 

// Dylan gave the bot to Cindy
tail(Dylan)[1] = Cindy;
tail(Cindy)[0] = Dylan;

function get_suspects(all_students, custodian) {
    let grey = [custodian];
    let black = [];
    // You don't actually need an array for white
}

get_suspects(students, custodian); // ["Betty", "Cindy", "Dylan"] in any order
