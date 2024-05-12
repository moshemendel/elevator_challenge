# Elevators Manager Specification Document

## Overall description:
The elevator manager project is the efficient management of a multi-elevator system in a building.

It can also handle many buildings with a variety of numbers of floors and elevators.

> Elevators Manager Project uses the principle of OOP - Object Oriented Programming. and writens in javascript with typescript extensions

## Documentation
The project uses the following classes to build the HTML representation:

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

It will then call the factory file containing the following functions:

- buildingsFactory
- floorFactory
- elevatorFactory

> buildingsFactory: assigned to iterate over the buildings instructions array, and generate a building,
> floors and elevators for each building in the array.
> The function will attach the building to the BuildingManager and then call the floorFactory and elevatorFactory functions

> floorFactory: accepts the building instance among other arguments and will create the floors and inserting them into the building div

> elevatorFactory: same as floorFactory

## explenation

### Class - absBuilding

An abstract class for the Building, Floor and Elevator classes.
includes two methods:

- createParentElement: creates the parent element for each class
- createChildElement: abstract method to create the child elements

### Class - Building

Extends absBuilding class.
excepts the following arguments:

- numFloors: the number of floors in the building

#### properties:

- buildingDiv: The main building element for the building floors and elevators. Created by createParentElement method
- floorsDiv: Container for floors elements. Created by createChildElement method
- elevatorsDiv: Container for elevetors element. Created by createChildElement method
- numFloors: get value from "numFloors" arg
- floorPixels: represents the floor height
- buildingHeight: represent the building height - numFloors \* floorPixels

#### methods:

- createChildElement: create the child elements (floorsDiv and elevatorsDiv)
- getElevatorTopPos: get the position from bottom floor for the elveator top position
- addElevator: add an elevator element to elevatorDiv.
- addFloor: add a floor element to floorDiv

### Class - Floor

Extends absBuilding class.
excepts the following arguments:

- floorNumber: the floor number in the building

#### properties:

- floorNumber: represents the floor number
- floorDiv:  Floor constainer div. Created by createParentElement method
- floorBtn: Press button to trigger the elevator. Created by createChildElement method
- timer:
- \_isPressed:

#### methods:

- createChildElement:
- getElevatorTopPos:
- addElevator:
- addFloor:
