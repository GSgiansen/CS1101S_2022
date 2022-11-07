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


//for array extensions
function get_suspects(all_students, custodian) {
    let grey = [custodian];
    let black = [];
    while (array_length(grey) > 0) {
        const curr = grey[0];
        grey = remove_elem(grey, 0);
        const neighbours = tail(curr);
        for (let i = 0; i < array_length(neighbours); i = i + 1) {
            if (!in_array(neighbours[i], grey) && !in_array(neighbours[i], black)) {
                grey[array_length(grey)] = neighbours[i];
            }
        }
        black[array_length(black)] = curr;
    }
    const result = [];
    for (let i = 0; i < array_length(black); i = i + 1) {
        result[i] = head(black[i]);
    }
    return result;
}

function remove_elem(arr, index) {
    const new_arr = [];
    for (let i = 0; i < index; i = i + 1) {
        new_arr[array_length(new_arr)] = arr[i];
    }
    for (let i = index + 1; i < array_length(arr); i = i + 1) {
        new_arr[array_length(new_arr)] = arr[i];
    }
    return new_arr;
}

function in_array(elem, arr) {
    for (let i = 0; i < array_length(arr); i = i + 1) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

get_suspects(students, custodian); // ["Betty", "Cindy", "Dylan"] in any order
