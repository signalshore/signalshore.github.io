Title: Lambda Calculus - Part 1
Date: 2018-02-17
Tags: CS

[Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus) is a beautiful thing in Computer Science. 

With this post I will try to motivate and inspire the beauty of Lambda Calculus and impress upon the reader the implications of it.

This will just be a very very basic overview of Lambda Calculus. I can not write an in-depth post because firstly I want to motivate the inspiration in the reader and secondly I have not completely understood some of the greater intricacies of Lambda Calculus.


## Introduction - Lambda Calculus
To put in simply Lambda Calculus is the worlds smallest, universal programming language.

Lambda Calculus is a formal system of mathematical logic that is used for expressing computation. This is a universal model of computation that can be used to encode any Turing Machine algorithm. It was first established by logician [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church). 

[Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) and Alonzo Church showed that a Turing Machine and Lambda Calculus model are equally powerful models of computation. This is the famous [Church-Turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis).

Let us learn about Lambda Calculus by describing it as a programming Language that we are designing.

## Building Blocks of lambda calculus.
All valid Lambda Calculus Expressions are called Lambda terms. Any valid Lambda Calculus expression can be constructed using just three building blocks. 

- **Variables** - The smallest independent entity that one can think of. This has to be valid lambda term.

    - x,y,x etc are all valid Variables. A Variable does not need to mean anything. Currently the variables x,y,z mean nothing.

- **Method of Abstraction** - A way to bind lambda expression to names, so that they can be referred to easily. Lambda Calculus allows us to bind variables to expressions. This allows us to create functions in Lambda calculus. The $\lambda$ (lambda) and the /./ (dot) symbols are used to create abstraction.

    - $\lambda$ x.E

       In this example the expression $E$ is bound to $x$. This allows us apply these functions to arguments. 

- **Method of Application** - Now that we can create functions, what else can we do with them ? We can apply them. Lambda calculus allows us to apply functions to other expressions. The $()$ symbols are used to indicate applications of functions. 


**[Mathematically](https://en.wikipedia.org/wiki/Lambda_calculus_definition)**, Lambda Expressions are composed of 

- variables

- abstraction symbols $\lambda$ and *.* (dot)

- parenthesis $()$

A set of valid Lambda Expressions $\Lambda$ can be defined recursively as..

1. If $x$ is a variable, then $x \in \Lambda$
2. If $x$ is a variable and $M \in \Lambda$, then $( \lambda x. M ) \in \Lambda$
3. If  $M, N \in \Lambda$, then $(M N) \in \Lambda$

**Rule 2** represents the idea of abstraction and is called **Lambda-abstraction**.

**Rule 3** represents the idea of application and is called **application**.

The lambda abstraction $\lambda x.M$ defines an anonymous function that takes $x$ as input argument and maps it to $M$. Thus the function $f(x) = x + 1$ is $\lambda x . x + 1$, where $M$ is $x+1$


The application is equivalent to calling function $M$ on input $N$ i.e. $M(N)$


## How to run Lambda Calculus programs ?
Now we have seen how Lambda calculus expressions can be formed. In this section we will see how Lambda calculus expressions can be reduced. This is also equivalent to saying "How can we run lambda calculus programs ?"

There are multiple reduction rules, but the most important and the most relevant one is the $\beta$-reduction. $\beta$-reduction is defined in terms of substitution rules. This rule captures the idea of function application. 

The $\beta$ reduction rule states that in an expression of the form $(\lambda x.t)v$ we replace all the occurrences of $x$ in $t$ with $v$.

#### Examples ####

1. $(\lambda  x. x^2)5 \thinspace := \thinspace 5^2 \thinspace := \thinspace 25$

2. $((\lambda x. \lambda y. x + y)\thinspace 5 \thinspace 4) \thinspace:= \thinspace 5 + 4 \thinspace := \thinspace 9$

## Church Encoding
Now that we have a working programming language that allows us to define functions and apply functions what else can we do with this language ?

We realize that to do any sort of meaningful work with this language we need to define numbers and arithmetic operations in this language.

This is where Church Encoding comes into play. It is a method of encoding numbers and operations in the Lambda calculus. It is meant to illustrate that you can have mathematical operations purely in terms of functions and abstractions without defining any mathematical primitives.

Under Church Encoding we have a bunch of different formats. Over here we will be discussing only two of them.

## Church Numerals
The basic idea of church numerals is to use multiple applications of a function to represent numbers and the number of times the function is applied is equal the number that the lambda expression represents.

Starting with the number $0$ where the function is not applied even once. We define zero as 

$0\thinspace := \thinspace  \lambda \thinspace f. \thinspace \lambda x.\thinspace x$

$1\thinspace := \thinspace \lambda \thinspace f. \thinspace \lambda x. fx$

$2\thinspace := \thinspace \lambda \thinspace f. \thinspace \lambda x. f(fx)$

<br>

### Successor Function ###

We define the successor function as 

$S := \lambda n. \thinspace \lambda f.\thinspace \lambda x.\thinspace f \thinspace ( \thinspace n \thinspace f \thinspace x \thinspace )$ 

<br>

### Application ###

Now, we can confirm the working of this setup by applying the successor function to the definition of $0$.

$S0 := (\lambda n. \lambda f. \lambda x. f \thinspace (n \thinspace f \thinspace x))( \lambda f. \lambda x. \thinspace x)$

$S0 := \lambda f. \lambda x. \thinspace f(( \lambda f. \lambda x. x) f x)$

$S0 := \lambda f. \lambda x. fx$, which is $1$

<br>

Similarly, we can define $2$ by applying the successor function to $0$ twice 

$S2 := S(S0)$

$S2 := (\lambda n. \lambda f. \lambda x. f \thinspace (n \thinspace f \thinspace x))( \lambda f. \lambda x. f \thinspace x)$

$S2 := \lambda f. \lambda x. f((\lambda f. \lambda x. fx)fx)$

$S2 := \lambda f. \lambda x. f(fx)$, which is $2$

So, right now in this programming language we have the ability to use numbers.

## Church Boolean
We can define Boolean values (True and False) quite simple using church Encoding. The way these Boolean values are defines is very intriguing.


$T := \lambda x. \lambda y. x$

$F := \lambda x. \lambda y. y$


Basically, $T$ is defined as a function that takes in two arguments and returns the first one and $F$ is defined as a function that takes in two arguments and returns the second one.

What is surprising is that we can define all logical operations using a clever combination of these functions.    

### Boolean Operations ###

1. $\wedge := \lambda x. \lambda y. x y (\lambda u. \lambda v. v) := \lambda x. \lambda y. x y F$

      - $\wedge M N := (\lambda x. \lambda y. x y F) M N := M N F$
<hr>

2. $\vee := \lambda x. \lambda y. x (\lambda u. \lambda v. u) y := \lambda x. \lambda y. x T y$
   
      - $\vee M N := (\lambda x. \lambda y. x T y) M N := M T N$
<hr>

3. $\neg := \lambda x. x (\lambda u. \lambda v. v) (\lambda p. \lambda q. p) := \lambda x. x F T$

      - $\neg M := (\lambda x. x F T)M := M F T$

<br>
In the previous equations replace $M$ and $N$ with any Boolean you want (either $T$ or $F$) and then evaluate the resulting expression. 

For Example for the equation 1. we can have $M = T$ and $N = F$, which makes the equation


$M N F := T F F := (\lambda x. \lambda y. x) F F := F$ *(because T takes in two inputs and chooses the first one)* 

Thus an $AND$ operation on $T$ and $F$ is $F$. 

The same can be shows for the rest also.

## Conclusion 

New posts should be up *not-so-shortly*. In that I will explore each aspect of Lambda Calculus in more detail.
