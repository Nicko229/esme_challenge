# esme_challenge

Gnome search application that allows the user to search for gnomes in the fictional town Brastlewark. Searches can be run using first and last names. 

## Getting Started

run:

### `npm install`

to install the packages required.

### `npm start`

to start the development server at:

http://localhost:3000

## Image Caching and Performance

* Added react-image npm package which uses ```<Img />``` tags to cache images.

* Also using react-visibility-sensor tag ```<VisibilitySensor>``` to load images only when they appear on the screen for lazy loading. 

* Pagination was used to cut down on load times and present a more user friendly UI.