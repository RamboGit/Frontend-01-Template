# Week11 周总结
## 异步编程
### Timers 
#### setTimeout()、clearTimeout()
```
handle = self . setTimeout( handler [, timeout [, arguments... ] ] )
Schedules a timeout to run handler after timeout milliseconds. Any arguments are passed straight through to the handler.

handle = self . setTimeout( code [, timeout ] )
Schedules a timeout to compile and run code after timeout milliseconds.

self . clearTimeout( handle )
Cancels the timeout set with setTimeout() or setInterval() identified by handle.
```
#### setInterval()、clearInterval()
```
handle = self . setInterval( handler [, timeout [, arguments... ] ] )
Schedules a timeout to run handler every timeout milliseconds. Any arguments are passed straight through to the handler.

handle = self . setInterval( code [, timeout ] )
Schedules a timeout to compile and run code every timeout milliseconds.

self . clearInterval( handle )
Cancels the timeout set with setInterval() or setTimeout() identified by handle.
```
### Promise Objects
#### promise states
- fulfilled
- rejected
- pending
