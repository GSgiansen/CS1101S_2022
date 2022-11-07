const robotA = pair("ModelA", pair(5, 11)); // 5 dollars, quality 11
const robotB = pair("ModelB", pair(4, 8)); // 4 dollars, quality 8
const robotC = pair("ModelC", pair(6, 20)); // 6 dollars, quality 20
const n = 4;
const budget = 21; // optimal: C, C, A, B -> 20 + 20 + 11 + 8 = 59
const robot_list = list(robotA, robotB, robotC);

function optimal_robot_choice_quality(robot_list, budget, n) {
    return 0;
}

// Please write abstractions!
function get_price(robot) {
    return 0;
}

function get_quality(robot) {
    return 0;
}

optimal_robot_choice_quality(robot_list, budget, n); // 59

