// Calculator language 
// * Adding booleans, conditionals, and sequences 
// * Adding blocks and declarations
// * Adding compound functions (but no return)

//
// evaluation
//

function evaluate(component, env) { 
    return is_literal(component)
           ? literal_value(component)
           : is_conditional(component)
           ? eval_conditional(component, env)
           : is_sequence(component)
           ? eval_sequence(sequence_statements(component), env)
           : is_name(component)
           ? lookup_symbol_value(symbol_of_name(component), env)
           : is_block(component)
           ? eval_block(component, env)
           : is_function_declaration(component)
           ? evaluate(function_decl_to_constant_decl(component), env)
           : is_declaration(component)
           ? eval_declaration(component, env)
           : is_application(component)
           ? apply(evaluate(function_expression(component), env),
                   list_of_values(arg_expressions(component), env))
           : is_operator_combination(component)
           ? evaluate(operator_combination_to_application(component),
                      env)
           : is_lambda_expression(component)
           ? make_function(lambda_parameter_symbols(component),
                           lambda_body(component), env)
           : error(component, "Unknown component:");
}

function eval_conditional(comp, env) {
   return is_truthy(evaluate(conditional_predicate(comp), env))
          ? evaluate(conditional_consequent(comp), env)
          : evaluate(conditional_alternative(comp), env);
}

function eval_sequence(stmts, env) { 
    if (is_empty_sequence(stmts)) {
        return undefined;
    } else if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const ignore = evaluate(first_statement(stmts), env);
        return eval_sequence( rest_statements(stmts), env); 
    } 
}

function scan_out_declarations(component) {
    return is_sequence(component)
           ? accumulate(append,
                        null,
                        map(scan_out_declarations,
                            sequence_statements(component)))
           : is_declaration(component)
           ? list(declaration_symbol(component))
           : null;
}

function eval_block(component, env) {
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    return evaluate(body, extend_environment(locals,
                                             unassigneds, 
                                             env));
}

function list_of_unassigned(symbols) {
    return map(symbol => "*unassigned*", symbols);
}

function eval_declaration(component, env) {
    assign_symbol_value(
        declaration_symbol(component), 
        evaluate(declaration_value_expression(component), env),
        env);
  return undefined;
}

function list_of_values(exprs, env) {
    return map( comp => evaluate(comp, env), exprs); 
}

function apply(fun, args) {
    return is_primitive_function(fun)
           ? apply_primitive_function(fun, args) 
           : is_compound_function(fun)
           ? evaluate(function_body(fun),
                      extend_environment( 
                          function_parameters(fun), 
                          args, 
                          function_environment(fun)))
           : error(fun, "Unknown function type:");
}

