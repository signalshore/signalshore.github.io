Title: Programming Languages Part A
Date: 2019-03-18
Tags: Learning, CS

I am planning to use the Learning tag to create a series of posts
about _every_ online course I will take. The idea is to document
everything in my blog. Having something that I can refer to is also
super awesome.

# Structure
The entire course is quite long. The way Dan (the instructor) has
structured the course is that he divided the course into 3 parts. 

In Part A we used the programming language SML (Standard Meta
Language) since the primary focus of this part of the course is to
learn about strongly typed, functional programming language with
static type checking (I will talk about these later). In Part B we use
Racket and in Part C we use Ruby.

#### _NOTE: haven't taken parts B and C of the course so I'm not too clear on that._ ####

# Part A : SML #

I will write get to the point and write about each major topic that I
learned.

### Functional Programming and Pure Functions ###

This section defined functional programming for me. I have programmed
a little bit in Scheme before (due to SICP) but I never really learned
what Functional Programming really means. As a result I could not
define it when someone asked me what it is. 

Turns out that I never really understood _pure functions_, which is
the core concept around which functional programming revolves. Now,
pure functions are a mathematical concept. Mathematically a function
just takes a value and returns a result. It does _nothing_ else, or
more specifically it changes nothing else. Moreover a function has to
return the same result for the same argument _always_.

Well, how does this translate into programming ?

In programming terms, a pure function has to have no _side effects_
Side effects is a term computer people use to confuse non-computer
people. It means that a function should not mutate any mutable
variables/references in the environment. This gets tricky sometimes,
especially if the programming language allows and encourages
mutations.  Object-Oriented languages allow mutation and that can lead
to some interesting problems (and security vulnerabilities) in
software.

Essentially I wrote a lot of _functional_ code for this course and its
exercises and homework assignments. That was fun.

### Static Typing ###

SML is a statically typed language, which means that the programs are
type checked by the compiler before being run.

A typical program in SML with all types explicitly mentioned looks
like this. Its a simple function that takes two numbers and adds them.

    #!sml
    fun add (x: int, y: int): int = 
        x + y;

The type of the `add` function is `fn: int * int -> int`

Let's write a recursive program that calculates `n raised to m`.

    #!sml
    fun pow (m : int, n : int) =
        if m=0
        then 1
        else m * pow(m, n-1)

The type of `pow` function is `fn: int * int -> int`

I had some trouble understanding how the type system worked in SML,
but things got quite clear after a bunch of exercises where we are
required to write a very limited type checker ourselves. This was one
of the best exercises in the entire course in my opinion. Turns out the
type checker is just a massively logical piece of code and not _magic_
and things do make sense if you know the type checking rules really
well.

### Type-Inference ###

In SML you are not required to explicitly mention the types of every
expression, the type checker can infer the types itself. I found this
very un-intuitive at first, but reading about the process made it
quite obvious.

Let us rewrite the above functions without explicitly mentioning
types.


    #!sml
    fun add (x, y) =
        x + y;
    
    fun pow (m, n) =
        if m=0
        then 1
        else m * pow(m, n-1)

In both these cases the type checker can infer the types of the
functions and the arguments and the final type for both the functions
is `fn: int * int -> int`. The type checker can do this by `looking
ahead` into the function and inspecting the operations being performed
on the arguments. The intuition being that when you check if an
argument value is equal to `0` or not, then the argument must be an
integer. Similarly, if you are adding two arguments, they must be
integers. To carry the idea forward, the static type checker would
throw an error if you tried to perform some operation on incompatible
types (like adding a string to an integer). This is also possible
because the operators are not overloaded like how in python the `+`
operator can do both addition for integers and concatenation for
strings. Having non-overloaded operators means that every operator has
a very specific type of operands that it accepts, and anything
otherwise would not type-check.

### Polymorphic Data-types ###

Another thing that I found beautiful was the concept of polymorphic
types in SML. In SML the type checker can figure out if there is a
more-general way to write your program so that it can work for _more
than a single type_ of arguments. It does this even if you specify a
type. What this means is that your programs become more general. 

Let's write a function with polymorphic data-types.

    #!sml
    fun add_to_list (x, y) =
        x :: y;

The function `add_to_list` builds a list by taking a object and a list
and adds the object to the front of the list. The type of this
function is `fn: 'a * 'a list -> 'a list` where `'a` is a polymorphic
datatype as in it can take the type of any value passed to the
function. Hence this function works for both integers and strings. 

