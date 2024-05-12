# Elevators Manager Specification Document

## Overall description:
The elevator manager project is the efficient management of a multi-elevator system in a building.

It can also handle many buildings with a variety of numbers of floors and elevators.

> Elevators Manager Project uses the principle of OOP - Object Oriented Programming. and writens in javascript with typescript extensions

## Documentation
The project uses a factory [factory.ts] to generate an HTML representation, using the following classes:

- absBuilding: an abstract class that creates a parent div and a child element
- Building: main div element to store the floor and elevator relevant to the building
- Floors: Generates a div for each floor
- Timer: Generates a timer to display the arrival time of the elevator.
- Elevators: Generates a div for each elevator

In order to manage the building's elevator system, each building created will be attached to a management department

- BuildingManager: responsible for the logic of the floor readings and elevator movements


To start building, the main file [index.ts] will read the instructions from a JSON file containing the following structure:

```
{
   "buildings":[{
       "numFloors":15,
       "numElevators":3
    }
  ]
}
```

The factory file contains the following functions:

- buildingsFactory
- floorFactory
- elevatorFactory


## Elevators Algorithm

The system Algorithm is implemented in the BuildingManager class.
It will create a stack for floors requests that will be checked every 10 msec

When floor button is clicked the floor will pused to the end of stack

The stackManager will check if the stack is not empty and if there is available elevator: if true:
the algorithm will search for the closest elevator and assign the elevator to reach the floor.

The algorithm will lock the elevator from getting another call and the floor from pressing the button again.

The algorithm will get the elevator and floor current position and start updating the elevator position until the elevator will reach the floor position

The algorithm will free the elevator and floor so that the elevator can be used again and the floor to call another elevator