//
// syntax functions
//

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {    
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// operator combinations

function is_operator_combination(component) {	    
    return is_unary_operator_combination(component) ||
           is_binary_operator_combination(component);
}
function is_binary_operator_combination(component) {	    
    return is_tagged_list(component, "binary_operator_combination");
}
function is_unary_operator_combination(component) {	    
    return is_tagged_list(component, "unary_operator_combination");
}
function operator_symbol(component) {
    return list_ref(component, 1);
}
function first_operand(component) {
    return list_ref(component, 2);
}
function second_operand(component) {
    return list_ref(component, 3);
}

function operator_combination_to_application(component) {
    const operator = operator_symbol(component);
    return is_unary_operator_combination(component)
           ? make_application(make_name(operator),
                              list(first_operand(component)))
           : make_application(make_name(operator),
                              list(first_operand(component),
                                   second_operand(component)));
}

// conditionals

function is_conditional(component) {
    return is_tagged_list(component, "conditional_expression") ||
           is_tagged_list(component, "conditional_statement");
}
function conditional_predicate(component) {
   return list_ref(component, 1);
}
function conditional_consequent(component) {
   return list_ref(component, 2);
}
function conditional_alternative(component) {
   return list_ref(component, 3);
}

// sequences

function is_sequence(stmt) {
   return is_tagged_list(stmt, "sequence");
}
function sequence_statements(stmt) {   
   return head(tail(stmt));
}
function first_statement(stmts) {
   return head(stmts);
}
function rest_statements(stmts) {
   return tail(stmts);
}
function is_empty_sequence(stmts) {
   return is_null(stmts);
}
function is_last_statement(stmts) {
   return is_null(tail(stmts));
}

// names

function is_name(component) {
    return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
    return head(tail(component));
}

function make_name(symbol) {
    return list("name", symbol);
}

// blocks

function is_block(component) {
    return is_tagged_list(component, "block");
}
function block_body(component) {
    return head(tail(component));
}
function make_block(statement) {
    return list("block", statement);
}

// declarations

function is_declaration(component) {
    return is_tagged_list(component, "constant_declaration") ||
           is_tagged_list(component, "function_declaration");
}
function declaration_symbol(component) {
    return symbol_of_name(head(tail(component)));
}
function declaration_value_expression(component) {
    return head(tail(tail(component)));
}
function make_constant_declaration(name, value_expression) {
    return list("constant_declaration", name, value_expression);
}

// application

function is_application(component) {
   return is_tagged_list(component, "application");
}
function function_expression(component) {
   return head(tail(component));
}
function arg_expressions(component) {
   return head(tail(tail(component)));
}

function make_application(function_expression, argument_expressions) {
    return list("application",
                function_expression, argument_expressions);
}

// lambda expressions

function is_lambda_expression(component) {
    return is_tagged_list(component, "lambda_expression");
}
function lambda_parameter_symbols(component) {
    return map(symbol_of_name, head(tail(component)));
}
function lambda_body(component) {
    return head(tail(tail(component)));
}

function make_lambda_expression(parameters, body) {
    return list("lambda_expression", parameters, body);
}

// function declaration

function is_function_declaration(component) {	    
    return is_tagged_list(component, "function_declaration");
}
function function_declaration_name(component) {
    return list_ref(component, 1);
}
function function_declaration_parameters(component) {
    return list_ref(component, 2);
}
function function_declaration_body(component) {
    return list_ref(component, 3);
}
function function_decl_to_constant_decl(component) {
    return make_constant_declaration(
               function_declaration_name(component),
               make_lambda_expression(
                   function_declaration_parameters(component),
                   function_declaration_body(component)));
}

//
// support functions
//

// conditionals

function is_truthy(x) {
    return is_boolean(x) 
           ? x
           : error(x, "boolean expected, received");
}

// environments

function enclosing_environment(env) { return tail(env); }

function first_frame(env) { return head(env); }

const the_empty_environment = null;

function make_frame(symbols, values) { return pair(symbols, values); }

function frame_symbols(frame) { return head(frame); }

function frame_values(frame) { return tail(frame); }

function extend_environment(symbols, vals, base_env) {
    return length(symbols) === length(vals)
           ? pair(make_frame(symbols, vals), base_env)
           : length(symbols) < length(vals)
           ? error("too many arguments supplied: " + 
                   stringify(symbols) + ", " + 
                   stringify(vals))
           : error("too few arguments supplied: " + 
                   stringify(symbols) + ", " + 
                   stringify(vals));
}

function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? head(vals)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? set_head(vals, val)
                   : scan(tail(symbols), tail(vals));
        } 
        if (env === the_empty_environment) {
            error(symbol, "unbound name -- assignment");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

// function objects

function make_function(parameters, body, env) {
    return list("compound_function",
                parameters, body, env);
}

function is_compound_function(f) {
    return is_tagged_list(f, "compound_function");
}
function function_parameters(f) { 
    return list_ref(f, 1); 
}
function function_body(f) { 
    return list_ref(f, 2);
}
function function_environment(f) {
    return list_ref(f, 3);
}

function is_primitive_function(fun) {
    return is_tagged_list(fun, "primitive");
}

function primitive_implementation(fun) { 
    return head(tail(fun)); 
}

// setting up global environment

const primitive_functions = list(
       list("head",    head             ),
       list("tail",    tail             ),
       list("pair",    pair             ),
       list("list",    list             ),
       list("is_null", is_null          ),
       list("display", display          ),
       list("error",   error            ),
       list("math_abs",math_abs         ),
       list("+",       (x, y) => x + y  ),
       list("-",       (x, y) => x - y  ),
       list("-unary",   x     =>   - x  ),
       list("*",       (x, y) => x * y  ),
       list("/",       (x, y) => x / y  ),
       list("%",       (x, y) => x % y  ),
       list("===",     (x, y) => x === y),
       list("!==",     (x, y) => x !== y),
       list("<",       (x, y) => x <   y),
       list("<=",      (x, y) => x <=  y),
       list(">",       (x, y) => x >   y),
       list(">=",      (x, y) => x >=  y),
       list("!",        x     =>   !   x)
       );
       
const primitive_function_symbols =
    map(head, primitive_functions);
    
const primitive_function_objects =
    map(fun => list("primitive", head(tail(fun))),
        primitive_functions);

const primitive_constants = list(list("undefined", undefined),
                                 list("Infinity",  Infinity),
                                 list("math_PI",   math_PI),
                                 list("math_E",    math_E),
                                 list("NaN",       NaN)
                                );
const primitive_constant_symbols =
    map(c => head(c), primitive_constants);
const primitive_constant_values =
    map(c => head(tail(c)), primitive_constants);

function apply_primitive_function(fun, arglist) {
    return apply_in_underlying_javascript(
               primitive_implementation(fun), arglist);
}

function setup_environment() {
    return extend_environment(append(primitive_function_symbols,
                                     primitive_constant_symbols),
                              append(primitive_function_objects, 
                                     primitive_constant_values),
                              the_empty_environment);
}

const the_global_environment = setup_environment();

// 
// running the evaluator
// 

function parse_and_evaluate(program) {
    return evaluate(make_block(parse(program)), 
                    the_global_environment);
}

// test cases
parse_and_evaluate(`  
    const x = f(8);
    function f(y) {		
       y + 34;
    }
    x;
`);
