// QUESTION 2

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================



//===============================================================
// DO NOT REMOVE OR MODIFY THE FOLLOWING FUNCTIONS.
// You may call them in your functions.
//===============================================================
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
//---------------------------------------------------------------
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
//---------------------------------------------------------------
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
//---------------------------------------------------------------
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
//---------------------------------------------------------------
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//---------------------------------------------------------------
// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
//---------------------------------------------------------------
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"
//===============================================================
// DO NOT REMOVE OR MODIFY THE ABOVE FUNCTIONS.
//===============================================================



//===============================================================
// TASK 2A
//===============================================================
function build_largest_int(digits) {
    let st = "";
    let ans = copy_array(digits);
    sort_ascending(ans);
    reverse_array(ans);
    //display(ans);
    for (let i = 0 ; i < array_length(ans) ; i = i + 1){
        st = st + stringify(ans[i]);
    }
    //display(st);
    return st;

}


// TASK 2A TESTS
assert("2A_1", () => build_largest_int([1]),
    "1", []);
assert("2A_2", () => build_largest_int([1,2,3,4,5]),
    "54321", []);
assert("2A_3", () => build_largest_int([9,8,7]),
    "987", []);
assert("2A_4", () => build_largest_int([4,1,9,1,4,9,1]),
    "9944111", []);
assert("2A_5", () => build_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "7555555555", []);
assert("2A_6", () => build_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", []);


//===============================================================
// TASK 2B
//===============================================================
function build_2nd_largest_int(digits) {
    if (array_length(digits) === 1){
        return stringify(digits[0]);
    }
    let st = "";
    let ans = copy_array(digits);
    sort_ascending(ans);
    reverse_array(ans);
    //display(ans);
    
    
    let index = array_length(digits) - 1;
    const smallest_digit = ans[index];
    let second_digit = ans[index];
    while (second_digit === smallest_digit && index >0){
        index = index - 1;
        second_digit = ans[index];
        
    }
    //display(index);
    
    const start = index;
    swap(ans,start,index+1);
    for (let i = 0 ; i < array_length(ans) ; i = i + 1){
        st = st + stringify(ans[i]);
    }
    //display(st);
    return st;
    
    //return null;
    
    // WRITE HERE.

}
//display(build_2nd_largest_int([1]));


// TASK 2B TESTS
assert("2B_1", () => build_2nd_largest_int([1]),
  "1", ["build_largest_int"]);

assert("2B_2", () => build_2nd_largest_int([1,2,3,4,5]),
    "54312", ["build_largest_int"]);
assert("2B_3", () => build_2nd_largest_int([9,8,7]),
    "978", ["build_largest_int"]);
assert("2B_4", () => build_2nd_largest_int([4,1,9,1,4,9,1]),
    "9941411", ["build_largest_int"]);
assert("2B_5", () => build_2nd_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "5755555555", ["build_largest_int"]);
assert("2B_6", () => build_2nd_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", ["build_largest_int"]);


//===============================================================
// TASK 2C
//===============================================================
function build_nth_largest_int(digits, n) {

    // WRITE HERE.

}


// TASK 2C TESTS
assert("2C_1", () => build_nth_largest_int([1,2,4,3], 1),
    "4321", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_2", () => build_nth_largest_int([3,1,4,2], 2),
    "4312", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_3", () => build_nth_largest_int([3,1,4,2], 10),
    "3214", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_4", () => build_nth_largest_int([1,3,4,2], 18),
    "2134", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_5", () => build_nth_largest_int([3,1,4,2], 24),
    "1234", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_6", () => build_nth_largest_int([4,3,2,1], 28),
    "1234", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_7", () => build_nth_largest_int([5,3,7], 1),
    "753", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_8", () => build_nth_largest_int([3,5,7], 4),
    "537", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_9", () => build_nth_largest_int([5,3,7], 6),
    "357", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_10", () => build_nth_largest_int([5,3,7], 10),
    "357", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_11", () => build_nth_largest_int([5], 10),
    "5", ["build_largest_int", "build_2nd_largest_int"]);


//===============================================================
