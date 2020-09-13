Title: Stack Frames in x86
Date: 2020-09-13
Tags: CS


A very brief primer on x86 Stack Frames. Stumbled onto this while
reading about linux performanc monitoring tools. It's been a while
since I looked at assembly code so this was more fun than I expected.

Anyhow, This post will summarize some basics of what are Stack Frames
and How function calls work.

Note: In our study of the stack we will talk about a program that has multiple functions in it. These functions are "sub-routines".

# The Stack (x86)

When a program is being executed, it is called a process. Every
process is given some amount of memory for them to use. This chunk of
memory is called the process' stack.

The Stack is a Last In First Out data structure. In x86 the stack grows
downwards. Which means that the `bottom` of the stack has the highest
memory address and the `top` of the stack has the lowest memory
address. We will not get into the reasosn for such a design, but there
are other systems where the stack does not work this way.

The main function of the stack is to keep track of execution
environment of the entire process and to maintain the control-flow
between function calls. This means keeping track of the important
details for every function call. This is done by using "Stack
Frames". Essentially a new "stack frame" is created on the stack when
a new function is executed.


# The x86 Stack Frame

The Stack Frame is a part of the process' stack that is responsible
for keeping track of the execution env that is relevant only to that
funciton call. 

The processor creates a new stack frame whenever there is a new
function call. Each stack frame hold the following details
    
- Parameters
- Frame Pointer to previous Stack Frame's base 
- Return Address 
- Data (Local variables and Parameters)

When we look at the assembly code, every function has a prolouge and
an epilouge. These are the sections that are responsible for building
the stack frame for that function as well as tearing down the stack
frame when the control-flow needs to return to the caller function.

# Let us read some Assembly!! #

Let us use an example program to understand this.

    :::c
    int foo(int a)
    {
        int x = 2;
        int y = 3;
        x = a + x;
        return x;
    }

    int main()
    {
        int a = 2;
        int b = 1;
        foo(a);
    }


Compile this using gcc to a 32 bit target. 
    
    :::bash
    gcc -m32 func_call.c

Now, generate the assembly output using `objdump`. (you can use gdb for this too, or any other too you like)
    
    :::bash
    objdump -d -M intel a.out

The only sections that we will focus on are the `main` and the `foo` sections.

    :::objdump-nasm
    000004ed <foo>:
        4ed:	55                   	push   ebp
        4ee:	89 e5                	mov    ebp,esp
        4f0:	83 ec 10             	sub    esp,0x10
        4f3:	e8 4e 00 00 00       	call   546 <__x86.get_pc_thunk.ax>
        4f8:	05 e4 1a 00 00       	add    eax,0x1ae4
        4fd:	c7 45 f8 02 00 00 00 	mov    DWORD PTR [ebp-0x8],0x2
        504:	c7 45 fc 03 00 00 00 	mov    DWORD PTR [ebp-0x4],0x3
        50b:	8b 45 08             	mov    eax,DWORD PTR [ebp+0x8]
        50e:	01 45 f8             	add    DWORD PTR [ebp-0x8],eax
        511:	8b 45 f8             	mov    eax,DWORD PTR [ebp-0x8]
        514:	c9                   	leave  
        515:	c3                   	ret    

    00000516 <main>:
        516:	55                   	push   ebp
        517:	89 e5                	mov    ebp,esp
        519:	83 ec 10             	sub    esp,0x10
        51c:	e8 25 00 00 00       	call   546 <__x86.get_pc_thunk.ax>
        521:	05 bb 1a 00 00       	add    eax,0x1abb
        526:	c7 45 f8 02 00 00 00 	mov    DWORD PTR [ebp-0x8],0x2
        52d:	c7 45 fc 01 00 00 00 	mov    DWORD PTR [ebp-0x4],0x1
        534:	ff 75 f8             	push   DWORD PTR [ebp-0x8]
        537:	e8 b1 ff ff ff       	call   4ed <foo>
        53c:	83 c4 04             	add    esp,0x4
        53f:	b8 00 00 00 00       	mov    eax,0x0
        544:	c9                   	leave  
        545:	c3                   	ret    
        



<br>
<hr>
> We will walk through the calling  code, the entry sequence and the sequence to get a better understanding.


### The Function-Call sequence ###

    :::nasm
    push   DWORD PTR [ebp-0x8]
    call   4ed <foo>
    
In this segement we are leading the value stored in the memory
location `ebp-0x8` into the stack and then we `call` the foo
subroutine. parameters are passed using the stack (pushed onto the
stack) and the results are returned by using the `eax` register.

The `call` instruction also pushes the return address onto the
stack. This is done so that the control-flow can return to where it
branched from. It is generally `ip+0x2`

Read more about this in the [x86 calling conventions](https://en.wikipedia.org/wiki/X86_calling_conventions)

###### NOTE: To understand this, we will ignore the `DWORD PTR`. It is not too imp for our goals. ######

### The Entry Sequence ###

Notice the first two lines of both the functions.

    :::nasm
    push   ebp
    mov    ebp,esp

In this sequnce we built the stack from for the current function. 


After ther `call` in the previous section, the control flow jumps to
this instruction. This instruction pushes the `current base pointer`
to the stack. This is base pointer of the caller function. After that
we set the current value of the `esp` as the `base pointer` for the
current frame.

Thus the `stack frame` for `foo` function (or the `callee` function) contains the following, in-order.

    :::bash
    +========================+
    |                        |
    |  Previous Stack-Frame  |
    |      (main func)       |
    |                        |
    +========================+
    |      Parameter 1       |
    +------------------------+
    |     Return Address     |
    +------------------------+
    |   Base Pointer (foo)   |
    +------------------------+ <---- ebp foo
    |     Local variables    |
    +------------------------+
    |     Local variables    | 
    +========================+ <---- esp foo
    
1. Parameters
2. Return Address
3. Base Pointer of previous frame
4. Local Variables.

### The Exit Sequence ###

    :::nasm
    leave
    ret







## NOTEs

    ============
    parent frame   [EBP-Parent]
    ------------
    parameters
    -----------
    return address
    ============
    saved EBP of parent frame 
    ------------
    child frame
    ===========
