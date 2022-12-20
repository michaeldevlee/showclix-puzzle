# showclix-puzzle-solution
Your younger sister is putting on a puppet show in your family's back yard. She has left you in charge of ticketing the big event. She has informed you that she wants assigned seating. She plans on setting up 33 seats; 3 rows with 11 seats each. She already has several seats reserved for her parents and best friends. Being a good computer scientist, you decide to whip up a quick program to help her out.

## Project Description
For this problem, I used javascript to implement a graph data structure utilizing a BFS solution for finding the best seats for guests. 

## Installation

1. Clone this repo, or download it as a zip
2. Run `npm install` and start reviewing and messing around!

## Usage

1. Run "node driver" 
2. The `readline` interface will have initialized and you will be able to type in some input for the program! Please refer to the Examples section for input formatting

## Example

All of your younger sister's friends and family plus all her guests from her last birthday party want special reservations.
10 seats will be blocked out before they open up to the public.

Your first input line is the seat coordinates to be blocked out - displayed as R#C# (R = row , C = col) separated by one space. 
**Press enter when you are done with each input and your cursor will move down a line to take in your next input.**
```
R1C1 R2C2 R3C2 R3C3 R3C4 R3C5 R3C6 R5C1 R5C2 R5C3
```

Each input after the first is the party size for a given group (positive integer ranging from 1 - 10)
```
2
```

Immediately following your party size input, the best range of seats will print out right after your input
```
2
R1C6 - R1C7
3
R1C8 - R1C10
4
R2C6 - R2C9
```

Each party size input will automatically assign the group to the specified seat range and the `seatingChart` will update. Eventually you won't have room for certain large guests that crash the show too late.
```
2
R1C6 - R1C7
3
R1C8 - R1C10
4
R2C6 - R2C9
5
R3C7 - R3C11
6
Not Available
```


## Limitations

1. A weak solution to validate user input. Currently, inputs are considered reservation inputs if they contain both "R" and "C". If these conditions aren't met, the inputs will be processed as party size inputs.
2. The optimal position is based on the Manhattan distance of the closest seat to the front and center coordinate of the seating chart. If the number of rows are even, the optimal spot would be the space between two chairs. 

## Future Work

1. Implement a more efficient BFS solution where each row is evaluated only if there are enough seats in each row. This way, we don't traverse the entire `seatingChart` for each party size input.
2. Design robust user input validator for future-proof feature additions   

