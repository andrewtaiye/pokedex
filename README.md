# Pokédex

The Pokédex is an experimental journey in creating a front-end web page using React.JS. This project is intended for the fulfillment of the academic requirements of the Software Engineering Immersive programme from General Assembly.

## Description

The Pokédex is a web application where you can browse the extensive catalogue of Pokémon and view various details of each of them. Navigate through Generation I and gather insight to your favourite Pokémon.

This project was created in React.JS, utilising ChartJS as a visual library and Firebase Realtime Database as the back-end. Calls to the Firebase Realtime Database are made using the REST APIs provided by Firebase. As an academic exercise, reusable portions of the application are stored as generic components that accept different parameters required by the implementation. CSS is delivered as global instruction sets and localised modules.

Inspiration for this project is drawn from [the official Pokédex website in Singapore](https://sg.portal-pokemon.com/play/pokedex).

## List of Screens

A list of screens and their descriptions are included below.

1. **Splash Screen**

   The Splash Screen serves as the landing page for the application. Visually, it only contains the Pokémon logo as a button to navigate to the Home Screen. Behind the scenes, the Splash Screen serves as a delay before the user reaches the Home Screen as the `GET` query is running to fetch the initial batch of Pokémon to display on the Home Screen. This is to ensure that once the user navigates to the Home Screen, they do not have to wait for the first batch of Pokémon to load in.

2. **Home Screen**

   The Home Screen is the main page that users will navigate through in the application. The Home Screen is broken down into two portions - a section for the user to select their desired filter inputs, and a section that displays each Pokémon found. Each Pokémon is displayed as its own card. The display area is laid out as a grid comprising of four columns.

   On initial load, 12 Pokémon are displayed with the option for the user to load more Pokémon, 12 at a time. This additional loading is executed through the click of the `Load More` button found at the bottom of the display area. If all the Pokémon from the database has been loaded, the `Load More` button is hidden from view.

3. **Details Screen**

   The Details Screen provides the user with more information on the selected Pokémon. Height, weight, abilities and basic statistics are available on the Details Screen on top of the element types which are also available in the cards on the Home Screen. Users are also able to navigate between Pokémon (previous and next according to ID) from the Details Screen. The names of the previous and next Pokémon are also displayed. The basic statistics of the Pokémon are available through a button click on the `Base Stats` button which brings up a modal screen for statistics.

   - **Statistics Screen**

   The Statistics Screen displays the six basic statistics of each Pokémon. The screen is modal, overlaying the Details Screen when added to the DOM. Doughnut charts are used to display the statistics to provide meaningful information to the user. Each chart accepts a value of up to 255 (the maximum value for each statistic). The chart value is displayed in the middle of the chart and the chart label is displayed below the chart. A click event on the `Close` button will remove the modal screen from the DOM.

## List of Features

Displayed below is a list of features implemented in the project.

1. **Map Drawing**

   Map drawing is managed by the HTML `<canvas>` element. Context is set to `2d` for the rendering of the map. As the map is based on the pixel art form, a 16 x 16 tileset is used. The tileset is put together in photoshop first, then included as an asset for canvas to render.

   A game loop is used to continuously update and re-render the map with every frame. This game loop resides within the `World` class. Each loop starts by clearing the entire canvas and is set to repeat every 16 milliseconds. All game objects are then updated and the lower map, game objects and upper map are then rendered in sequence. This sequence allows for elements of the map to overlap with the game objects (e.g. in the event where a character is moving behind some trees or behind buildings).

   Map data is stored within the `window.OverworldMaps` element and resides within the `OverworldMap` class. The data in the overworld maps object contains configuration information such as the image sources for the lower and upper maps, configuration for game objects, tiles with cutscenes, and a list of walls for collision detection.

2. **Game Objects**

   All objects that can be interacted with are created by the `GameObject` class. NPCs are created by the `Person` class which are an extension of the game object class. The distinction was made such that future expansion would be possible if other categories of objects require interactions. In this case, the `healingWell` is the only inanimate object and thus is also created using the person class for simplicity's sake.

   Note that all data within the `configObjects` object in the overworld maps object are meant as a template and should not be directly altered. Live game objects are created using the `mountObjects()` method what is part of the overworld map class. The `mountObjects()` method takes every key within `configObjects` and creates a new person class using the stored data. Each class is then included, as a value with the object id as its corresponding key, in the `gameObjects` property. This new object of key-value pairs is then used throughout the rest of the project.

   Each game object contains a corresponding `Sprite` class which is used to render the object on the canvas. The sprite class takes in the image source, checks if the object uses a shadow, and renders the objects accordingly. As game objects utilise a 32 x 32 spritesheet, the full `drawImage` constructor is used to determine which frame to draw. Sprites are also offset upwards and to the left to allow proper use of character coordinates within the 16 x 16 tileset (i.e. the 32 x 32 frame would normally take up 4 tiles, but the character is offset to be rendered in the correct 16 x 16 tile). Another modifier is utilised to create the 'centered camera' effect while navigating the map.

   - **Object Animations**

     Object animationed are managed by the `Sprite` class. A list of animations is stored in the `animations` property as an array of arrays - an array of animations, each with an array of coordinates pointing to the specific frames.

     Note that as the 'people' sprites only contain walking animations and not idle animations, the idle animations for 'people' and 'monsters' have been split up. Ideally, both categories of objects should have walking and idle animations and will be able to utilise the same animation code block.

     Properties are set up for the class to include the current animation (`currentAnimation`), the current animation frame (`currentAnimationFrame`), an animation frame limit (`animationFrameLimit`) and the animation frame progress (`animationFrameProgress`). The animation frame limit determines how many times a frame will be displayed before moving on to the next frame. A lower frame limit will make the objects animate faster.

     At the start of each animation, the animation frame progress is set to the animation frame limit and ticks down with every game loop. If the animation frame progress is greater than 0, the animation will not move on to the next frame. If the animation frame progress is 0, the animation will move on to the next frame by increasing the index of the current animation frame. If the index for the next frame increases beyond the animation array's length, it is set to 0 and the animation loop restarts. This allows for objects with different animation lengths, but those animations will need to be specified separately from the rest of the animations within the `animations` array.

3. **Map Navigation**
   - **Collision Detection**
   - **Camera Movement**
4. **Key Bindings**
5. **NPC Behaviours and Interactions**
   - **Typewriter Effect**
6. **Cutscenes and Activation Methods**
7. **Battle Mechanics**
   - **Battle UI**
   - **Battle Menus**
   - **Turn Cycle**
   - **Combatants**
   - **Attacks and Damage Formulas**
   - **Items**
   - **Statuses**
   - **Experience Points Distribution and Tables**
   - **Persistent Character State**
8. **Character Stats and Growth**
9. **Monster Respawn Timer**
10. **Village Healers**
11. **Title Screen**

## Potential Future Implementations

- **Pause Menu**
- **Overworld UI**
- **Saving Game State**

## Issues Faced

- **Launching an Event within an Event**
- **Infinite Loop of Properties**
