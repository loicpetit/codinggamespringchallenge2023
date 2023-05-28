/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const numberOfCells = parseInt(readline()); // amount of hexagonal cells in this map
for (let i = 0; i < numberOfCells; i++) {
    var inputs = readline().split(' ');
    const type = parseInt(inputs[0]); // 0 for empty, 1 for eggs, 2 for crystal
    const initialResources = parseInt(inputs[1]); // the initial amount of eggs/crystals on this cell
    const neigh0 = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
    const neigh1 = parseInt(inputs[3]);
    const neigh2 = parseInt(inputs[4]);
    const neigh3 = parseInt(inputs[5]);
    const neigh4 = parseInt(inputs[6]);
    const neigh5 = parseInt(inputs[7]);
}
const numberOfBases = parseInt(readline());
var inputs = readline().split(' ');
for (let i = 0; i < numberOfBases; i++) {
    const myBaseIndex = parseInt(inputs[i]);
}
var inputs = readline().split(' ');
for (let i = 0; i < numberOfBases; i++) {
    const oppBaseIndex = parseInt(inputs[i]);
}

// game loop
while (true) {
    for (let i = 0; i < numberOfCells; i++) {
        var inputs = readline().split(' ');
        const resources = parseInt(inputs[0]); // the current amount of eggs/crystals on this cell
        const myAnts = parseInt(inputs[1]); // the amount of your ants on this cell
        const oppAnts = parseInt(inputs[2]); // the amount of opponent ants on this cell
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');


    // WAIT | LINE <sourceIdx> <targetIdx> <strength> | BEACON <cellIdx> <strength> | MESSAGE <text>
    console.log('WAIT');
    // console.log('BEACON 8 1; BEACON 6 1; BEACON 2 1; BEACON 0 1; BEACON 1 1; BEACON 3 5; BEACON 5 5; BEACON 7 5')
}