Look the the results of the function calls in the comments.

    #!sml
    add_to_list(2,[]); 
    (* [2] : int list *)
    add_to_list(2, [2,3]);
    (* [2,2,3] : int list *)
    add_to_list("S",[]);
    (* ["S"] : string list *)
    add_to_list("S",["t","a","r","t"]);
    (* ["S","t","a","r","t"] : string list *)
    
It should be noted  that this functions will only work  if the type of
the object and the type of the object  that the list is made up of are
the same. This  is by definition since in SML  the `::` operator works
like that. Hence the following call will not type check because we are
trying to add `S` to the list `[2,3]`.
    
    #!sml
    add_to_list("S",[2,3]);
    (* Does not type check *)


### Pattern Matching ###

Writing about pattern matching is tricky because it makes absolutely
no sense without any context, and in order to establish context we
would another series of blog posts which is not where I want to go
with this. Let me try.

Imagine a `case` expression. The utility of a case expression lies in
the fact that a case expression can handle multiple branches or
multiple cases.

The case expression in SML has the form

    #!sml
    case expr_0 of
        patt_1 => expr_1
      | patt_2 => expr_2
      | ...
      | patt_n => expr_n
    
This is evaluated by first evaluating the `expr_0` to `val_0` and then
pattern-matching it with `patt_i` and then based on which pattern it
matches with, the corresponding `expr_i` is evaluated.

The pattern part is super cool because it lets you use constructors and operators within the pattern to pattern match against and you can also do variable binding within the pattern itself. 

Let's see that in action. In the following program I will add all the elements of a list together.

    #!sml
    fun add_list(xs) =
        case xs of
            [] => 0
         | x::xs' => x + add_list(xs');
             
    add_list([]);
    add_list([2]);
    add_list([2,3,4]);

In this example basically we are matching against the cases where the list is either empty or not. If the list is empty we return 0 as the sum, otherwise we use pattern matching to split the list into the first element and the rest of the list (without the first element) and then recursively compute the sum.

### Lexical Scope and Closures ###

The body of a function is evaluated in the environment where the
function is defined, not the environment where the function is called.

We will see it in this example.

    #!sml
    val x = 2;
    fun test (y) = y + x;
    val x = 4;
    test(3)
    (* 5 *)

The output of this function is `5` and not `9` because when the
function `test` was defined, the value of `x = 2` in the
environment. Hence when the function was called it used that value of
x as opposed the newer value where x is redefined to 4.

A function always has an environment associated with it. This
environment contains the bindings at the time when the function was
defined.  This associating of a function and its environment (lexical
environment) is called a function closure, or simply; a closure.

Closures are really cool. I did not know before but as it turns out
all the fancy things that I like about Functional Programming like
Currying, Partial Applications etc etc are just closure idioms.

There are still *LOTS* of details that I have not covered about
pattern-matching.

### Tail Recursion ###

After all this tail recursion is a relatively light-headed concept.

A tail call is a function call that is the very last operation in the
calling function. i.e. the calling function has nothing to do after
the function call and the result it receives from the function call is
the final answer. 

We will look at this using the factorial function.
Mathematically we can define the factorial of a number as

> factorial(n) = n * factorial (n - 1) ; when n > 1

We can write this in SML like,

    #!sml
    fun factorial(x) =
        if x=0
        then 1
        else x * factorial(x - 1)

Now, this is fine and it works; BUT, its not tail recursive. 
This is because the calling function has to multiply the result from the recursive call with `x` and then get the result.

Let's write the tail recursive version of this.

    #!sml
    fun fac_tail(n) =
        let fun helper(acc, n) =
                if n=0
                then acc
                else helper(n * acc, n -1)
            in
            helper(1,n)
        end;

Over here we have a helper function that takes two parameters.  The
first parameter stores the value of `factorial(n - 1)` and the second
one keeps track of `n`. 

If we look at how we are calling the helper function recursively, we see that after the recursive call returns a value, we do not need to perform any operations on the result, since it is already the result we want. This is a tail call. 

The benefits of tail calls is that compilers are smart enough to optimize tail calls and hence these recursive calls are not as expensive computationally.

Moreover, because of lexical scoping we can use any variable binding
in the helper function without explicitly passing it during every
call. This makes for very readable code. Using an accumulator to store the intermediate results also helps us avoid re-computation of already computed values. This is called memoization. 


# Wrapping up.
Its been a long time since I finished this course. I got detracted
from my plan to start Part B ASAP. 

Since I paid for this course (first online course I paid for) I got a
certificate. My official final score is 95% which is good enough. 

I plan to revisit the challenge problems of week 2 and week 3 before
starting Part B, which should take about a week more.
