const dotenv = require('dotenv').config();
const readline = require('readline');
const SeatingChart = require('./seatingChart');

async function driver() {
  // Initialize seating chart
  const seatingChart = new SeatingChart(3, 11);

  // create interface for input and output
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // while receiving inputs, if input has a R and C,
  // the input will be used to initally block out specific seats
  // for the younger sister's friends and family
  rl.on('line', async (line) => {
    if (line.includes('R') && line.includes('C')) {
      const reservations = line.split(' ');
      for (const reservation of reservations) {
        const [row, seat] = reservation.split('C');
        seatingChart.markSeatAsReserved(row.substring(1) - 1, seat - 1);
      }
    }
    // if the input does not have the above format,
    // each line will be evaluated as the size of the group
    // wishing to make additional reservations
    else{
      const numSeats = parseInt(line, 10);
      const seats = seatingChart.findBestAvailableSeats(numSeats);
      
      if (seats !== 'Not Available') {
        const startRow = seats[0];
        const startSeat = seats[1];
        const endRow = seats[0];
        const endSeat = startSeat + numSeats - 1;
        
        for (let i = startSeat; i <= endSeat; i++) {
          seatingChart.markSeatAsReserved(startRow, i);
        }

        // considering formatting for single vs a range of seats
        if (numSeats > 1){
        console.log(`R${startRow + 1}C${startSeat + 1} - R${endRow + 1}C${endSeat + 1}`);
          }
          else{
            console.log(`R${startRow + 1}C${startSeat + 1}`);
          }
          
      } else {
        console.log('Not Available');
      }
    }
  });

  rl.on('close', async () => {

    // Output the remaining available seats after interface is closed
    let availableSeats = 0;
    for (let i = 0; i < seatingChart.numRows; i++) {
      for (let j = 0; j < seatingChart.numSeats; j++) {
        if (!seatingChart.isSeatReserved(i, j)) {
          availableSeats++;
        }
      }
    }
    console.log(`${availableSeats} seats remaining`);
  });
}

driver();