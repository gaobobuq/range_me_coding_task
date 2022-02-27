# Range Me Coding Task (RMCT)

<p>
The purpose of this repository is to build a web application to search Flickr photos by tags. 
The project was built using React.<br>
Tests were written using JEST and puppeteer.
</p>

## Contents
- [Installation](#installation)
- [Details Considered](#details-considered)
- [Screenshots](#screenshots)

## Installation
The solution includes two projects, range_me_coding_task for React clientside and puppeteer_tests for end to end testing.
* To run the clientside, please install dependencies using `yarn install` within the `range_me_coding_task` directory, and execute `yarn start`.
* Run Jest tests using `yarn test`.
* And to run the end to end tests, please install dependencies using `yarn install` within the `puppeteer_tests` directory, and execute `yarn test`
* Since we are just building a frontend project to access an API with a different origin, so we need to install a chrome plugin to disable same-origin policy in chrome to make the project functional:
  https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
  <br/>
  (or other alternative plugins)

## Details Considered
Several details have been considered during the development of this project.
* Jest tests and end-to-end tests, end-to-end tests are included to ensure the feature is fully functional.
* Responsive UX design.
* Debounce search input is used for user typing event. The application fetches data from API with 500ms delay after the user stops typing, to reduce redundant API calls.
* Pagination for displaying flickr data items.
* When the photo is not available, a "no image available" placeholder photo will be displayed. (see screenshot below)
* When there are no search results, a "no result found" placeholder image will be shown. (see screenshot below)

## Screenshots
On a large size window:
<br/>
![frontend-large](readme/frontend-large.png "frontend-large")

On a small size window:
<br/>
![frontend-small](readme/frontend-small.png "frontend-small")

When the search results are empty:
<br/>
![images-not-found](readme/images-not-found.png "images-not-found")

When photo is not available:
<br/>
![image-not-available](readme/image-not-available.png "image-not-available")
