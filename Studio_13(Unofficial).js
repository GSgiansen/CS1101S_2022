const robotA = pair("ModelA", pair(5, 11)); // 5 dollars, quality 11
const robotB = pair("ModelB", pair(4, 8)); // 4 dollars, quality 8
const robotC = pair("ModelC", pair(6, 20)); // 6 dollars, quality 20
const n = 4;
const budget = 21; // optimal: C, C, A, B -> 20 + 20 + 11 + 8 = 59
const robot_list = list(robotA, robotB, robotC);
//buy the mst out of rhe best qualirtty
function optimal_robot_choice_quality(robot_list, budget, n) {
    if (budget < 0 ){
        return -Infinity;
        
    }
    if (n === 0){
        return 0;
    }
    else if(is_null(robot_list)){
        return -Infinity;
    }
    else{
        const one_price = get_price(head(robot_list));
        const one_quality = get_quality(head(robot_list));
        const a = one_quality + optimal_robot_choice_quality(robot_list, budget - one_price, n-1);
        const b = optimal_robot_choice_quality(tail(robot_list), budget, n);
        return math_max(a,b);
    }
}

// Please write abstractions!
function get_price(robot) {
    return head(tail(robot));
}

function get_quality(robot) {
    return tail(tail(robot));
}

optimal_robot_choice_quality(robot_list, budget, n); // 59

