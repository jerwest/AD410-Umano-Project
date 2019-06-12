AD410 Umano Project

In order to use this application:

1. We used Express.js to build this - if you need help setting up refer to this documentation in order to install and run an express app successfully, particularly the npm install and the commands to run in localhost: https://expressjs.com/en/starter/generator.html

2. Though this will eventually be used in tandem with firebase, this app does not currently implement ayd firebase features. So, if you get to that point, know that firebase is not used yet. 

3. This app requires a google maps api key. You must create one in order to use it. Right now, the repo is set to private, so we did not worry about keeping the api key hidden. This is not best practice; it would better to place it in a file outside the repo. You must be careful to not accidently publish the api key to github in a public account. Here is the link to setting up a google api key: https://developers.google.com/maps/documentation/javascript/get-api-key

4. If you wish to add a property, at this point the best way is to insert it into the geojson file, making sure all the fields line up properly. Eventually, it would be nice to have this as a feature hooked up to firebase. 

These are all the important things to know in order to successfully use this app! Thanks for reading!
