;; lambdas

;; just a lambda form
((lambda (x y) (+ x y))
 3
 4)

;; non syntactic sugar form
(define summ (lambda (x y) (+ x y)))

(summ 4 5)

;; syntactic sugar form
(define (summ-old x y) (+ x y))

(summ-old 5 6)


;; procedures returning procedures

;; the function adder accept an input `x`
;; returns a function that accepts input n
;; and returns the sum of x and n
(define (adder x)
  (lambda (n) 
    (+ x n)))

((adder 5) 5) ;; (adder 5) returns a function that is then applied to the other 5

((adder ((adder 5) 5)) 5)

;; we get multiples levels of substitution.
;; if we replace inner ((adder 5) 5) with 10 we get :
;; ((adder 10) 5)
;; which is 15


;; If you are really more bold...

;; adder-new accepts no inputs and returns a function that accepts a
;; number and returns another function that accepts a number and
;; finally returns the sum of the two nmbers

;; this is exactly similar to the previous adder `adder` without the
;; syntactic sugar.

(define adder-2
  (lambda (m)
    (lambda (x)      
      (+ m x))))

((adder-2 5) 5)

;; (adder-new 5) returns a f

((adder-2 ((adder-2 5) 5)) 5) ;; same as above


;; we can also define new stuff with both these functions and the
;; results are same.
(define (add5 m) ((adder 5) m))

(add5 5) ;; 10

(define (add4 m) ((adder-2 4) m))

(add4 5) ;; 9


;; in both these functions (add5 and add4) the functions `adder` and
;; `adder-new` return a function that adds the operand to `m`


