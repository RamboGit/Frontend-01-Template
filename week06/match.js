/**
 * 解析'abababx'
*/

function match(string){
    let state = start;
    for(let char of string){
        console.log(state, char);
        state = state(char);
    }
    return state === end;
}

function start(c){
    if(c === 'a'){
        return foundA;
    }
    return start;
}
function foundA(c){
    if(c === 'b'){
        return foundB;
    }
    return start(c);
}
function foundB(c){
    if(c === 'a') {
        return foundNextA;
    }
    return start(c);
}
function foundNextA(c){
    if(c === 'b'){
        return foundNextB;
    }
    return start(c);
}
function foundNextB(c){
    if(c === 'a') {
        return foundEndA;
    }
    return start(c);
}
function foundEndA(c){
    if (c === 'b'){
        return foundEndB;
    }
    return start(c);
}
function foundEndB(c){
    if(c === 'x'){
        return end;
    }
    return foundNextB(c);
}
//test
console.log(match('abaaaaaaababababx'));