//streams---------------------------------------------------------
function add_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1) + head(s2),
        () => add_streams(stream_tail(s1),stream_tail(s2)));
    }
    }
function mul_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1) * head(s2),() => mul_streams(stream_tail(s1),stream_tail(s2)));
    }
}
function scale_stream(s, f) {
    return stream_map(x => x * f, s);
}
const integers = integers_from(1);

function p_sums (integers){
    //display (integers);
    return pair(head(integers),
    () => add_streams (stream_tail (integers), p_sums (integers)));
}

function zip_list_of_streams_2(lst){
    return pair(head(head(lst)),
    () => zip_list_of_streams_2 (append(tail(lst),list (stream_tail (head(lst))))))
}

//sorting algorithms---------------------------------------------------------
function sort(lst) {
    function find_min(lst) {
        return accumulate((x, y) => x < y ? x : y,
                          head(lst),
                          tail(lst));
    }
    if (is_null(lst)) {
        return lst;
    }
    const min = find_min(lst);
    return pair(min, sort(remove(min, lst)));
}

function partition(xs, p) {
    // your answer here
    return pair(filter( x => x<=p, xs),filter( x => x>p, xs));
}


function quicksort(xs) {
    // your answer here
    if (is_null(xs) || is_null(tail(xs))){
        return xs;
    }
    else {
        const pivot = head(xs);
        const res = partition(tail(xs), pivot);
        const left = head(res);
        const right = tail(res);

        return append(quicksort(left),pair(pivot,quicksort(right)));
    }
}

//memoisation---------------------------------------------------------
let mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

//array helper---------------------------------------------------------
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}

function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}

function push(elem,stack){
    let len = array_length(stack);
    stack[len] = elem;
    return stack;

}
function pop(stack){
    //display(stack);
    let len = array_length(stack);
    let elem = stack[len-1];
    let newlst = [];
    for (let i = 0; i<len-1; i = i + 1){
        newlst[i] = stack[i];
    }

    return pair(elem,newlst);
}
function extend(xs,ys){
    let i = 0;
    let len_xs = array_length(xs);
    while (i < array_length(ys)){
        xs[i + len_xs] = ys[i];
        i = i + 1;
    }
    return xs;
}

//removing array
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

//checking if in array

function in_array(elem, arr) {
    for (let i = 0; i < array_length(arr); i = i + 1) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}


//tree ADT---------------------------------------------------------
function flatten(tree) {
    if (is_null(tree)) {
        return tree;
    }
    return accumulate((x, y) => is_pair(x)
                                ? append(flatten(x), y)
                                : pair(x, y),
                      null, 
                      tree);
}



//***************************HARD QUESTIONS************************

function rotate_matrix(M) {
    const m = array_length (M) ;
    const n = array_length(M[0]);

    //this is for TRANSPOSING
    for (let i = 0; i < m ; i = i + 1){
        for(let j = 0; j < n ; j = j + 1){
            const temp = M[i][j];
            M[i][j] = M[j][i];
            M[j][i] = temp;
        }
    }

    for (let i = 0; i < m ; i = i + 1){
        for (let j = 0; j = n/2 ; j = j + 1){
            const temp = M[i][j];
            M[i][j] = M[i][n-j-1];
            M[i][n-j-1] = temp;
        }
    }
    return M;



function count_pairs(x){//checking number of pairs in a list
    let pairs = null;
    function check(y){
        if (!is_pair(y)){
            return undefined
        }
        else if (!is_null(member(y,pairs))){
            return undefined;
        }
        else{
            pairs = pair(y,pairs);
            check(head(y));
            check(tail(y));
        }
    }
    check(x);
    return length(pairs);
}

function permutations(ys) {//returns the list based on sorted index if initial
    //input is the largest
    return is_null(ys)
        ? list(null)
        : accumulate(append, null,
            map(x => map(p => pair(x, p),
                         permutations(remove(x, ys))),
                ys));
}

function subsets(lst){
    if (is_null(lst)){
        return list(null);
    }
    else{
        const subsets_rest =  subsets(tail(lst));
        const x = head(lst);
        const has_x = map(ys => pair(x,ys), subsets_rest);
        return append(subsets_rest,has_x);
    }
}
function combination(lst, n) {
    if (is_null(lst) && n === 0) {
        return list(null);
    }
    if (n < 0 || is_null(lst)) {
        return null;
    }
    return append(map(x => pair(head(lst), x), 
                      combination(tail(lst), n - 1)), 
                  combination(tail(lst), n));
}

function permutate(lst, n) {
    const cur = combination(lst, n);
    return accumulate(append, 
                      null,
                      map(permutations, 
                          cur));
}

function remove_dup(lst){
    return accumulate((x,ys) => is_null(member(x,ys)) ? pair(x,ys) : ys, null,lst);
}


//example of wishful thinking
function makeup_amount(x,coins){
    if (x === 0 ) {
        return list(null);
    }
    else if (x < 0 || is_null(coins)){
        return null;
    }
    else{
        const a = makeup_amount(x,tail(coins));
        const b = makeup_amount(x-head(coins), tail(coins));
        const c = map(c => pair(head(coins),c) ,b);
        return append(a,c);
    }
}

function count_islands(emap) {//matrix bfs
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

function build_nth_largest_int(digits, n) {
    // WRITE HERE.
    // ---BEGIN TASK---
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }

    const S = copy_array(digits);
    const len = array_length(S);
    sort_ascending(S);
    reverse_array(S);
    const digit_lst = array_to_list(S);
    const perms = permutations(digit_lst);
    const nth_lst = list_ref(perms, math_min(length(perms), n) - 1);
    const nth = list_to_array(nth_lst);
    return digits_to_string(nth);
    // ---END TASK---

}
function check_parentheses(paren_list) {//more efficient way without using actl stack
    // WRITE HERE.

    function check(count, xs) {
        if (is_null(xs)) {
            return (count === 0);
        } else if (count < 0) {
            return false;
        } else if (head(xs) === "(") {
            return check(count + 1, tail(xs));
        } else { // (head(xs) === ")")
            return check(count - 1, tail(xs));
        }
    }

    return check(0, paren_list);
}

function all_different(nums) {//checking if the number is unique in list
    // WRITE HERE.
    if (is_null(nums)) {
        return true;
    } else {
        const head_is_unique = is_null(member(head(nums), tail(nums)));
        return head_is_unique && all_different(tail(nums));
    }
}

//example of accumulate using true && false
function is_dna_strand(xs) {
    // WRITE HERE.
    return accumulate((x, acc) => is_nucleobase(x) && acc,
                      true, xs);
}


// Task 3B: Optimized Smallest Bounding Rectangle
//===============================================================

const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);

