# Pokédex

The Pokédex is an experimental journey in creating a front-end web page using React.JS. This project is intended for the fulfillment of the academic requirements of the Software Engineering Immersive programme from General Assembly.

## Description

The Pokédex is a web application where you can browse the extensive catalogue of Pokémon and view various details of each of them. Navigate through Generation I and gather insight to your favourite Pokémon.

This project was created in React.JS, utilising ChartJS as a visual library and Firebase Realtime Database as the back-end. Calls to the Firebase Realtime Database are made using the REST APIs provided by Firebase. As an academic exercise, reusable portions of the application are stored as generic components that accept different parameters required by the implementation. CSS is delivered as global instruction sets and localised modules.

Inspiration for this project is drawn from [the official Pokédex website in Singapore](https://sg.portal-pokemon.com/play/pokedex).

## List of Screens

A list of screens and their descriptions is included below.

1. **Splash Screen**

   The Splash Screen serves as the landing page for the application. Visually, it only contains the Pokémon logo as a button to navigate to the Home Screen. Behind the scenes, the Splash Screen serves as a delay before the user reaches the Home Screen as the `GET` query is running to fetch the initial batch of Pokémon to display on the Home Screen. This is to ensure that once the user navigates to the Home Screen, they do not have to wait for the first batch of Pokémon to load in.

2. **Home Screen**

   The Home Screen is the main page that users will navigate through in the application. The Home Screen is broken down into two portions - a section for the user to select their desired filter inputs, and a section that displays each Pokémon found. Each Pokémon is displayed as its own card. The display area is laid out as a grid comprising of four columns.

   On initial load, 12 Pokémon are displayed with the option for the user to load more Pokémon, 12 at a time. This additional loading is executed through the click of the `Load More` button found at the bottom of the display area. If all the Pokémon from the database has been loaded, the `Load More` button is hidden from view.

   Users are able to use the filter inputs at the top of the Home Screen to select specific element types to display. Upon clicking the `Filter` button, data for the selected element types will be fetched from the back-end.

   While data is being fetched, an activity indicator will be displayed to provide feedback to the user that the fetch query is running.

3. **Details Screen**

   The Details Screen provides the user with more information on the selected Pokémon. Height, weight, abilities and basic statistics are available on the Details Screen on top of the element types which are also available in the cards on the Home Screen. Users are also able to navigate between Pokémon (previous and next according to ID) from the Details Screen. The names of the previous and next Pokémon are also displayed.

   The basic statistics of the Pokémon are available through a button click on the `Base Stats` button which brings up a modal for statistics. Doughnut charts are used to display the statistics to provide meaningful information to the user. Each chart accepts a value of up to 255 (the maximum value for each statistic). The chart value is displayed in the middle of the chart and the chart label is displayed below the chart. A click event on the `Close` button will remove the modal from the DOM.

## List of Components

A list of components and their descriptions is included below.

1. **Button**

   The Button component is the first component that users will see upon navigating to the Home Screen. The button component is used as inputs for the user to filter the displayed Pokémon by element type. Each button has an active, inactive and hover state which are styled differently to provide feedback to the user. A `useState` hook is used within each button to store the active state as a boolean, while a `useRef` hook is used to check if the button for the respective element type is selected. A `useEffect` hook is used without dependencies to update the selection array whenever a button is made active or inactive.

2. **Card**

   The Card component contains the basic information of each Pokémon to be displayed. It contains artwork of the Pokémon, the Pokémon ID, name and element types. The entire card acts as a navigation link for users to click on to navigate to the Details Screen. Information required on the card is propped from the Home Screen.

3. **Activity Indicator**

   The Activity Indicator component provides visual feedback to the user while data is being fetched from the database. It is implemented in two areas of the Home Screen: 1) when the `Load More` button is clicked, and 2) when the `Filter` button is clicked. The implementation is slightly different between the two. The former keeps the current displayed cards on screen while the additional data is being loaded while the latter removes the current displayed cards and replaces them with the new data that was fetched.

4. **Modal**

   The Modal component is used to display the basic statistics of the selected Pokémon within the Details Screen. It is conditionally rendered to the screen utilising a boolean state from the Details Screen. The basic statistics data is propped to the Modal component from the Details Screen.

5. **Utility**

   The Utility component is created to house all frequently used utility functions and variables.

## Potential Future Implementations

- **Filter by Word Input**
- **Filter Reset Button**
- **Include Pokémon Element Weaknesses**
- **Include Pokémon Evolution Chain**
- **Include Pokémon Available Moveset**

## Issues Faced

- **Persistence of Button Active State**

  The active state of the filter buttons do not seem to persist from render to render. Seems like the button component is unmounting and remounting with each re-render. Current implemented workaround is to set the state with each button click and also with each mount (by checking against the selected element array that is passed as a `useRef` variable). Could potentially be because of the `forwardRef` call.
