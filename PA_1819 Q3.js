// QUESTION 3

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
// TASK 3A(I)
//===============================================================
function count_lower_neighbors(emap, r, c) {
    const m = array_length(emap);
    const n = array_length(emap[0]);
    const possible_moves = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    if (r === 0 || c === 0 || r >= m-1 || c >= n-1){
        //display("r is "+ stringify(r));
        return 0;
    }
    let num = 0;
    for (let i = 0; i < array_length(possible_moves); i = i + 1){
        const new_r = r + possible_moves[i][0];
        const new_c = c + possible_moves[i][1];
        
        if ((0 <= new_r && new_r < m ) && (0 <= new_c && new_c < n)){
            //display_list(pair(new_r,new_c));
            if (emap[new_r][new_c] < emap[r][c]){
                num = num + 1;
            }
        }
    }
    //display(num);
    return num;
    // WRITE HERE.

}
//display("ans is " + stringify(count_lower_neighbors([[2,3,4],[3,5,3],[4,3,2]],1,1)));

// TASK 3A(I) TESTS
const emapA1 =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]];
assert("3A(I)_1", () => count_lower_neighbors([[5]], 0, 0), 0, []);
assert("3A(I)_2", () => count_lower_neighbors(emapA1, 0, 0), 0, []);
assert("3A(I)_3", () => count_lower_neighbors(emapA1, 5, 4), 0, []);
assert("3A(I)_4", () => count_lower_neighbors(emapA1, 4, 6), 0, []);
assert("3A(I)_5", () => count_lower_neighbors(emapA1, 1, 1), 1, []);
assert("3A(I)_6", () => count_lower_neighbors(emapA1, 2, 2), 8, []);
assert("3A(I)_7", () => count_lower_neighbors(emapA1, 2, 3), 5, []);
assert("3A(I)_8", () => count_lower_neighbors(emapA1, 4, 4), 6, []);


//===============================================================
// TASK 3A(II)
//===============================================================
function count_peaks(emap) {
    let count = 0;
    const m = array_length(emap);
    const n = array_length(emap[0]);
    
    for(let i = 0 ; i < m; i = i + 1){
        for (let j = 0; j < n; j = j + 1){
            //display(emap[i][j]);
            if (count_lower_neighbors(emap, i, j) === 8){
                count = count + 1;
            }
        }
    }
    display(count);
    return count;

    // WRITE HERE.

}


// TASK 3A(II) TESTS
const emapA2a =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]]; // 3 peaks
const emapA2b =
[[3, 1, 4, 1, 5, 1, 6, 1],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 7, 1, 8, 1, 9, 1, 0],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [2, 1, 3, 1, 4, 1, 5, 2],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 9, 1, 8, 1, 7, 1, 6],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [8, 1, 9, 1, 8, 1, 9, 1]]; // 9 peaks
assert("3A(II)_1", () => count_peaks([[5]]),
    0, ["count_lower_neighbors"]);
assert("3A(II)_2", () => count_peaks([[2,3,4],[3,5,3],[4,3,2]]),
    1, ["count_lower_neighbors"]);
assert("3A(II)_3", () => count_peaks(emapA2a),
    3, ["count_lower_neighbors"]);
assert("3A(II)_4", () => count_peaks(emapA2b),
    9, ["count_lower_neighbors"]);


//===============================================================
// TASK 3B
//===============================================================
function count_islands(emap) {
    const m = array_length(emap);
    const n = array_length(emap[0]);
    let islands = 0;
    function bfs(map,i,j){
        if ((0 <= i && i < m ) && (0 <= j && j < n)){
            if (map[i][j] !== 0 && map[i][j] !== "#"){//unexplored
                map[i][j] = "#";
                return 1 + bfs(map, i + 1,j) + bfs(map, i - 1,j) + 
                           bfs(map, i ,j + 1) + bfs(map, i,j - 1);
            
            
            }
            else{
                return 0;
                
            }
        }
        return 0;

    }
    for(let i = 0 ; i < m; i = i + 1){
        for (let j = 0; j < n; j = j + 1){
            //display(emap[i][j]);
            let count = bfs(emap, i, j);
            if (count > 0){
                islands = islands + 1;
            }
        }
    }
    return islands;
    // WRITE HERE.

}


// TASK 3B TESTS
const emapB1 =
[[2, 1, 0, 2, 1, 1, 3],
 [0, 1, 0, 1, 0, 0, 2],
 [0, 0, 0, 2, 3, 1, 1],
 [1, 0, 2, 0, 0, 0, 0],
 [0, 0, 1, 2, 0, 0, 0],
 [1, 0, 3, 0, 1, 1, 2]]; // 6 islands
const emapB2 =
[[1, 2, 0, 0, 1, 0, 0, 1],
 [1, 2, 2, 3, 1, 0, 2, 1],
 [0, 1, 1, 0, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 3, 3, 0],
 [1, 1, 2, 0, 0, 0, 0, 0],
 [1, 0, 1, 0, 0, 1, 2, 3],
 [1, 3, 2, 1, 1, 0, 1, 1]]; // 5 islands
assert("3B_1", () => count_islands([[0]]), 0, []);
assert("3B_2", () => count_islands([[1]]), 1, []);
assert("3B_3", () => count_islands([[0,0], [0,0]]), 0, []);
assert("3B_4", () => count_islands([[2,1], [1,3]]), 1, []);
assert("3B_5", () => count_islands([[0,1], [0,0]]), 1, []);
assert("3B_6", () => count_islands([[2,0], [0,1]]), 2, []);
assert("3B_7", () => count_islands(emapB1), 6, []);
assert("3B_8", () => count_islands(emapB2), 5, []);


//===============================================================
