
function mean(scores) {
    if (scores.length === 0) {
        return 0;
    }
    
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    
    return sum / scores.length;
}

const notes = [12, 15, 18, 10, 14];
console.log("Notes:", notes);
console.log("Moyenne:", mean(notes));


const notes2 = [8, 11, 13, 16];
console.log("Notes:", notes2);
console.log("Moyenne:", mean(notes2));


module.exports = mean;