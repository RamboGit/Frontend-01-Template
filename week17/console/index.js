/*
参考地址： https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal/10830168

https://github.com/heapwolf/cdir/blob/223fe0039fade4fad2bb08c2f7affac3bdcf2f89/cdir.js#L24

http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html

https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin

*/
/*var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');
const readline = require('readline');

// var stdin = ttys.stdin;
// var stdout = ttys.stdout;

// stdout.write('hello  world!\n');
// stdout.write('\033[1A');  //往上
// stdout.write('change\n');

//ReadLine
const nodeRl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

nodeRl.question('你如何看待 Node.js 中文网？', (answer) => {
    // TODO：将答案记录在数据库中。
    console.log(`感谢您的宝贵意见：${answer}`);
  
    nodeRl.close();
  });*/

var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;


var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

function getChar() {
    return new Promise(resolve => {
        stdin.once( 'data', function( key ){
            resolve(key);
          });
    });
}

function up(n = 1) {
    stdout.write('\033[' + n + 'A');
}

function down(n = 1) {
    stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
    stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
    stdout.write('\033[' + n + 'D');
}

function redColor(){
    stdout.write("\033[31m");
}

function blueColor() {
    stdout.write("\033[36m");
}

function resetColor() {
    stdout.write("\033[0m");
}

 void async function() {
    stdout.write('which framework do you want to use\n');
    let answer = await select(["Vue","React","Angular"]);
    blueColor();
    stdout.write("You selected " + answer + "\n");
   
    process.exit();
}(); 

async function select(choices) {
    let selected = 0;
    
    for(let i = 0;i < choices.length; i++) {
        let choice = choices[i];
        if( i === selected) {
            resetColor();
            stdout.write("[*] " + choice + "\n");
        }else{
            redColor();
            stdout.write("[ ] " + choice + "\n");
        }
    }
    up(choices.length);
    right();

    while(true) {
        let char = await getChar();
        if(char === "\u0003"){
           process.exit();
           break; 
        }
        if(char === "w" && selected > 0) {
            stdout.write(" ");
            left();
            selected --;
            up();
            stdout.write("*");
            left();
        }
        if(char === "s" && selected < choices.length - 1) {
            stdout.write(" ");
            left();
            selected ++;
            down();
            stdout.write("*");
            left();
        }
        if(char === "\r") {
            down(choices.length - selected);
            return choices[selected];
        }
    }
}
