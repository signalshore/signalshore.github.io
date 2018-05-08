Title: Lambda Calculus - Part 2 - Computation and Lambda Calculus
Date: 2018-05-08
Tags: CS

### Prologue ###

This is the second part of my Lambda Calculus
series. The
[first part](https://signalshore.github.io/blog/Lambda-Calculus-Part-1.html) can
be found here.  recommend reading it first before starting off with
this one.

### What is Computation ? ###

Lambda calculus is formal system for representing computation in
Mathematical Logic. Sit and think about the phrase _representing
computation_ for a moment.

What does it mean for something to be computable ?

Everyday in out lives we use a computer in one form or another,
i.e. computation takes place every single day in numerous methods, but
do we know what computation really is ? Gerry Sussan said in SICP (I
might be paraphrasing him here) 

> It's always harder in computer science to talk about what something
> means than to go about and do it.

When a computer computes something, what does it actually do ?

I am sure that we could answer this question with some electronics
based answer and that would in fact be accurate; but, that is not what
we are concerned with here. We are more concerned about the logical
meaning of computation.

Alan Turing invented the Turing machine and that is one of the most
robust models of computation. When we talk about _models of
computation_ we abstract away all the boring details (like time
complexity and space complexity etc :-P ) and try to deal with the
meaning of computation at a much abstract level.  Alan Turing's Turing
Machine captures the idea of computation in a mechanical sense.

At the same time (actually before Alan Turing) the logician Alonzo
Church came up with lambda Calculus to capture the very same thing.

### What is Lambda Calculus ###
 
Lambda Calculus syntax is very simple. It mainly consists of
expressions (we call them Lambda Expressions), variables, constants
and combinations of all these.

We will look at the syntax in  CFG form (Context Free Grammar)

 $expr \thinspace$ $:=$ $\thinspace constant$
 
 $\qquad \qquad$ $|$ $variable$ 
 
 $\qquad \qquad$ $|$ $(expr \space expr)$ 
 
 $\qquad \qquad$ $|$ $( \lambda \thinspace variable.expr)$

	      
Now that we have the CFG down. Let us break it down a little bit.
Writing the syntax in the form of a CFG is very beneficial because this
format allows us to define the evaluation of a $\lambda$-calculus
expression in terms of derivations of the CFG. We will see that in a
bit.

* The first rule states that any $\lambda$-calculus expression can be
replaced with a constant. Constants can be anything; from numbers like
**0** or **1** to even other **functions** (yeah!!)
* The second rule states that $\lambda$-calculus expression can be
  replaced with a variable. A variable are names like **x** or **y**
* The third rule allows us to apply one expression to another
  expression. This rule capture the idea of function application.
* The fourth and the final rules gives is the **Lambda notation**. This is notation that allows us to bind variables to expression (the variables names in rule 2 work because of this)

#### **Observation** ####
- Rule 3 allows us to apply one expression to another expression **only**
- Rule 4 allows use to define functions that have *only* one variable.

### A very simple  $\lambda$-expression ###
Let us consider the lambda expression 

$\lambda x . ((+ 1) x)$

This is quite a tedious form of writing this expression and we can simplify this quite a lot. The simplified version looks like this.

$\lambda x . (+ 1 \thinspace x )$


**Observe** that in the second form we have one function *+* applied to two arguments - _1_ and _x_. This is not actually allowed according to the rules but they mean the the same things. 


Evaluating this expression we perform simple substitutions according to the rules of the CFG (for this we will use leftmost derivations).

$expr \Rightarrow (\lambda variable . expr)$

$expr \Rightarrow (\lambda x . expr)$

$expr \Rightarrow (\lambda x . (expr \space expr))$

$expr \Rightarrow (\lambda x . ((expr \space expr) \space expr))$

$expr \Rightarrow (\lambda x . ((constant \space expr) \space expr))$

$expr \Rightarrow (\lambda x . ((constant \space constant) \space expr))$

$expr \Rightarrow (\lambda x . ((+ \space 1) \space expr))$

$expr \Rightarrow (\lambda x . ((+ \space 1) \space variable))$

$expr \Rightarrow (\lambda x . ((+ \space 1) \space x))$



**Observe** that the derivation that the $\lambda& expression returns is actually a *function*. This function needs to applied to a variable to get something useful happening out of it. 

$(\lambda x . (+ 1 x )5) := (+ \space 1 \space 5) := 6$

In Scheme this would be something like this

	:::scheme
	((lambda (x) (+ 1 x ))5)

### The Abstraction Operator  ###
The $\lambda$ (lambda) is the abstraction operator used in Lambda Calculus.

In any $\lambda$-expression there are two kinds of variables. **Free** and **Bound** variables.

Consider the following expression

$(\lambda x. (+ \space x \space y \space y \space x))$

$x$ is a bound variable and $y$ is a free variable. 

The abstraction operator binds a variable with the body of the
abstraction. Thus a variable that falls within the scope of the
abstraction is called a *bound* variable. All other variables are
*free* variables.

In the given example variable $x$ is bound to the expression $(+
\space x \space y \space y \space x)$. Thus when this function is
being evaluated with an argument then all the occurrences of $x$ in the
expression will be replaced by the argument.

$((\lambda x. (+ \space x \space y \space y \space x)) 5) = (+ \space 5 \space y \space  y \space 5)$

 

### Currying ###
Rule 4 states that we can have function definitions only in the form of $expr := (\lambda variable . expr)$

Thus this means that in the lambda calculus model we can have
functions with only one variable. However, as we will see that this is
not a limitation, in fact it is quite the opposite as it opens up new
possibilities about what you can do with your programming language.

Currying is a technique that lets us translate functions that take
multiple arguments to a sequence of functions that accept only a
single argument. This is useful in $\lambda$-calculus because this
allows us to define complex functions that take multiple arguments and
still not disturb the 4th Rule.

For example, consider the expression 

$expr := (\lambda x \thinspace y. \thinspace (+ \thinspace x \thinspace y))$

This function will take two arguments 
	
$expr := ((\lambda x \thinspace y. \thinspace (+ \thinspace x \thinspace y))3 \thinspace 5)$

In this expression the abstraction operator will take the first variable (i.e. $x$) and substitute all the occurrences of $x$ in the expression with the value of the first argument (i.e. $3$). This will also happen for the second variable and we will have the expression $(+ \thinspace 3 \thinspace 5)$. 

Actually the expression $expr := ((\lambda x \thinspace y. \thinspace
(+ \thinspace x \thinspace y))3 \thinspace 5)$ is just the curried
version of the expression;

$expr := ((\lambda x (\lambda y. \thinspace (+ \thinspace x \thinspace y))3 )\thinspace 5)$

The derivation of this expression,

$expr := ((\lambda x (+ \thinspace x \thinspace 3)\thinspace 5)$

$expr := (+ \thinspace 5 \thinspace 3)$

Currying is not just a technique used in Lambda Calculus. It is used
in a lot of different fields of mathematics logic. Just have a look at
the Wikipedia page
for [Currying](https://en.wikipedia.org/wiki/Currying)

Currying is named after Haskell Curry. (The Haskell programming languages is also named after him)



