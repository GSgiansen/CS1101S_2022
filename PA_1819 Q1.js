// QUESTION 1

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
// TASK 1A
//===============================================================
function make_big_int_from_number(num) {
    let ans = null;
    // WRITE HERE.
    while (num >= 10){
        //display(ans);
        ans = append(ans,(list(num%10)));
        //display_list(ans);
        num = math_floor(num/10);
        //display("nums is now "+ stringify(num));
    }
    return append(ans,list(num));

}


// TASK 1A TESTS
assert("1A_1", () => make_big_int_from_number(0),
    list(0), []);
assert("1A_2", () => make_big_int_from_number(5),
    list(5), []);
assert("1A_3", () => make_big_int_from_number(10),
    list(0,1), []);
assert("1A_4", () => make_big_int_from_number(1234),
    list(4,3,2,1), []);
assert("1A_5", () => make_big_int_from_number(9876543210),
    list(0,1,2,3,4,5,6,7,8,9), []);


//===============================================================
// TASK 1B
//===============================================================
function big_int_to_string(bint) {
    let ans = "";
    while (!is_null(bint)){
        ans = stringify(head(bint)) + ans ;
        bint = tail(bint);
    }
    return ans;
    // WRITE HERE.

}


// TASK 1B TESTS
assert("1B_1", () => big_int_to_string(list(0)),
    "0", []);
assert("1B_2", () => big_int_to_string(list(5)),
    "5", []);
assert("1B_3", () => big_int_to_string(list(0,1)),
    "10", []);
assert("1B_4", () => big_int_to_string(list(4,3,2,1)),
    "1234", []);
assert("1B_5", () => big_int_to_string(list(0,1,2,3,4,5,6,7,8,9)),
    "9876543210", []);
assert("1B_6", () => big_int_to_string(
    list(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9)),
    "9876543210987654321", []);


//===============================================================
// TASK 1C
//===============================================================
function big_int_add(bintX, bintY) {
    // You may modify the given partial implementation,
    // or remove it and write your own.

    function add(x, y, carry) {
        //display_list(x);
        if (is_null(x) && is_null(y)) {
            return (carry === 0) ? null : pair(carry, null);
        } else {
            if (is_null(x)){
                if (carry + head(y) >= 10){
                    return pair((carry+head(y))%10,add(x,tail(y),math_floor((carry+head(y))/10)));
                }
                return pair(carry + head(y) ,tail(y));
            }
            else if (is_null(y)){
                if (carry + head(x) >= 10){
                    return pair((carry+head(x))%10,add(tail(x),y,math_floor((carry+head(x))/10)));
                }
                return pair(carry + head(x) ,tail(x));
            }
            else{
                let ix = head(x);
                let iy = head(y);
                let sum = ix + iy + carry;
                let forward = sum % 10;
                return pair(forward, add(tail(x),tail(y), math_floor(sum / 10)));               
            }
            // WRITE HERE.
            

        }
    }
    //display(add(bintX, bintY, 0));
    return add(bintX, bintY, 0);
}


// TASK 1C TESTS
assert("1C_1", () => big_int_add(list(0), list(3,2,1)),
    list(3,2,1), ["make_big_int_from_number"]);
assert("1C_2", () => big_int_add(list(5,6,7), list(0)),
    list(5,6,7), ["make_big_int_from_number"]);
assert("1C_3", () => big_int_add(list(4,3,2,1), list(5,4,3,2)),
    list(9,7,5,3), ["make_big_int_from_number"]);
assert("1C_4", () => big_int_add(list(7,8,9), list(5,6)),
    list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_5", () => big_int_add(list(5,6), list(7,8,9)),
    list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_6", () => big_int_add(
    list(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9), list(5)),
    list(4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
    ["make_big_int_from_number"]);


