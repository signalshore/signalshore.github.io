Title: Programming Languages Part B
Date: 2019-08-11
Tags: Learning, CS
Status: draft

In Part B we study functional programming languages with dynamic type
checking. For this we use the programming language Racket which is a
dialect of the LISP programming language. During the second week we
also implement a programming language interpreter. Even though it is a
toy language it gives a lot of insight into how interpreters work.

# Part B : Racket
I will highlight what were the major learning points for me.

## Dynamic Typing

Static or dynamic typing is defined on the basis of when the type
checking takes place during the life-cycle of a program. In static type
checking the type checking happens at compile time while in dynamic
type checking the type checking happens at run time. Dynamic typing
can be convenient when you are writing programs as you do not have to
figure out the types of arguments and variables in your program
beforehand and more programs are accepted by the system, but at the
same time this also means the most of the errors happen at run-time.


## Delayed Evaluation

In a programming language the manner in which expressions (and
sub-expressions) are evaluated can have a large impact on how programs
are constructed.

Generally when we evaluate a function expression, we evaluate the
sub-expressions first before evaluating the actual function. This is
called applicative order evaluation.

For example consider this function which tries to emulate the functionality of the 'if' expression.

    #!Racket
    (define (my-if a b c)
        (if a b c))
        
Let's use this 'my-if' as we would use a normal if clause

    #!Racket
    (my-if (= 2 3) 2 3)
    ;; result :=> 3
This works properly. However, the next one doesn't.

    #!Racket
    (my-if (= 2 3) (1 2) (2 3))
    ;; result :=> Error

This is because when 'my-if' is being evaluated, then all the three
arguments to the function is evaluated first before evaluating
'my-if'. This does not happen when we use the normal 'if' conditional
because if is a special form. It evaluates the conditional argument
first and based on that result it evaluates either of the branches.

There should be a way of passing around expression in a language
without actually evaluating them. In Racket we can do this by wrapping
the desired function in lambda functions that take no arguments. Thus
we can pass this lambda function around as we want and we can evaluate
it when we need it by using an extras set of parenthesis.

Thus we need to rewrite the old functions. We can do it as
    
    #!Racket
    (define (new-if a b c)
        (if a (b) (c)))
        
and we will call this function as 

    #!Racket
    (new-if (= 2 3) 
            (lambda () (1 2))
            (lambda () (2 3)))
            

This is called thunking. When we wrap a function in an empty lambda
function, then we create a thunk. Instead of 'e1' we use '(lambda ()
e1)'. So when the thunk is passed to a function, the thunk gets
evaluated first into the function and then we can evaluate the
function to get the result.

This is just one of the many programming idioms that are there that we
can use to mess around with the order of evaluation in a program.


## Delay & Force (call by need or lazy evaluation or promises)

So thunking provides us a solution to the problem of evaluating
expression that are not needed.  What about expressions that can be
needed in multiple places in a program ? If we use thunking we can
delay the evaluation untill needed but we will still need to evaluate
it every single time it is needed. Here we see another design
consideration. It is not only important to delay evaluation, it is
also important to avoid expensive computation or re-computation.

This is called call-by-need or lazy evaluation.

What is Lazy evaluation ?  Lazy evaluation is an evaluation strategy
in which an expression is not not evaluated when they are bound to
variables. Instead they are evaluated when their results are needed by
other computations. This is the default mode of evaluation used in the
Haskell programming Language.

One way to do this is to transform every function call into a value
look-up. We can store the thunk of the function in a cons cell along
with the result. If the result is not computed then we will evaluate
the thunk and store the value in the cell (we will mutate the cons
cell) and thus, the next time we need to evaluate the same function,
we can just look up the value in the cons cell.

