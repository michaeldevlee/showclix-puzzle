
// implementation of the seating chart 
// data structure: graph data structure (represented by a map object in js)
// algorithm: breadth first search (displayed through line 44 findBestAvailableSeats method)

class SeatingChart {

    // initializing empty seating chart
    // with specified number of rows, and number of seats per row
    constructor(numRows, numSeats) {
      this.numRows = numRows;
      this.numSeats = numSeats;
      this.graph = new Map();

      // setting reserved property on each seat as false 
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numSeats; j++) {
          const seatId = this.getSeatId(i, j);
          this.graph.set(seatId, { reserved: false });
        }
      }
    }

    //retrieving a specific seat
    getSeatId(row, seat) {
        return row * this.numSeats + seat;
      }

    //marking a specific seat as reserved
    markSeatAsReserved(row, seat) {
      const seatId = this.getSeatId(row, seat);
      this.graph.set(seatId, { reserved: true });
    }
  
    //checking if specific seat is reserved
    isSeatReserved(row, seat) {
      const seatId = this.getSeatId(row, seat);
      return this.graph.get(seatId).reserved;
    }
  
    //find best available group of consecutive seats
    findBestAvailableSeats(numSeats) {

        // add seat to the queue for traversal if the seat is NOT reserved
        // also add the seat's Manhattan distance from the center of the front row 
        const queue = [];

        // my definition of the center to calculate the manhattan distance
        // accounting for even / odd number of seats per row
        const center = this.numSeats / 2;

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numSeats; j++) {
            if (!this.isSeatReserved(i, j)) {

                //Manhattan distance from the center 
                const distance = Math.abs(0 - i) + Math.abs(center - j);
                queue.push([i, j, distance]);
            }
            }
        }

        //sort by increasing order from left (closest) to right (furthest)
        queue.sort((a, b) => a[2] - b[2]);
      
        // traverse through queue
        while (queue.length > 0) {
          const seat = queue.shift();

          // if the current seat is not reserved
          if (!this.isSeatReserved(seat[0], seat[1])) {
            
            // it is an available seat to consider for our group
            let available = 1;

            // since this seat is available, traverse the rest of the row and check the next seat to the right
            for (let i = seat[1] + 1; i < this.numSeats; i++) {

              // if the next seat is available, add it to our number of avaiable seats
              if (!this.isSeatReserved(seat[0], i)) {
                available++;
              } else {
                
                // if at any point after the initial seat, we reach a reserved seat
                // stop traversal and default to "Not Available"
                // because this part of the row can't accomodate all of our guests
                break;
              }
            }

            // if there were no reserved seats that we came across,
            // return the first seat and the last seat of our traversal
            // this will give us the best range of seats for the specified group
            if (available >= numSeats) {
              return [seat[0], seat[1]];
            }
          }
        }
        return 'Not Available';
      }
}

  module.exports = SeatingChart;