//===============================================================
// TASK 1D
//===============================================================
function big_int_mult_by_digit(bint, digit) {
    if (digit === 0){
        return list(0);
    }
    // WRITE HERE.
    function helper(num,carry){
        //display(num);
        //display("carry is now "+ stringify(carry));
        if (is_null(num)){
            return carry === 0 ? null : pair(carry,null);
        }
        else{
            let temp = head(num) * digit + carry;
            let forward = math_floor(temp/10);
            if (temp % 10 === 0){
                return pair(0,helper(tail(num),forward));
            }
            return pair(temp % 10, helper(tail(num),forward));
        }
    }
    let ans = helper(bint,0);
    if (ans === null){
        return list(0);
    }
    //display_list(ans);
    return ans;

}
//display(big_int_mult_by_digit(list(7,8,9),5));

// TASK 1D TESTS
assert("1D_1", () => big_int_mult_by_digit(list(0), 5),
    list(0), ["make_big_int_from_number", "big_int_add"]);
assert("1D_2", () => big_int_mult_by_digit(list(7,4,3), 0),
    list(0), ["make_big_int_from_number", "big_int_add"]);
assert("1D_3", () => big_int_mult_by_digit(list(7,4,3), 5),
    list(5,3,7,1), ["make_big_int_from_number", "big_int_add"]);
assert("1D_4", () => big_int_mult_by_digit(
    list(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9), 3),
    list(3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,2),
    ["make_big_int_from_number", "big_int_add"]);

//===============================================================
// TASK 1E
//===============================================================
function big_int_mult_by_10_pow_n(bint, n) {
    //display(math_pow(10,n));
    //n-1is the number of 0s to add in front
    // WRITE HERE.
    if (length(bint) === 1 && head(bint) === 0){
        return list(0);
    }
    let ans = append(build_list(x => 0,n),bint);
    //display_list(ans);
    return ans;
}


// TASK 1E TESTS
assert("1E_1", () => big_int_mult_by_10_pow_n(list(0), 5),
    list(0),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_2", () => big_int_mult_by_10_pow_n(list(7,4,3), 0),
    list(7,4,3),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_3", () => big_int_mult_by_10_pow_n(list(7,4,3), 3),
    list(0,0,0,7,4,3),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_4", () => big_int_mult_by_10_pow_n(list(5,8,3,1), 20),
    list(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,8,3,1),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
/*
display(big_int_mult_by_digit(list(7,8,9),6));
display(big_int_mult_by_10_pow_n(big_int_mult_by_digit(list(7,8,9),6),1));
display(big_int_mult_by_10_pow_n(list(5,3,9,4),2));
display(big_int_add(big_int_mult_by_digit(list(7,8,9),6),big_int_mult_by_10_pow_n(list(5,3,9,4),2)));
*/
display(big_int_mult_by_digit(list(7, 8, 9),3));
//===============================================================
// TASK 1F
//===============================================================
function big_int_mult(bintX, bintY) {
    const n = length(bintY);
    function helper(x,y){
        ///display("y is " + stringify(y));
        if (is_null(tail(y))){
            let ans = big_int_mult_by_digit(x,head(y));
            ans = big_int_mult_by_10_pow_n(ans,n-length(y));
            //display_list(ans);
            return ans;
        }
        const current_digit_y = head(y);
        const length_y = n - length(y) ;
        const a = big_int_mult_by_digit(x,current_digit_y);
        //display_list(a);
        const b = big_int_mult_by_10_pow_n(a,length_y);
        //display_list(b);
        return big_int_add(b,helper(x,tail(y)));        
    }

    //return big_int_add(b,big_int_mult(bintX, tail(bintY)));

    // WRITE HERE.
    let ans = helper(bintX,bintY);
    //display_list(ans);
    return ans;

}
//display(big_int_mult_by_digit(list(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),7));
//display(big_int_add(list(0, 5, 3, 9, 4),list(2, 2, 9, 5)));


// TASK 1F TESTS

assert("1F_1", () => big_int_mult(list(0), list(0)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_2", () => big_int_mult(list(0), list(3,2,1)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_3", () => big_int_mult(list(3,2,1), list(0)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_4", () => big_int_mult(list(3,2,1), list(1)),
    list(3,2,1),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_5", () => big_int_mult(list(9), list(6)),
    list(4,5),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_6", () => big_int_mult(list(7,8,9), list(5,6)),
    list(5,5,1,4,6),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);


assert("1F_7", () => big_int_mult(
    list(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1), list(7,8,9)),
    list(7,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,9),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);


//===============================================================
