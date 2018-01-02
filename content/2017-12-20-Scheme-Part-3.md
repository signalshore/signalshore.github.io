Title: Scheme - Part 3 - Higher Order Procedures (intro)
Date: 2017-12-20
Tags: CS, Scheme


### Higher Order procedures ###

<s>Lisp is a functional programming language</s>

Lisp is a [Metaprogramming Language](https://en.wikipedia.org/wiki/Metaprogramming)

Actually, I really don't know what Lisp is myself and I'm just trying
to figure it out; so the answer to the question "What programming
paradigm does Lisp fall into ?" will have to wait for some time. I'm
sure that I can quote some website or blog but I want to figure it out
myself. I used to think that Lisp was a functional programming
language but turns out it's not according to the strictest definitions
of functional programming and some other reasons that I do not yet
understand fully.

It's slow but I'm getting there. :-)

Anyway for this post we need to know that in Lisp we
have
[first class functions](https://en.wikipedia.org/wiki/First-class_function),
which is basically functions being treated
as
[first class citizens](https://en.wikipedia.org/wiki/First-class_citizen).

In Scheme this is achieved using Higher Order procedures. 

In this post I am using functions and procedures interchangeably
because in this context (lisp) everything is a function and there is
not much difference, however the meanings may vary depending on which
programming language family you are talking about, for example in
Pascal procedures and functions are distance and have different
 meanings. In the book functions refer to mathematical functions and
procedures mean Lisp procedures.

[Wikipedia](https://en.wikipedia.org/wiki/Higher-order_function)
defines higher order functions as something that does at least one of
the following
- Take one or more functions as arguments
- Return a function as its result

From the SICP book Page 57 defines higher order procedures as
>procedures that manipulate other procedures

We will look at the first point in this post today. The topics are too
dense for a single post.

### Procedures as arguments ###

Instead of just jumping right in, allow me to use an example that will
inspire the idea of procedures that take procedures as arguments.

Let us look at this mathematical expression and write a procedure for it.

$$ Sum = 1 + 2 + 3 + 4 + \dots +  \infty $$

The Lisp procedure to compute this would be like 

	#!scheme
	(define (sum-integers a b)
		(if (> a b)
			0
			(+ a (sum-integers (+ a 1) b))))

	(sum-integers 1 5) ;; prints 15

Now let us look at this expression 

$$ Sum = 1^3 + 2^3 + 3^3 + \dots + \infty $$

This is a series of the sum of cubes. The procedure would look like this

	#!scheme
	(define (sum-cubes a b)
		(if (> a b )
			0
			(+ (cube a) (sum-cubes (+ a 1) b))))


If we observer closely we can see that there is an uncanny similarity
between the two procedures and such a similarity indicates that there
is some abstraction that needs further investigation. If you think
about it, in both the previous examples we are computing the sum of
different terms. If we can capture the idea of `summing` in a
procedure then that would give us the required
abstraction. Mathematicians have done this using the $\Sigma$
notation. The Sigma notation captures the idea of the summation
without knowing what we are summing. Thus the above two expressions
can be rewritten as :

$$ \sum_{n=1}^\infty n = 1 + 2 + 3 + \dots + \infty $$ 

and 

$$ \sum_{n=1}^\infty n^3 = 1^3 + 2^3 + 3^3 + \dots + \infty $$


This lets us capture the idea of summation in the Sigma notation like 

$$ \sum_{n=a}^b f(n) = f(a) + \dots + f(b) $$

and we can use that idea to write a procedure; like so..

	#!scheme
	(define (sum term a next b)
		(if (> a b)
			0
			(+ (term a)
				(sum term (next a) next b)))) ;; (next a) updates the a

In the above procedure "term" and "next" are procedures too.  Term is
a procedure that computes the value of each term. This procedure is
the Lisp equivalent of the function $f(x)$ in the mathematical
Sigma notation. Next is a procedure that determines how the function
will iterate.

Thus for $\sum_{n=1}^\infty n^3 = 1^3 + 2^3 + 3^3 + \dots + \infty$
the Lisp procedure would be

	#!scheme
	(define (cube x) (* x x x))

	(define (next x) (+ x 1))

	(define (sum-cube a b)
		(sum cube a next b)) ;; sum is defined above

This is not the end. We can use this idea to create multiple such abstractions. 

For example the multiplication procedure $\coprod_{n=a}^b f(n) = f(a) * \dots * f(b)$ can be coded like

	#!scheme
	(define (product term a next b)
		(if (> a b)
			1
			(+ (term a)
			   (product term (next a) next b))))

We can use the multiplication abstraction to calculate factorials.

	#!scheme
	(define (factorial x)
		(product identity 1 next x)) ;;defined above

	(factorial 5)                  ;; prints 120


Now we can see another uncanny similarity between this procedure and
the summation procedure. Thus we can define another procedure called
the `accumulate` and abstract away the idea of summation and
multiplication into two different methods of doing the same thing;
accumulating.

	#!scheme
	(define (accumulate combiner null-value term a next b)
	(if (> a b)
		null-value
		(combiner (term a)
			(accumulate combiner null-value term (next a) next b))))

	(define (indentity x) x)
	(define (next x) (+ x 1))

	(accumulate + 0 identity 1 next 5) ;; prints 15

	(accumulate * 1 identity 1 next 5) ;; prints 120

The `combiner` in the above procedure is a procedure that takes in two inputs and combines them. For addition this is `+` and for multiplication this is `*`.

The `null-value` is the value to be used when the range runs out. This is same the the value used the `(> a b)` evaluates to false.

## Conclusion ##

This is the beginning of the chapter in the book that deals with this stuff
[Book](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-12.html#%_sec_1.3)

This post turned out to be bigger than I anticipated. In the next post
we will look at procedures returning procedures as the result. 

p.s. this implies that higher order procedures can program programs in
some sense. ;-)

p.p.s This was mighty amazing. I took about 1 minute
to write the accumulate procedure. I took about 2 weeks to fully
understand the sum procedure. I think I am getting a hang of this
thing!!!
