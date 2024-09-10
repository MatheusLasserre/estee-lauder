# First Steps

-> Create a docker-file for the MySQL database, to anyone can use and test this project.
-> Design the database based on the Food Trucks file to find some good solutions fot the given data.
    -> Filter by X and Y not null, since this is the only data that can surely give me the right location of the food truck automatically without human on AI help.
    -> The Food Truck component should have the following informations:
        -> Name
        -> Address (LocationDescription, Address, block, lot)
        -> Working days (Can be empty and has a pattern that can be transformed to the database in a way that it can be used to filter the food trucks)
        -> Food Items

-> Create a Seed Script for the MySQL docker setup.
-> The purpose of the application is to be able to find one or more food trucks given the selected filters and provide the available information to the user.
    -> The home-page will as simple as a "I want food! -- in a truck", have a brief description and then a query input with some filters.
    -> On searchEnd, show the available results in a paginated format if more than 10, give a link to open the truck on GoogleMaps and show the provided informations.
    -> Save favorites on LocalStorage.






Challenge:
Traduzir e salvar os dados abaixo para o README, pois fazer parte dos meus pensamentos
Seed:
	-> Filtrar por X e Y não nulos
	-> Endereço: LocationDescription, Address, block, lot
	-> Pegar dias em dayshours, vazio é indefinido
	-> Usar coordenadas pra saber o local, pois os endereços são muito aleatórios
	-> Usar : como separador dos foodItems
	-> Tabela com todos os fooditems
	
	
-> Usar ip pra localizar, ou pedir uma região de São Francisco
-> Colocar um search query em "What are you looking for?"
-> Colocar uma distância máxima do pedido
-> Colocar opção "Aberto agora"