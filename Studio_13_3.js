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
    // You don't actually need an array for white
    let queue = list();
    function copy_arr(arr){
        let res = [];
        for(let i = 0; i< array_length(arr); i = i +1){
            res[i] = arr[i];
        }
        return res;
    }
    
    function enqueue(x) {
        queue = append(queue, list(x));
    }
    
    function dequeue() {
        if (is_null(queue)) {
            error("dequeue() cannot be done on a queue of size 0.");
        }
        
        const ans = head(queue);
        queue = tail(queue);
        return ans;
    }
}

get_suspects(students, custodian); // ["Betty", "Cindy", "Dylan"] in any order
