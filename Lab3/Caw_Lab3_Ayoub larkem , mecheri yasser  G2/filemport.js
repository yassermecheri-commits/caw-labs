
const mean = require('/notation');


const mesNotes = [15, 11, 12, 14, 10];
const moyenne = mean(mesNotes);


console.log("Notes:", mesNotes);
console.log("Moyenne:", moyenne);


const autresNotes = [10, 11, 10, 12, 10, 13];
console.log("autres notes:", autresNotes);
console.log("moyenne:", mean(autresNotes));