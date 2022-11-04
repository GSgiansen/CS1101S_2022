// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 3A
////////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {
    function lookup(sym){
        return sym === "+"
               ? (x,y) => x+y
               : sym === "-"
                 ? (x,y) => x-y
                 : sym === "*"
                   ? (x,y) => x * y
                   : sym === "/"
                     ? (x,y) => x/y
                     : "UNKNOWN OPERATOR PLS GIVE UP";
    }
    // WRITE HERE.
    if (is_number(bae_tree)){
        return bae_tree;
    }
    
    else if (is_string(bae_tree)){
        //display(bae_tree);
        return lookup(bae_tree);
    }

    else if (is_list(bae_tree)){
        return evaluate_BAE_tree(list_ref(bae_tree,1))
               (evaluate_BAE_tree(list_ref(bae_tree,0)),evaluate_BAE_tree(list_ref(bae_tree,2)));
    }
    

}



////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////
//implement a stack adt to keep aadding, then keep popping until ) spotted
function push(elem,stack){ 
    return append(stack,list(elem));//returns back updated stack 
} 
function pop(stack){ 
    const n = length(stack) - 1; 
    const elem = list_ref(stack,n); 
    let copy = null; 
    for (let i = 0; i < n; i = i + 1){ 
        copy = append(copy,list(list_ref(stack,i))); 
         
    } 
    return pair(elem,copy);//returns a pair where the head is the element to be popped and coppy of stack 
     
} 
function build_BAE_tree(bae_list) { 
    if (length(bae_list) === 1){ 
        return head(bae_list); 
    } 
    let index = 0; 
    let stack = null; 
    while (index < length(bae_list) ){ 
        //display_list(stack); 
        const curr = list_ref(bae_list,index); 
        if (curr !== ")"){ 
            //display("hi"); 
            stack = push(curr,stack); 
            //display_list(stack); 
            index = index + 1; 
        } 
        else{ 
            let cut = "a"; 
            let formed_bae = null; 
            while (cut !== "("){ 
                const modified = pop(stack); 
                const elem = head(modified); 
                stack = tail(modified); 
                if (elem !== "("){ 
                    formed_bae = pair(elem,formed_bae); 
                } 
                cut = elem; 
 
                //display_list(formed_bae); 
            } 
              
            const e = formed_bae; 
            //display(e); 
            stack = push(e,stack); 
            index = index + 1; 
     
        } 
    } 
    return head(stack); 
 
}


const bae_tree = list(5, "*", list(7, "+", 3));

////////////////////////////////////////////////////////////
// Question 3C
////////////////////////////////////////////////////////////

function evaluate_BAE(bae_list) {
    const bae = build_BAE_tree(bae_list);
    // WRITE HERE.
    return evaluate_BAE_tree(bae);

}



////////////////////////////////////////////////////////////
// Question 3D
////////////////////////////////////////////////////////////

function check_parentheses(paren_list) {
    if (is_null(paren_list)){
        return true;
    }
    let stack = null;
    let index = 0;
    while (index < length(paren_list)){
        //display_list(stack);
        const curr = list_ref(paren_list,index);
        if (curr === "("){
        
            stack = push(curr,stack);
        }
        else if (curr === ")"){
            
            const temp = pop(stack);
            const elem = head(temp);
            while (elem !== "("){
                const temp = pop(stack);
                const elem = head(temp);
                stack = tail(temp);
            }
            //stack = tail(temp);
        }
        index = index + 1;
    }
    if (length(stack) !== 0){
        return true;
    }
    else{
        return false;
    }
}
    // WRITE HERE.



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


//===========================================================
// This function is provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===========================================================
function assert(f, test_name, fnames) {
    display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================



////////////////////////////////////////////////////////////
// Test Cases for Q3A
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_tree = 23;
        return equal(evaluate_BAE_tree(bae_tree), 23);
    },
    "Q3A-T1",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", 6);
        return equal(evaluate_BAE_tree(bae_tree), 30);
    },
    "Q3A-T2",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 50);
    },
    "Q3A-T3",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 60);
    },
    "Q3A-T4",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(20, "/", 2), "-", 2), "*",
                            list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 80);
    },
    "Q3A-T5",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = 100;
        return equal(evaluate_BAE_tree(bae_tree), 100);
    },
    "Q3A-T6",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(70, "-", 15);
        return equal(evaluate_BAE_tree(bae_tree), 55);
    },
    "Q3A-T7",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(7, "+", 5), "*", 3), "/",
                            list(list(20, "/", 2), "-", list(100, "-", 94)));
        return equal(evaluate_BAE_tree(bae_tree), 9);
    },
    "Q3A-T8",
    ['evaluate_BAE_tree']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3B
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_tree = 23;
        const bae_list = list(23);
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T1",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", 6);
        const bae_list = list("(", 5, "*", 6, ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T2",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", list(7, "+", 3));
        const bae_list = list("(", 5, "*", "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T3",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
        const bae_list = list("(", "(", 8, "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T4",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(20, "/", 2), "-", 2), "*",
                            list(7, "+", 3));
        const bae_list = list("(", "(", "(", 20, "/", 2, ")", "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T5",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = 100;
        const bae_list = list(100);
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T6",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(70, "-", 15);
        const bae_list = list("(", 70, "-", 15, ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T7",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(7, "+", 5), "*", 3), "/",
                            list(list(20, "/", 2), "-", list(100, "-", 94)));
        const bae_list = list("(", "(", "(", 7, "+", 5, ")", "*", 3, ")", "/",
                            "(", "(", 20, "/", 2, ")", "-",
                                 "(", 100, "-", 94, ")", ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T8",
    ['build_BAE_tree']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3C
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_list = list(23);
        return equal(evaluate_BAE(bae_list), 23);
    },
    "Q3C-T1",
    ['evaluate_BAE']
);

assert(
    () => {
        const bae_list = list("(", 5, "*", 6, ")");
        return equal(evaluate_BAE(bae_list), 30);
    },
    "Q3C-T2",
    ['evaluate_BAE']
);

assert(
    () => {
        const bae_list = list("(", "(", "(", 20, "/", 2, ")", "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(evaluate_BAE(bae_list), 80);
    },
    "Q3C-T3",
    ['evaluate_BAE']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3D
////////////////////////////////////////////////////////////

assert(
    () => {
        const paren_list = list();
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T1",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T2",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", "(", ")", ")",
                                   "(", "(", ")", "(", ")", ")", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T3",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list(")", "(");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T4",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", ")", ")", ")", "(", "(", ")");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T5",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", ")", "(");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T6",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", ")", "(", ")", "(", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T7",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", "(", ")", ")",
                                   "(", "(", ")", ")", ")", ")", ")");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T8",
    ['check_parentheses']
);
