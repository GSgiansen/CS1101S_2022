////////////////////////////////////////////////////////////////////////////////
// FIRST PART //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function is_battery_pack_dying(log) {
    function helper(...) {
        
    }
    return helper(...);
}

function is_B(string) {
    return string === "B";
}

function is_A(string) {
    return string === "A";
}

const logA = list("A", "B", "B", "B", "B");
const logB = list("A", "B", "B", "B", "B", "B");
const logC = list("B", "C", "B", "B", "B", "D");
const logD = list("B", "A", "C", "B", "B", "B", "B", "A");

display(is_battery_pack_dying(logA)); // false
display(is_battery_pack_dying(logB)); // true
display(is_battery_pack_dying(logC)); // false
display(is_battery_pack_dying(logD)); // true

const logE = build_list(x => "A", 5000); // stress test: recursive process fails
display(is_battery_pack_dying(logE)); // false


////////////////////////////////////////////////////////////////////////////////
// SECOND PART /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function get_dying_robot_indices(logs) {
    function helper(...) {
        
    }
    return helper(...);
}

const logs = list(logA, logB, logC, logD);
display_list(get_dying_robot_indices(logs)); // list(3, 1)


// For testing only
function interleave_append(xs, ys) {
    function helper(xs, ys, c) {
        return is_null(xs) ? c(ys) : helper(ys, tail(xs), zs => c(pair(head(xs), zs)));
    }
    return helper(xs, ys, xs => xs);
}

const big_logs = interleave_append(build_list(x => logA, 2000), build_list(x => logB, 2000)); // stress test
display_list(get_dying_robot_indices(big_logs)); // every other index starting from 1
