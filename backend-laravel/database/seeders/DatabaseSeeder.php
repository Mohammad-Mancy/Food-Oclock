<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $names =["Ali","Joe","Hassan","Goerge","Maria","Zeinab","Elianore","Fatima","Mohammad","Mahdi"];
        foreach (range(1,10) as $index) {
            DB::table('users')->insert([
                'name' => $names[rand(0,9)],
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
                'phone_number' => 71 . rand(100000,999999),
                'type' => 0,
                'image' => 'Image'.$index,
                'Created_at' => date("Y-m-d h:i:s"),
                'Updated_at' => date("Y-m-d h:i:s")
            ]);
        }
        DB::table('users')->insert([
            'name' => 'Mohammad Mancy',
            'email' => 'mohammad.mancy994@gmail.com',
            'password' => Hash::make('mancy994'),
            'phone_number' => 76020632,
            'type' => 1,
            'image' => 'mancy123',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        $cuisines =["Burger","Sea Food","Bakery","American","Italian","Lebanese","Sushi","patisserie","Pizza","Salad","French","Shawarma"];
        foreach (range(1,12) as $index) {
        DB::table('collections')->insert([
            'name' => $cuisines[$index-1],
            'image' => 'cuisine'.$index.'.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        }

        // ______________________Restaurants________________________________________

        DB::table('restaurants')->insert([
            'name' => 'Junkies Food',
            'description' => 'The Truth About Food Addiction !
            In a country so full of great places, choosing the best is not easy, especially when it comes to Burgers, Subs and Hotdogs….
            So with JUNKIES, we can guarantee a touch of soul food, as well as a mouthwatering recipe to keep you craving for more!',
            'location_id' => 1,
            'capacity' => 100,
            'rate' => 0,
            'image' => 'junkiesfood.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 4,
            'trend' => 0,
            'phone_number' => '01 555 769',
            'email' => 'mohammad.mancy994@gmail.com'
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Meateor BBQ',
            'description' => 'Meateor is a smoked american barbecue food concept we serve food such as pulled pork,
             smoked American Black Angus Brisket, Smoked Pork Ribs and many more.',
            'location_id' => 2,
            'capacity' => 130,
            'rate' => 0,
            'image' => 'MeateorBBQ.jpg',
            'Created_at' => date("Y-m-d h:i:s"),	
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 4,
            'trend' => 0,
            'phone_number' => '70 266 595',
            'email' => 'mohammad.mancy994@gmail.com'
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Sandwich Bar',
            'description' => 'Serving you the tastiest sandwiches with endless possibilities! The Sandwich Bar is driven by taste!',
            'location_id' => 3,
            'capacity' => 90,
            'rate' => 0,
            'image' => 'SandwichBar.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 4,
            'trend' => 1,
            'phone_number' => '04 416 955',
            'email' => 'mohammad.mancy994@gmail.com'
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Ichkhanian',
            'description' => 'Yeghia Ichkhanian was born in the city of Aintab, known for being populated by Armenians in the past. 
            His ultimate dream was to introduce the traditional Armenian culinary art of Aintab to Beirut, 
            his second home, where he, his family and friends resided.',
            'location_id' => 4,
            'capacity' => 50,
            'rate' => 0,
            'image' => 'Ichkhanian.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 3,
            'trend' => 0,
            'phone_number' => '71 117 776',
            'email' => 'mohammad.mancy994@gmail.com'
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Silver Crumbs Bakery',
            'description' => 'Our homemade baked goods are made from scratch and always baked with love. We use all natural and organic ingredients so you can enjoy your favorite treats for less calories! 
            We are home based and our goods are always guaranteed fresh. Treat yourself to our fine selection of mouth watering baked goodies',
            'location_id' => 5,
            'capacity' => 80,
            'rate' => 0,
            'image' => 'SilverCrumbsBakery.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 3,
            'trend' => 0,
            'phone_number' => '01 341 393',
            'email' => 'mohammad.mancy994@gmail.com'
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Feren Em Salim',
            'description' => 'Feren em salim is a bakery opened since 1980
            It is located in anfeh al koura near st Catherine church',
            'location_id' => 6,
            'capacity' => 135,
            'rate' => 0,
            'image' => 'FerenEmSalim.jpeg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 3,
            'trend' => 0,
            'phone_number' => '03 303 929',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        // 6
        DB::table('restaurants')->insert([
            'name' => 'Smoking Bun',
            'description' => 'Smoking Bun is small but mighty. We keep it simple and serve only one cheeseburger (Beef or Chicken) out of a refurbished garage. 
            The walls are white, the floor is concrete, the industrial lights aren’t just for show – they keep your food hot. Watch the burgers sizzle, grab your own drink from the fridge,
             and make yourself at home with the rest of the carnivores on the bar stools. We’re open every day from noon to 3 am.',
            'location_id' => 7,
            'capacity' => 70,
            'rate' => 0,
            'image' => 'SmokingBun.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 1,
            'trend' => 0,
            'phone_number' =>	'70 985 551',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Le Gourmet Burger',
            'description' => 'From Montreal, we come to satisfy your burger and poutine cravings. From sloppy to gourmet, have it your way.
            At Le Gourmet Burger, we believe in the evolution and the revolution of the humble burger. The tools are in your hands: An abundance of condiments,
             a cheesy selection, and sauces to juice it up to your liking. Build up your baddest burger, or just keep it simple. You command, we follow.',
            'location_id' => 8,
            'capacity' => 90,
            'rate' => 0,
            'image' => 'LeGourmetBurger.png',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 1,
            'trend' => 0,
            'phone_number' =>	'81 672 772',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Mano Burger',
            'description' => 'The newest edition to the Mano legacy, grilling burger to perfection.',
            'location_id' => 9,
            'capacity' => 60,
            'rate' => 0,
            'image' => 'ManoBurger.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 1,
            'trend' => 0,
            'phone_number' => '01 250 052',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'French Brasserie',
            'description' => 'TBeef Fillet, Chicken Breast, Salmon or Beef Bourguignon with our Signature Sauce, Fries, Salad & freshly baked bread & dip!',
            'location_id' => 10,
            'capacity' => 180,
            'rate' => 0,
            'image' => 'FrenchBrasserie.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 11,
            'trend' => 0,
            'phone_number' => '79 105 500',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Moules et Frites',
            'description' => '
            Bienvenus chez « Moules Et frites™ » !
            « Moules et frites™ » est une marque déposée par "La maison D`Hélène ".
            C`est le seul resto spécialisé Moules-frites au Liban...Savourez les meilleures moules au monde ,
            à la Provençale ou à la sauce Marinière, au Roquefort ou à la Dijonnaise ou même à la sauce de Beyrouth parfumée à la coriandre verte et au citron 
            méditerranéen ...N`oubliez surtout pas de déguster nos pommes frites croustillantes ou de les baigner dans la sauce à moules puis les faire fondre dans votre bouche.',
            'location_id' => 11,
            'capacity' => 125,
            'rate' => 0,
            'image' => 'MoulesetFrites.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 11,
            'trend' => 0,
            'phone_number' =>	'71 708 811',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Burgundy',
            'description' => 'La plus belle carte des vins de Bourgogne de la région. Une cuisine française avec une inspiration internationale, 
            interprétée par le Chef Abdo Faddoul et sa brigade. En salle, un style pur et raffiné avec un esprit de modernité où métaux, bois et béton marquent l’ambiance. 
            Un contraste de modernité et d’authenticité. Une ambiance chic et décontractée. Burgundy, c’est : les habitués, le sur-mesure, la maîtrise, l
            e plaisir, la supériorité et même la provocation. C’est le luxe, avec son expression la plus difficile : la simplicité.',
            'location_id' => 12,
            'capacity' => 150,
            'rate' => 0,
            'image' => 'Burgundy.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 11,
            'trend' => 0,
            'phone_number' =>	'03 074 949',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        // 12
        DB::table('restaurants')->insert([
            'name' => 'Bavaglino',
            'description' => 'Enjoy the Traditional Italian Dishes with your friends without making stains on your shirt!
            Bringing people together in an unforgettable scenery!.',
            'location_id' => 13,
            'capacity' => 140,
            'rate' => 0,
            'image' => 'Bavaglino.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 5,
            'trend' => 1,
            'phone_number' =>	'81 091 080',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Totò - Cucina Italiana',
            'description' => 'Italian creations in true Italian spirit.',
            'location_id' => 14,
            'capacity' => 180,
            'rate' => 0,
            'image' => 'CucinaItaliana.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 5,
            'trend' => 0,
            'phone_number' =>	'03 208 946',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Kalani Resort',	
            'description' => 'Italian food, beach view.',
            'location_id' => 15,
            'capacity' => 190,
            'rate' => 0,
            'image' => 'KalaniResort.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 5,
            'trend' => 0,
            'phone_number' =>	'76 504 050',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Em Sherif Restaurant',	
            'description' => 'Em Sherif is a fine-dining Oriental restaurant that offers unique,
            authentic Oriental cuisine which brings back forgotten traditional flavors. Em Sherif only offers a set menu for a fixed price. It is characterized by its homey atmosphere where invitees are offered whatever is cooked daily.
             It is distinguished by its daily dish that promises to surprise clients’ palette, its
            wide variety of mezze and food, its refined service and its elegant decoration. Em Sherif is also an entertainment venue with musicians and singers performing every night and events organized regularly. ',
            'location_id' => 16,
            'capacity' => 450,
            'rate' => 0,
            'image' => 'EmSherifRestaurant.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 6,
            'trend' => 0,
            'phone_number' =>	'01 206 206',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Kahwet Sanferien',
            'description' => 'A unique story dating back to the French mandate. “Ça ne fait rien,” the villagers said, whenever French police wanted to arrest a wanted Lebanese.',
            'location_id' => 17,
            'capacity' => 350,
            'rate' => 0,
            'image' => 'KahwetSanferien.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 6,
            'trend' => 0,
            'phone_number' =>	'01 755 055',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Socrate',
            'description' => 'Running a successful kitchen requires not only efficiency and productivity but effective use of materials, equipment and manpower. Throughout the 57 years of experience, Socrate has mastered the productivity of its kitchen.
            From the Executive chef down to the dishwasher, an organized structure making sure everyone has a specific responsibility to secure a smooth and dynamic workflow.
            The art of cooking is about preparing perfectly cooked, flavorful dishes.',
            'location_id' => 18,
            'capacity' => 750,
            'rate' => 0,
            'image' => 'Socrate.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 6,
            'trend' => 0,
            'phone_number' =>	'15 30',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        // 18
        DB::table('restaurants')->insert([
            'name' => 'Gustav',
            'description' => 'We went around the globe, and brought with us some of the finest essences that bring out the flavor of our existence.We are inspired by nature because it gives endlessly, 
            craftsmanship because it is art and not a vocation, and the union of elements because we complete each other.
            We are guided by the Tree of Life, blossoming colors and conjuring perfumes. And like the tree we seek the origins right from the deepest roots.
            Gustav -Innovation Sucrée.',
            'location_id' => 19,
            'capacity' => 50,
            'rate' => 0,
            'image' => 'Gustav.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 8,
            'trend' => 0,
            'phone_number' =>	'01 747 199',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Al Forno',
            'description' => 'Alforno mission is to provide its customers with the best products and services in the perfect way and at the right time.',
            'location_id' => 20,
            'capacity' => 80,
            'rate' => 0,
            'image' => 'AlForno.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 8,
            'trend' => 0,
            'phone_number' =>	'05 815 815',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Fleuron',
            'description' => 'Fleuron Catering was born in 2007, the brainchild and sister brand of Fadel owners who envisioned originality, elegance and superior catering service for the Lebanese elite.',
            'location_id' => 21,
            'capacity' => 60,
            'rate' => 0,
            'image' => 'Fleuron.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 8,
            'trend' => 0,
            'phone_number' =>	'70 21 32 41',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Tavolina',
            'description' => 'Tavolina is an Italian bistro offering a variety of Antipasti, Salads, Pizzas, Pasta, Meat and Chicken along with Sweets.
            The special touch of Chef Dani gives all our meals a unique flavor to satisfy your palate.',
            'location_id' => 22,
            'capacity' => 160,
            'rate' => 0,
            'image' => 'Tavolina.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 9,
            'trend' => 0,
            'phone_number' => '01 442 244',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Donbaker Pizzeria',
            'description' => 'THE UNTRADITIONNAL ITALIAN PIZZA',
            'location_id' => 23,
            'capacity' => 170,
            'rate' => 0,
            'image' => 'DonbakerPizzeria.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 9,
            'trend' => 1,
            'phone_number' =>	'01 384 304',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'By The Slice',
            'description' => 'Introducing pizza by the slice! A New York slice in the heart of Beirut.
            Authentic Hand-Stretched.',
            'location_id' => 24,
            'capacity' => 140,
            'rate' => 0,
            'image' => 'ByTheSlice.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 9,
            'trend' => 0,
            'phone_number' =>	'81 757 771',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        // 24
        DB::table('restaurants')->insert([
            'name' => 'SALATA',
            'description' => 'SALATA is a lifestyle culture created around food by health enthusiasts. Located in Beirut, Lebanon, we offer a delicious variety of gourmet salads and power bowls along with a wide selection of specialty coffee and guiltless treats.',
            'location_id' => 25,
            'capacity' => 240,
            'rate' => 0,
            'image' => 'SALATA.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 10,
            'trend' => 0,
            'phone_number' =>	'01 992 424',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Bee My Cup',
            'description' => 'Outdoor Seating, Fresh Food, Good Quality.',
            'location_id' => 26,
            'capacity' => 140,
            'rate' => 0,
            'image' => 'BeeMyCup.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 10,
            'trend' => 0,
            'phone_number' =>	'81 632 425',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Yobo',
            'description' => 'MexiCali Salad - Picture of YoBo Cantina Fresca, Charleston',
            'location_id' => 27,
            'capacity' => 130,
            'rate' => 0,
            'image' => 'Yobo.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 10,
            'trend' => 0,
            'phone_number' =>	'03 148 138',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Qatch',
            'description' => '-Seafood boutique offering a wide range of the finest imported raw and cooked seafood.
            -Fresh catch of the day is imported chilled and displayed on ice for the clientele to have their pick.
            -Trendy eatery with an open kitchen and a mouthwatering Seafood',
            'location_id' => 28,
            'capacity' => 380,
            'rate' => 0,
            'image' => 'Qatch.jpeg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 2,
            'trend' => 0,
            'phone_number' =>	'01 868 644',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Abou Walid',
            'description' => 'Pocket Friendly Place, Ample Seating Area, Great View, Good Value, Affordable Price, Nice Location',
            'location_id' => 29,
            'capacity' => 580,
            'rate' => 0,
            'image' => 'AbouWalid.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 2,
            'trend' => 0,
            'phone_number' =>	'03 794 563',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Samkit El Sultan',
            'description' => 'Home of Fresh Fish & Seafood',
            'location_id' => 30,
            'capacity' => 460,
            'rate' => 0,
            'image' => 'SamkitElSultan.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 2,
            'trend' => 0,
            'phone_number' =>	'70 682 902',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        // 30
        DB::table('restaurants')->insert([
            'name' => 'Basterma Mano',
            'description' => 'Best basterma and shawerma in Lebanon and middle east',
            'location_id' => 31,
            'capacity' => 90,
            'rate' => 0,
            'image' => 'BastermaMano.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 12,
            'trend' => 0,
            'phone_number' =>	'01 268 560',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Joseph Restaurant',
            'description' => 'Located in the heart of Sin El Fil, facing St. Marys church, a few meters away from the Saloumi roundabout, 
            the shop is fully loaded with people, hungry visitors who come here mainly for the shawarma. Two huge skewers of shawarma turn around their center, 
            cooking slowly and calmly while filling one sandwich after the other.',
            'location_id' => 32,
            'capacity' => 60,
            'rate' => 0,
            'image' => 'JosephRestaurant.jpeg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 12,
            'trend' => 0,
            'phone_number' =>	'01 481 891',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Abul 3ezz',
            'description' => 'Like every good story, you need a hero, in ours his name is Abul 3ezz. A Master Chef with 45 years’ experience and a great passion for Shawarma.
            At “Abul 3ezz " we wanted to share our chef‘s passion & ours for creating amazing food that brings you back to the good old days.
            Nostalgia in every bite, using the finest Meats and freshest ingredients prepared with skill and so much passion! Our SPECIALTIES Include our Famous "Shawarma Arabi".
            At “Abul 3ezz” we are bringing back good taste!!',
            'location_id' => 33,
            'capacity' => 120,
            'rate' => 0,
            'image' => 'Abul3ezz.png',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 12,
            'trend' => 0,
            'phone_number' =>	'01 513 878',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'SteakBarSushi',
            'description' => 'Our philosophy dictates that the dining experience involve all five senses. That is why when you choose to enjoy the vast range of mouth-watering 
            dishes we have to offer, you will find yourself part of an exceptional sensory experience that is both thrilling and unforgettably delicious. Every item on the menu, be it a side order, a main course or even a choice of garnish, 
            has a story and every story is packed with surprises and rich aromatic flavors. And, with a vast drinks selection and signature cocktail, your experience will be remarkable.',	
            'location_id' => 34,
            'capacity' => 260,
            'rate' => 0,
            'image' => 'SteakBarSushi.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 7,
            'trend' => 0,
            'phone_number' =>	'76 555 055',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Tsunami',
            'description' => 'At Tsunami our cheerful and cozy atmosphere is as good as our food with all our servings prepared on the spot.
            We invite our diners to explore their gastronomic boundaries by pairing traditional Japanese offerings with new and refreshing flavours and textures.
            Our food offerings include sushi rolls, Sashimi, fresh Tempura and Teriyaki dishes, plus Asian inspired specials ranging from chicken to beef to shrimp.
            Nothing to add to this, but everything to taste…',
            'location_id' => 35,
            'capacity' => 360,
            'rate' => 0,
            'image' => 'Tsunami.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 7,
            'trend' => 0,
            'phone_number' =>	'01 337 327',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        DB::table('restaurants')->insert([
            'name' => 'Shinto Sushi House',
            'description' => 'Professional service and warm atmosphere.',
            'location_id' => 36,
            'capacity' => 470,
            'rate' => 0,
            'image' => 'ShintoSushiHouse.jpg',
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s"),
            'collection_id' => 7,
            'trend' => 0,
            'phone_number' =>	'05 954 224',
            'email' => 'mohammad.mancy994@gmail.com'
        
        ]);
        // 36
        // _________________________Locations_________________________________

        DB::table('locations')->insert([
            'city' => 'Chiyah',
            'longitude' => 35.51569009848523,
            'latitude' => 33.85156149428389,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Kaslik',
            'longitude' => 35.61425902817116,
            'latitude' => 33.97728925452874, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Antelias',
            'longitude' => 35.583424348923,
            'latitude' => 33.91344201819514,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Zalka',
            'longitude' =>  35.57858838321042,
            'latitude' => 33.90607761052402,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Hamra',
            'longitude' => 35.48220885529255,
            'latitude' => 33.89906937695088, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Anfeh,Koura',
            'longitude' => 35.72211804910726,
            'latitude' => 34.38459251480717, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        // 6
        DB::table('locations')->insert([
            'city' => 'Mar Mekhael',
            'longitude' =>  35.526954242685974, 
            'latitude' => 33.899328777206236,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => ' Koreitem',
            'longitude' => 35.47758773948131,
            'latitude' =>  33.8969911189737,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Bourj Hammoud',
            'longitude' => 35.54026326793898 ,
            'latitude' =>   33.89575145028298,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Brommana',
            'longitude' => 35.63943075526741,
            'latitude' =>   33.89097301601196,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Ashrafieh',
            'longitude' => 35.52089306301505,
            'latitude' =>  33.89670658864643,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Saifi',
            'longitude' => 35.50889515700645,
            'latitude' =>  33.89723638068335,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        // 12
        DB::table('locations')->insert([
            'city' => 'Ashrafieh',
            'longitude' => 35.5155192308637,
            'latitude' => 33.89600387224583,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Ashrafieh',
            'longitude' => 35.51550249137485,
            'latitude' => 33.891706984576054, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Halat',
            'longitude' =>35.644644849430485,
            'latitude' =>  34.08600478173082, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Ashrafieh',
            'longitude' =>35.50758321289796,
            'latitude' =>  33.889679921546495, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Tabarja',
            'longitude' =>35.63888035280875,
            'latitude' => 34.01767583493042, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Hamra',
            'longitude' => 35.47834977961067,
            'latitude' =>  33.89933999251192,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        // 18
        DB::table('locations')->insert([
            'city' => 'Hamra',
            'longitude' => 35.48062120721013,
            'latitude' =>  33.89885222314229, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Aley',
            'longitude' => 35.46291144693532,
            'latitude' =>  33.76594604005874,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Broummana',
            'longitude' => 35.64452077693378,
            'latitude' =>  33.89418877019523,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Mar Mikhael',
            'longitude' =>  35.52482688498785,
            'latitude' =>  33.90058266181724,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Badaro',
            'longitude' =>  35.51604557514422,
            'latitude' =>  33.87389838943551,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Mar Mikhael',
            'longitude' => 35.52713691347595,
            'latitude' =>   33.89952495164459,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        // 24
        DB::table('locations')->insert([
            'city' => 'Mar Mikhael',
            'longitude' => 35.505622393525535,
            'latitude' =>    33.89890077891835,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Mar Takla',
            'longitude' => 35.54594374738274,
            'latitude' =>    33.85395492902065, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Verdun',
            'longitude' => 35.4855522772649,
            'latitude' =>    33.88347280413874, 
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Rawche',
            'longitude' => 35.480163302524474,
            'latitude' =>  33.89216356770976,		
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Tabarja',
            'longitude' =>  35.6316054451897,
            'latitude' =>  34.0506998261055,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Ashrafieh',
            'longitude' =>  35.5136750110005,
            'latitude' =>  33.889103512059094,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        // 30
        DB::table('locations')->insert([
            'city' => 'Bourj Hammoud',
            'longitude' => 35.540263268353485,
            'latitude' =>   33.8951102513627, 	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Sin El Fil',
            'longitude' => 35.53782792272581,
            'latitude' =>  33.88186027610146,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Dekwaneh',
            'longitude' => 35.543587178919616,
            'latitude' =>  33.88096332474023,	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Naccache',
            'longitude' =>  35.589640752263875,
            'latitude' => 33.92247242347796,
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Ashrafieh',
            'longitude' => 35.51368932242672,
            'latitude' =>  33.88947260343774, 	
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        DB::table('locations')->insert([
            'city' => 'Hazmieh',
            'longitude' => 35.53659832774505,
            'latitude' => 33.86053884670874,        
            'Created_at' => date("Y-m-d h:i:s"),
            'Updated_at' => date("Y-m-d h:i:s")
        ]);
        // 36
    }
}
