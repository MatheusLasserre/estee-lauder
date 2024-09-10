# How to run the project
First, clone the project:
```
git clone https://github.com/MatheusLasserre/estee-lauder.git
```
Then, go to the project root and start the container with docker-compose -- or make your own MySQL container
```
docker-compose up -d
```
After that, just install the dependencies:
```
npm install
```
And finally, setup and run the project:
```
npm run setup
```
### OBS: since this a test, i updated the gitignore to send the .env file, since it just has localdata for you to use. The purpose of this is so you don't have to change any code to run the project.\

# First Steps - My take before starting to code

-> Create a docker-file for the MySQL database, to anyone can use and test this project.\
-> Design the database based on the Food Trucks file to find some good solutions fot the given data.\
    -> Filter by X and Y not null, since this is the only data that can surely give me the right location of the food truck automatically without human on AI help.\
    -> The Food Truck component should have the following informations:\
        -> Name\
        -> Address (LocationDescription, Address, block, lot)\
        -> Working days (Can be empty and has a pattern that can be transformed to the database in a way that it can be used to filter the food trucks)\
        -> Food Items\

-> Create a Seed Script for the MySQL docker setup.\
-> The purpose of the application is to be able to find one or more food trucks given the selected filters and provide the available information to the user.\
    -> The home-page will as simple as a "I want food! -- in a truck", have a brief description and then a query input with some filters.\
    -> On searchEnd, show the available results in a paginated format if more than 10, give a link to open the truck on GoogleMaps and show the provided informations.\
    -> Save favorites on LocalStorage.\

# Final thoughts
 With the time that i have, i couldn't finish the search by location and couldn't save the favorites at the localStorage. I also had to make a tradeoff: code readability for features. The code is not bad, but could be better. Also, the design is kinda off. If i had more time, these would be the things i would fix.