function optimized_smallest_bounding_AAR_area(rs) {
    let max_longer = 0;
    let max_shorter = 0;

    for (let p = rs; !is_null(p); p = tail(p)) {
        const aar = head(p);
        const width = get_width(aar);
        const height = get_height(aar);
        const longer = math_max(width, height);
        const shorter = math_min(width, height);

        if (longer > max_longer) { max_longer = longer; } else { }
        if (shorter > max_shorter) { max_shorter = shorter; } else { }
    }
    return max_longer * max_shorter;
}



//===============================================================
// Task 3C: Overlapping Rectangles
//===============================================================

const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);


// SOLUTION 1
function overlap_area(aar1, aar2) {

    // [a, b] and [c, d] are the input intervals.
    function overlap_length(a, b, c, d) {//!!!key is here, can draw it out to visualise
        return math_max(0, math_min(b, d) - math_max(a, c));
    }

    const x_overlap = overlap_length(
                        get_x(aar1), get_x(aar1) + get_width(aar1),
                        get_x(aar2), get_x(aar2) + get_width(aar2));

    const y_overlap = overlap_length(
                        get_y(aar1), get_y(aar1) + get_height(aar1),
                        get_y(aar2), get_y(aar2) + get_height(aar2));

    return x_overlap * y_overlap;
}

function delta_decode(D) {

    function decode(xs, prev) {//example of parsing in changing values
        return is_null(xs)
            ? null
            : pair(prev + head(xs), decode(tail(xs), prev + head(xs)));
    }
    return decode(D, 0);
}

//example of using a stack without rly defining the stack ADT
function eval_postfix_exp(pfe) {
    let next = array_length(pfe) - 1;

    function evaluate() {
        const token = pfe[next];
        next = next - 1;
        if (is_number(token)) {
            return token;
        } else {
            const op = token;
            const right = evaluate();
            const left = evaluate();
            if (op === "+") {
                return left + right;
            } else if (op === "-") {
                return left - right;
            } else if (op === "*") {
                return left * right;
            } else {
                return left / right;
            }
        }
    }
    return evaluate();
}




//transversing matrix
function max_flies_to_eat(tile_flies) {
    const m = array_length(tile_flies);
    const n = array_length(tile_flies[0]);
    
    // *** Your answer here. ***
    function helper(i,j){
        //display(i);
        if (i < 0 || i >= m  || j < 0 || j >= n){
            return 0;
        }
        else{
            //display(tile_flies[i+1][j-1]);
            return tile_flies[i][j] + math_max(helper(i+1,j), helper(i+1,j+1),helper(i+1,j-1));
        }
    }
    let mini = 0;
    for (let i = 0; i<n; i = i + 1){

        mini = math_max(mini,helper(0,i));
    }
    return mini;

}

//typical BFS algo
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
