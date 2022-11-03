// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 1A
////////////////////////////////////////////////////////////

function is_nucleobase(s) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 1B
////////////////////////////////////////////////////////////

function is_dna_strand(xs) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 1C
////////////////////////////////////////////////////////////

function combine(xss) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 1D
////////////////////////////////////////////////////////////

function oxoguanine_repair(xs) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 1E
////////////////////////////////////////////////////////////

function find_gene_start(xs) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 1F
////////////////////////////////////////////////////////////

function find_gene_end(xs) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 1G
////////////////////////////////////////////////////////////

function all_genes(xs) {

    // WRITE HERE.

}



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
// Test Cases for Q1A
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(is_nucleobase("Mary"), false);
    },
    "Q1A-P01",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("T"), true);
    },
    "Q1A-P02",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("^^^"), false);
    },
    "Q1A-P03",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("Mary"), false);
    },
    "Q1A-T01",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("G"), true);
    },
    "Q1A-T02",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("A"), true);
    },
    "Q1A-T03",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("TAG"), false);
    },
    "Q1A-T04",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("C"), true);
    },
    "Q1A-T05",
    ['is_nucleobase']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1B
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(is_dna_strand(list("A", "G", "A")), true);
    },
    "Q1B-P01",
    ['is_dna_strand']
);

assert(
    () => {
        return equal(is_dna_strand(list("A", "B", "B", "A")), false);
    },
    "Q1B-P02",
    ['is_dna_strand']
);


assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "C")), true);
    },
    "Q1B-P03",
    ['is_dna_strand']
);


assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "Otto")), false);
    },
    "Q1B-P04",
    ['is_dna_strand']
);

assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "C", "B")), false);
    },
    "Q1B-T01",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(null), true);
    },
    "Q1B-T02",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(list("A", "A", "A")), true);
    },
    "Q1B-T03",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(list("_", "A", "T")), false);
    },
    "Q1B-T04",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "C", "TT")), false);
    },
    "Q1B-T05",
    ['is_nucleobase']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1C
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(combine(list(list("A", "G", "A", "T", "A"),
                                  list("A"),
                                  list("G", "A", "G"))),
                    list("A", "G", "A", "T", "A", "A", "G", "A", "G"));
    },
    "Q1C-P01",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(list("G"),
                                  list("G"),
                                  list("C", "T", "C", "T"),
                                  list("A"))),
                     list("G", "G", "C", "T", "C", "T", "A"));
    },
    "Q1C-P02",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(list("A", "A", "A"),
                                  list("G"),
                                  list("C", "G", "C", "T"),
                                  list("A", "C"))),
                     list("A", "A", "A", "G", "C", "G", "C", "T", "A", "C"));
    },
    "Q1C-T01",
    ['combine']
);

assert(
    () => {
        return equal(combine(null),
                     null);
    },
    "Q1C-T02",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(null)),
                     null);
    },
    "Q1C-T03",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(list("A"))),
                     list("A"));
    },
    "Q1C-T04",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(null, null, list("T"))),
                     list("T"));
    },
    "Q1C-T05",
    ['combine']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1D
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(oxoguanine_repair(list("A", "8", "A", "8", "C", "T", "A", "C")),
                     list("A", "G", "A", "G", "C", "T", "A", "C"));
    },
    "Q1D-P01",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("8", "8", "8", "8", "8")),
                     list("G", "G", "G", "G", "G"));
    },
    "Q1D-T01",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("A", "A", "A", "A")),
                     list("A", "A", "A", "A"));
    },
    "Q1D-T02",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(null),
                     null);
    },
    "Q1D-T03",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("A", "T", "G", "C", "8")),
                     list("A", "T", "G", "C", "G"));
    },
    "Q1D-T04",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("8", "C")),
                     list("G", "C"));
    },
    "Q1D-T05",
    ['oxoguanine_repair']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1E
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(find_gene_start(list("A", "C", "A", "T", "G", "T", "A", "C")),
                     list(list("T", "A", "C")));
    },
    "Q1E-P01",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "A", "C", "G", "T", "A", "C")),
                     null);
    },
    "Q1E-P02",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "A", "G", "T", "A", "T", "G")),
                     list(null));
    },
    "Q1E-P03",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(null),
                     null);
    },
    "Q1E-T01",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "A", "A", "T", "G", "A", "T", "G")),
                     list(list("A", "T", "G")));
    },
    "Q1E-T02",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "G", "C", "G", "T", "A", "C")),
                     list(list("C", "G", "T", "A", "C")));
    },
    "Q1E-T03",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "A", "T", "A", "T", "A", "T")),
                     null);
    },
    "Q1E-T04",
    ['find_gene_start']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1F
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(find_gene_end(list("A", "G", "A", "G", "T", "A", "A", "T", "A", "A")),
                     list(list("A", "G", "A", "G")));
    },
    "Q1F-P01",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("A", "T", "A", "C", "C", "A", "G", "A", "T")),
                     null);
    },
    "Q1F-P02",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("T", "G", "A", "A", "T", "A", "C")),
                     list(null));
    },
    "Q1F-P03",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("G", "C", "T", "G", "A", "T", "A", "A")),
                     list(list("G", "C")));
    },
    "Q1F-T01",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("T", "T", "A", "C", "A", "G", "A", "T")),
                     null);
    },
    "Q1F-T02",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("T", "A", "A", "T", "G", "A", "C")),
                     list(null));
    },
    "Q1F-T03",
    ['find_gene_end']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1G
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(all_genes(list("C", "T", "A", "A", "G", "C")),
                     null);
    },
    "Q1G-P01",
    ['all_genes']
);

assert(
    () => {
        return equal(all_genes(list("A", "A", "T", "G", "A", "C", "T",
                                    "A", "G", "G")),
                     list(list("A", "C")));
    },
    "Q1G-P02",
    ['all_genes']
);

assert(
    () => {
        return equal(all_genes(list("T", "A", "T", "G", "C", "A", "T",
                                    "A", "A", "G", "T", "A", "G", "A",
                                    "T", "G", "A", "T", "G", "A", "T")),
                     list(list("C", "A"), list("A")));
    },
    "Q1G-P03",
    ['all_genes']
);
