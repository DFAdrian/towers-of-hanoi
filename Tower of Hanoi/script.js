const btn = document.querySelector('button')
const inp = document.querySelector('input')
const ul = document.querySelector('ul')
let num = 0

class Node {
    constructor(content,next = null){
        this.content = content;
        this.next = next;
    }
}

class Stack{
    constructor(){
        this.top = null;
    }
    
    push(value){
        const newNode = new Node(value)
        if(!this.top){
            this.top = newNode
        }else{
            newNode.next = this.top
            this.top = newNode
        }
    }

    pop(){
        if (!this.top) return null
        const content = this.top.content
        this.top = this.top.next
        return content
    }

    traverse(){
        let currentNode = this.top
        let arr = [];
        while(currentNode !== null){
            arr.unshift(currentNode.content)
            currentNode = currentNode.next
        }
        return arr
    }
    
    peek(){
        return this.top ? this.top : null 
    }
}

const stackA = new Stack()
const stackB = new Stack()
const stackC = new Stack()


// Fill stack A with the specified number of disks
function fillStack(n){
    for(let i = n;i>0;i--){
        stackA.push(i)
    }
}


// Move the top disk from stack a to stack b
function move(a,b){
    const disc = a.pop()
    b.push(disc)
}

function runHanoi(numDisks, source, aux, dest) {

    if (numDisks == 1) {
        move(source, dest);
        num++;
    } else {
        runHanoi(numDisks-1, source, dest, aux);
        move(source, dest);
        num++;
        runHanoi(numDisks-1, aux, source, dest);
    }

}


// Parse the user's input and return its numeric value, or null if not a number

function getNumber(input){
    const value = parseInt(input.value);
    if (isNaN(value)) return null;
    return value;
}

//Display stack A and C before solving the puzzle
function displayBefore(){
    ul.innerHTML += `<li> Stack A before: ${stackA.traverse()} </li>`
    ul.innerHTML += `<li> Stack C before: ${stackC.traverse()} </li>`
}

// Display stack A and C after solving the puzzle, along with the number of moves taken
function displayAfter(){
    ul.innerHTML += `<li> Stack A after: ${stackA.traverse()} </li>`
    ul.innerHTML += `<li> Stack C after: ${stackC.traverse()} </li>`
    ul.innerHTML += `<li>Congratulations!! you solved the Towers of Hanoi in ${num} moves</li>`

}



btn.addEventListener('click',()=>{
    btn.disabled = true;
    const numDisks = getNumber(inp);
    if (numDisks !== null){
        fillStack(numDisks);
        displayBefore()
        runHanoi(numDisks, stackA, stackB, stackC);
     }
    displayAfter()
    inp.value = '';
});


