let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
let board = [];
let isBoardLoaded = false;
let printBoard = [];


const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4) {
                if(xhttp.status === 200) {
                    resolve(JSON.parse(xhttp.responseText));
                }else {
                    reject(new Error('Error', url_api));
                }
            }
        });
        xhttp.send();
    });
}

const handleData = async (url_api) => {
    try {
        
        const data = await fetchData(url_api);
        const character = await fetchData(`${API}${data.results[Math.floor(Math.random() * 20)].id}`);
        const characterName = character.name;
        const characterImage = character.image;
        
        //console.log(character);
        board.push({'TagImagen':`<img src="${characterImage}>`, 'TagNombre': `<p>${characterName}</p>` });
        if(board.length === 9){
            isBoardLoaded = true;
            console.log(board);
            console.log(isBoardLoaded);
            return isBoardLoaded;
        }
    } catch (error) {
        console.error(error);
    }
}

const printingBoard = ()=> {
    setTimeout(()=> {
        if (isBoardLoaded){
            console.log(`aquiiiii}`);
            board = printBoard;
            return document.getElementById("cardCharacter").innerHTML = 
                `<img src="${board[0].characaterImage}><p>${board[0].characterName}</p>`
        }else{'Tablero no cargado'}

    }, 2000);
}

const trigerRandomCard =() => {
    for(let i = 0; i < 9 ; i++){
        handleData(API);
    }
}

console.log('Before');
trigerRandomCard();
printingBoard();
console.log('After');