Title: Bash and Netcat
Date: 2020-01-12
Tags: Tech
Summary: Some bash tricks; named pipes, netcat, and a tcp proxy.

I have a fascination for bash based tooling. I prefer awk, sed, grep
over any fancy tooling. Anyway, recently I have discovered two really
cool features about Bash.

# TCP proxy using Named Pipes
We all know what pipes are in bash. Pipes in bash let you create data
streams from one process to another process. However the syntax of
using pipes with processess can be a bit difficult and restrictive.

For example, 
If you want to push the output of process A into process B, you would write it as such

    !bash
    A | B

This is similar to 

    #!bash
    A > file $ B < file
   

Named pipes are special files that can be used to pass data between
two processess. When a process writes to a named pipe the kernel
processess the data internally and does not write data to the file
system. Moreover named pipes are blocking, i.e. if there is no reader
present then you can not write to a named pipe. This feature makes it
ideal to signal backpressure etc etc.

You make a named pipe is bash using the `mkfifo <filename>` command. As you can
see, a named pipe is nothing but a first-in-first-out stream (with
some added bells and whistles).


In a cool hack you can make a TCP proxy using netcat and named pipes

    #!bash
    nc -lp 6000 <primary | nc localhost 5000 >primary

This uses the named pipe `primary` as a bidirectional pipe.

Let us see what is going on here.

- `nc -lp 6000 <primary` tells netcat to listen on locahost:6000 and accept inputs from the primary fifo.
- Then we push the output (which in this case is the response to the input that is being piped from the fifo) to the next netcat instance.
- `nc localhost 5000 >primary` this tells netcat to connect to a server running at port 5000 and send the output to the primary fifo.

## Whats more ?

You can even copy the entire TCP stream using this little tool called `tee`.

    #!bash
    nc -lvp 6000 <primary | tee mirror | nc localhost 5000 >primary

In this case you have to read from the `mirror` fifo and you should be
able to see all the traffic flowing through your proxy. Change the
fifo `mirror` to a real file and you will have a copy of the traffic.