Basically when we implement a system where we store the output of a
function if it has been evaluated once. As noted above this can be
done easily using mutable cons cells.

    #!Racket
    (define (delay f)
        (mcons #f f))
        
    (define (force thunk)
        (if (mcar thunk)
            (mcdr thunk)
            (begin (set-mcar! thunk #t)               ;; set the flag to true
                   (set_mcdr! thunk ((mcdr thunk)))   ;; replace the thunk with the result
                   (mcdr thunk))))                    ;; return the result

This is something that hit me in the face with a brick when I first understood it.
It's so beautiful and cool. :-)


## Streams; Producers and Consumers
Let me preface this section by stating that before this I had no idea
what streams were and how they worked.

A stream (in the context of computers) is an infinite source of
data. It is never ending. This is a very hand-wavy definition and it
does not paint a truthful picture but it is good enough for
now. Streams are produced by something called as a producer. The
producers knows only how to produce a stream of data endlessly.

Now, that we have an endless stream of data, what do we do with it ?
This is where consumers come in. Consumers consume the data from the
stream in whatever manner they want.

A good analogy is rivers. A glacier is the producer which produces and
endless stream of water and humans are the consumers. The consumers
get to decide how to and how much to consume the stream.

Constructing an endless source of data is quite impossible since you
never really know when to stop. So instead we use a short-cut. To
construct an infinite stream of data all you need is a starting point
and a method to go to the next point.

We will try to understand this with an example.

Consider the set of all Natural Numbers which we can all agree that is an infinite set.

How would one go about printing out all the natural numbers if the
entire set is infinite ?  

The answer is that one does not need to print all the natural numbers
all at once. All one needs to do is to keep track of the current
number being printed and then increment the number by 1 when the next
natural number is needed. In this case the starting point is 1 and the
method of obtaining the next number is that you increment the current
number by 1.

This gives us a good starting point of how to go about designing
streams.  In a stream (in this case) the flow of data is controlled by
the consumer as data is produced only when it is asked for by the
consumer and the only two pieces of information needed by either the
producer or the consumer is the starting element of the stream and the
formula.

So we can code up streams by writing a thunk that evaluates to a pair
wherein the first element is the first element and the second element
is a thunk that has everything we need to get all the elements from 2
to infinity.

Let us write a stream that just produces an infinite stream of 1's
    
    #!Racket
    (define ones-st (lambda () (cons 1 ones)))
    
    ;; we call this stream by
    
    ;; this gives the first element
    (car (one-st))
    
    ;; this gives us the second element
    (car (cdr (one-st)))
    
The stream is a thunk which when evaluated gives a pair. The first
element in the pair is the first value in the stream and the second
element is another thunk. We can clearly see how this works in the way
we call it.

This stream is a bit easy to understand since there is not
transformation that is taking place between the subsequent elements.

Now we will define the same stream and put a transformation function
in the middle. This function will not do anything but it will act as a
good placeholder for future transformations.

    #!Racket
    (define (ones)
        (define (ones-help x)
        (cons x (lambda () (ones-help (+ x 0)))))
    (ones-help 1))
    
In this way we have a framework of how to go about designing different streams. 
Let use write an infinite stream of the square of all the natural numbers.


    #!Racket
    (define (square)
        (define (square-help x)
        (cons (* x x) (lambda () (square-help (+ x 1)))))
    (square-help 1))

How do we get elements from the stream ? 

To get the first element we evaluate the stream and get the first
element form the pair. To get the second element from the stream we
evaluate the cdr of the pair we get.


    #!Racket
    (car (square))
    ;; first element
    
    (car ((cdr (square))))
    ;; second element
    
Thus we can get new elements from the list.

Note: This is the exact same way in which Alonzo Church defines Church Numerals. 


## Datatype with structs.

SML has records and datatype bindings that allows us to make compound
dataypes and data-structures and it lets us use pattern matching to
get the desired data out form the data structure.

For Example,

    #!SML
    val record_test =  { first = "sohom", second = "b", number = 1000 };
    (* creates a new record in the env and binds it to record_test *)
    
    val { first = t : string , second = tt : string, number = ttt : int } = record_test; 
    
    (* This pattern matches the record on the left with the record on
    the right and binds the values after extracting them from the
    record *)

We could implement the same kind of the thing in Racket using cons
cells but there is an even better way in Racket. In Racket we can use
structs to define custom data types.

When we add a new datatype with `struct` it introduces a bunch of
other functions into the environment. Let me illustrate this with an example.


    #!Racket
    (struct foo (field1 field2 field3))
    
This will introduce a constructor for this struct, a checker for this
struct and accessor functions for each field in the struct. This is
super handy.

So we can do things like
    
    #!Racket
    (define new_t (foo 1 2 3))
    
    (foo? new_t)
    ;; evaluates to #t
    
    (foo-field1 new_t)
    ;; evaluates to 1
    
    (foo-field2 new_t)
    ;; evaluates to 2
    
    (foo-field3 new_t)
    ;; evaluates to 3

    
I think this is really cool. Especially because the user does not have
to write accessor functions for all the types they define, but instead
the language system generates them. Also, struct is not a syntactic
sugar for some list or something else. Struct actually creates a new
type in the env. 

## Implementing a Programming Language
This something that we actually have to do this course. It's a part of
the homework.

I will not go into the details but this week was particularly very
interesting because you had to first understand the syntax and the
semantics of the programming language that you were supposed to build
and then write the interpreter for it. 

One thing that I did get over was my fear of interpreter's and realize
that a compiler or and interpreter is just a normal program; there is
nothing too fancy about it. That was really fun to learn.

I had a really great time trying and implementing Closures and writing
the main eval function.

### What is the environment ?
During programming we often hear about the "environment" a lot but we
do not spend too much time thinking about what it actually is. Turns
out that the environment is just a mapping that stores the identifies
that the values/expressions the identifiers are bound too. When you
think about it, this makes sense, right ?

I mean, what is the role of the environment ? Like all the environment
is supposed to do is to make sure that when the expressions are
evaluated they get evaluated with the correct values.

In the made up programming language we  do this by using a list as the
environment.


### Closures and Lexical Scoping
In the MUPL (made up programming language), we implement lexical
scoping and closures.

It's quite simple. When the interpreter encounter a function definition
it just wraps the function along with the env in a data structure
(like a cons of two elements) and that is about it.


The most challenging part of this whole exercise was to write the case
for the function calls.

## Static Checking 
 
We talked briefly about static checking in the first paragraph.
In this section we will look at static checking in more detail.

Couple of thing first.

- ML has static type checking
- Racket does not have static type checking

The job of static checker is to reject programs after they have been
parsed but before they have been run.

The static checker checks the program for correctness. 

How do we define this correctness ?

One way we check for correctness is by evaluating the program against
a set of rules. Most commonly these rules are the typing rules. Mix
all of these together and you the type checker and the set of rules
that are used to evaluate the correctness of a program is called the
type system.


### Correctness of a type system
The type system is a part of the programming language definiton that
sprcifies what type of programs are legal and what are not in that
programming language.

The Type System is designed to prevent a cretain kind of bad behaviour
in the programming language. If the type system prevents the behaviour
that it claims to prevent then the type system is correct.

We use two different and opposing metrics to determine the correctness
of a type system:

#### **Soundness** ####
A type system is sound if it all type-checked programs are correct.
This means that the type checker will never accept an in-correct
program, i.e. there wont be any false negetives. 

   
#### **Completeness** ####
A type system is complete if all correct programs can be accepted by
the type checker. This means that the Type Checker will never reject a
correct program, i.e. there wont be any false positives.


We define the positives/negetives with respect to the ppresence of
undesirable bugs in a program. These are the bugs that the type
checker is designed to prevent. Hence, for *negetive* the type checker
claims that the bug is not present in the progam i.e. the program is
correct and vice-versa.

In the broader context of logic systems these terms have some interesting meanings.
1. A system is sound if only true statemenats are proveable.
2. A system is complete if *all*  true statements are proveable.

Now, completeness is much more difficult to have than soundness. This
is because for a type checker to be complete it needs to show that all
correct programs are accepted by it and the set of *all correct
programs* is inifinite in nature. The tradeoff that gets made is that
programming language designers will rather have a sound system than a
complete system.




