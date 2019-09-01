Title: Programming Languages Part B
Date: 2019-08-11
Tags: Learning, CS


In Part B we study functional programming languages with dynamic type
checking. For this we use the programming language Racket which is a
dialect of the LISP programming language. During the second week we
also implement a programming language interpreter. Even though it is a
toy language it gives a lot of insight into how interpreters work.

# Part B : Racket
I will highlight what were the major learning points for me.

## Dynamic Typing

Static or dynamic typing is defined on the basis of when the type
checking takes place during the lifecycle of a program. In static type
checking the type checking happens at compile time while in dynamic
type checking the type checking happens at run time. Dynamic typing
can be convenient when you are writing programs as you do not have to
figure out the types of arguments and variables in your program
beforehand and more programs are accepted by the system, but at the
same time this also means the most of the errors happen at run-time.


## Delayed Evaluation

In a programming language the manner in which expressions (and
subexpressions) are evaluated can have a large impact on how programs
are constucted.

Generally when we evaluate a function expression, we evaluate the
sub-expressions first before evaluating the actual function. This is
called applicative order evaluation.

For example consider this function which tries to emulate the functionality of the 'if' expression.

    #!Racket
    (define (my-if a b c)
        (if a b c))
        
Let's use this 'my-if' as we would use a normal if caluse

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


## delay & force (call by need or lazy evaluation or promises)

So thunking provides us a solution to the problem of evaluating
expression that are not needed.  What about expressions that can be
needed in multiple places in a program ? If we use thunking we can
delay the evaluation untill needed but we will still need to evaluate
it every single time it is needed. Here we see another design
consideration. It is not only important to delay evaluation, it is
also important to avoid expensive computation or recomputation.

This is called call-by-need or lazy evaluation.

What is Lazy evaluation ?  Lazy evaluation is an evaluation strategy
in which an expression is not not evaluated when they are bound to
variables. Insted they are evaluated when their results are needed by
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


## streams producers and consumers
Let me preface this section by stating that before this I had no idea
what strems were and how they worked.

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

The answer is that one does not need to print all the natual numbers
all at once. All one needs to do is to keep track of the current
number being printed and then increment the number by 1 when the next
natural number is needed. In this case the starting point is 1 and the
method of obtaining the next number is that you increment the current
number by 1.

    This gives us a good starting point of how to go about designing
    streams.  In a stream (in this case) the flow of data is controlled by
    the consumer as data is produced only when it is asked for by the
    consumer and the only two pieces of information needed by either the
    producer or the consumer is the current position on the stream (the
    producer already knows about the starting position) and the formula.

** Memoization
 This is another interesting programming idiom that i used to reduce
 computation while evaluating programs.

If a function produces the same value when it is called with multiple
times then, we do not need to evaluate it everytime (even if we are
using thunks). We can just save the value of the function the first
time it is called and use that computed value next time it is
required. 

How we do it in racket is by using mutation. We have a static list that 
The idea is that we do this at 
