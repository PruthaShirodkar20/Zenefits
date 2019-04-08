# Places Near Me

The project successfully demonstrates functionalities developed using Google Map apis

## Getting Started

Instructions for successfully executing the project.

### Prerequisites

1) The project needs an api key for using the Google Maps api, you can refer this link for steps to get the key:
https://developers.google.com/maps/documentation/javascript/get-api-key

2) Enable the following api-
i) Directions api
ii)Maps Javascript api
iii)Places api
iv) Geocoding api

### Installing

IDE for editing purposes- atom or brackets prefered

## Execution

Open the index.html file by double clicking in a browser (chrome browser prefered)

##Functionalities Implemented

General functionalities-
The application successfully detects the user's current location on initial rendering.

Specific functionalities-

1) Enter location input field: 
i)User must input the destination address in this field.
ii) The address is autocompleted.

2)Cafe/Restaurants input field:
i)User must input the specific category of destination say cafe, parks etc. to refine the search

3)Search Button:
i)The search button will search for the relevant places based on the specific location and category.
ii) The list of nearest places along with their addresses is displayed.

4)List:
When clicked on the specific row of the list, the respective place is prompted on the map with a marker.

5)Clear:
The clear button is used for a new search and clearing all the current input fields.

6)Near Me:
i)The near me button when clicked will calculate the nearest destination to the user, however would not display any details for the same.
ii)The destination details will be stored in the localstorage and will only be retrieved once the Details buttons is clicked.

7)Details:
i)The details button when clicked provides the nearest destinatio details namely address and time of travel.
ii)To indicate the two locations, a route will be generated between the source and the destination locations using polyline.
iii) Due to limited access for free Google Map account, I was unable to use some services for showing the routes hence used simple polyline.


## Authors

Prutha Shirodkar

## Acknowledgments

References-
https://developers.google.com/maps/documentation/javascript/tutorial
