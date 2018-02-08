Title: Scheme - Part 4 - Higher Order Procedures (contd.)
Date: 2018-02-06
Tags: CS, Scheme

#### Recap ####
In the previous post we talked about the first part of what it means to be a Higher-Order Function.

In this post we will talk about the second part of that idea. And, we will explore Higher-Order functions and First Class Functions/Citizens. 

### Procedures as returned values ###
In Scheme procedures can be returned from other procedures. In the
world of procedures that can manipulate other procedures this is the
other side of the same coin. If we have procedures that can accept
other procedures as arguments; then it makes logical sense to have
procedures that can return other procedures as well. 

In Scheme we can have procedures that return other procedures as their output. This has very interesting effects both from a programming language perspective and a mathematical perspective. 

We will look at them, But before that we need to read a bit of literature.

### First Class Functions and Higher Order Function ###
The term First Class Functions is used only in a programming language context.

A programming language supports first class functions if it treats
functions
as
[first class citizens](https://en.wikipedia.org/wiki/First-class_citizen). First
class citizens are those entities that supports all the operations
generally available to other entities in that programming
language. These operations typically include being passed as a
variable, being returned from a function, being assigned to a
variable, etc.


#### __What does this mean for programming languages ?__ ####

This means that for a programming language to support [first class functions](https://en.wikipedia.org/wiki/First-class_function) it should allow functions to be passed as arguments to other functions, functions to be returned from other functions and functions to be stored in variables or any suitable data-structures.


It should be noted that First-class function is not an attribute of any function in a language. Rather, it the attribute of the programming language itself.


#### __What is the deal with Higher-Order Functions ?__ ####

[Higher-Order functions](https://en.wikipedia.org/wiki/Higher-order_function) are not limited to programming languages. This concept covers functions in a much more general and mathematical sense. The idea is that Higher-Order Functions accepts other functions as arguments, and can returns functions as results. 

The differential function in mathematics is an example of Higher-Order Function. It accepts a function as its input and returns the derivative of that function which is also a function. 

$$ d(f(x)) / dx = f'(x)$$

In this equation the differential operator accepts the function $f(x)$ as an argument and the result of the operation is $f'(x)$. 

From a programming language perspective we can see multiple examples of higher order functions. A very common example is the `map` function in python.

	#!python
	lists = [1, 2, 3, 4, 5]
	def sqrr(x): return x**2
	list(map(sqrr, lists))
	[1, 4, 9, 16, 25]

_[map](https://docs.python.org/3.5/library/functions.html#map)_ takes a function and a list of elements and it returns a list with the function applied to all the elements of the input list.


Alright now that we have covered some literature, let's dive in...

### Let's Dive In ###

### __Lambdas__ ###

Scheme offers a special form that allows us to create procedures. Lambdas in Scheme lets us create anonymous procedures i.e. procedures without any names. This might not seem like a very big and special thing, but this is exactly what gives Scheme (and other similar programming languages)so much power.

To illustrate this concept we will write some procedures. Recall that procedures in Scheme are written using `define`.

	#!scheme
	(define (summ-old x y) (+ x y))
	
	(summ-old 5 6)
	

This same procedure can be written using lambdas like so ...
	
	#!scheme
	(define summ (lambda (x y) (+ x y)))
	
	(summ 4 5)
	
	
Basically a lambda is used to create procedures the same way define is used, but with lambda no name of the procedure is mentioned. 
The syntax of lambdas is 

`(lambda (<formal_parameters) (body))`

These are very useful in cases where we do not require naming a procedure because that procedure will be used only once. 
Such a definition looks like this ..

	#!scheme
	((lambda (x y) (+ x y)) 
	  3
	  4)
	


#### __Returning Procedures__ ####

In Scheme we can use lambdas to create procedures that return other procedures.

Let us illustrate this idea with some examples.


	#!scheme
	(define (adder x)
		(lambda (m) 
			(+ m  x)))
		
In this example we have a procedure _adder_ that accepts an argument and returns another procedure (that is what the lambda does) that accepts another parameter and returns the sum of the two numbers.

We can eliminate the first parameter altogether also. Such a function would look like this

	#!scheme
	(define adder-2
		(lambda (x) 
			(lambda (m)
				(+ m x))))
				
The procedure _adder-2_ returns a procedure that accepts an argument and returns another procedure that accepts an argument and returns the sum of these two arguments.

If all this sounds too complex do not worry! How we go about applying these two procedures to operands should make things a lot clearer.

For applying _adder_ the thing that we should keep in mind is that _adder_  returns a function that needs an argument. 

	#!scheme
	((adder 5) 10)
	
It is quite easy to see what is going on here. Let us assume that the inner set of parenthesis is evaluated to a procedure _f_ so after the first set of evaluation the statement should look like this 

	#!scheme
	(f 10)
 
and the resulting output should be 15. 

This is also true for the _adder-2_ procedure. 

	#!scheme
	((adder-2 5) 10)
	
The _adder-2_ procedure returns a procedure that accepts 5 as an argument and then returns a procedure that accepts 10 as an argument.


This lets us do all sorts of interesting things with these functions. For example we can chain them together to add more than two numbers.

	#!scheme
	((adder ((adder 5) 5)) 5)
	
	((adder-2 ((adder-2 5) 5)) 5)

Both of these procedures return 15.


#### __Some practical uses of lambdas__ ####
Lambdas can be very useful when you need to write a procedure but there is no need to name the procedure. Situations where you will not be calling the procedure suing the name in any scenario whatsoever. 

Personally I have a lambda function written in my Emacs config file that opens my To-Do list everytime I press F6 on my keyboard. I did not write this function; I just copied it from some answer on Stack Overflow, but nevertheless it is a good start.

This is the function.

	#!scheme
	(global-set-key (kbd "<f6>") (lambda() (interactive)(find-file "path/to/file.org")))

### now ... ###
This marks the end of the first chapter of the book. I will continue with more posts when I find something interesting (which should be often :-P).

Apart from that I have planned to write about Lambda Calculus and that should be up within this month.

This is my last semester in college so things are a bit hectic, so delays should be expected. 

I went to FSMK camp 2018 last week and I met a couple of my readers. That was fun. :-) (and cheers to you people!!)

That is it!! (for now)


p.s. The code for this post can be found [here](/assets/files/scheme-4.scm).
