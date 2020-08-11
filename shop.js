////////////////////////////////////////////////////////////////////////////////////
/       Created by Rahul Cherubal Gonzalez using typeScript and a gorilla api      /
////////////////////////////////////////////////////////////////////////////////////


//Getting gorilla
import gorilla = require("gorilla/gorilla");
//Importing package for using a State Machine
import stateMachine = require('gorilla/state_machine');

//Enum list for managing states
enum State {
    Exp,
    Wishlist,
    Finish,
}


//moved this up here from function generateStore sorry if this is bad 
var tpbCondition = gorilla.manipulation('tpb', 'ctrl');

//created var for basket manipulation
var basketCondition = gorilla.retrieve("basket", "regularbasket.png", true);

var shopNames = gorilla.retrieve("shopNames", ["shopnamea.png", "shopnameb.png", "shopnamec.png", "shopnamed.png"], true);

var shopName = popChoice(shopNames);

gorilla.store("shopNames", shopNames, true);

//prices for items
var prices = ["£5.00", "£5.00", "£5.00", "£6.00", "£6.00", "£6.00", "£10.00", "£10.00", "£10.00", "£10.00",
		      "£10.00", "£7.00", "£7.00", "£7.00", "£7.00", "£7.00", "£8.00", "£8.00", "£8.00", "£8.00",
			  "£8.00", "£9.00", "£9.00", "£9.00", "£9.00", "£9.00", "£12.00", "£12.00", "£12.00", "£12.00",
			  "£12.00", "£12.00", "£12.00", "£12.00", "£12.00", "£12.00", "£15.00", "£15.00", "£15.00", "£15.00",
		      "£15.00", "£15.00", "£15.00", "£15.00", "£15.00", "£15.00", "£17.00", "£17.00", "£17.00", "£17.00",
			  "£17.00", "£17.00", "£17.00", "£17.00", "£17.00", "£17.00", "£20.00", "£20.00", "£20.00", "£20.00",
			  "£20.00", "£24.00", "£24.00", "£24.00", "£24.00", "£24.00", "£26.00", "£26.00", "£26.00", "£30.00",
			  "£30.00", "£30.00"];


//descriptions for the products in shop A in the order of the index
var descriptionA = ["Dress", "Dress", "Top", "Top", "Dress", "Dress", "Top", "Dress", "Dress", "Top",
                    "Jumper", "Dress", "Dress", "Top", "Shirt", "Trousers", "Joggers", "Dress", "Dress", "Shirt",
                    "Top", "Shirt", "Shirt", "Shirt", "Jumper", "Dress", "Joggers", "Skirt", "Dress", "Shirt",
                    "Shirt", "Joggers", "Shirt", "Dress", "Jumpsuit", "Shirt", "Jumpsuit", "Shirt", "Shirt", "Dress",
                    "Shirt", "Dress", "Jacket", "Shorts", "Jeans", "Top", "Dress", "Joggers", "Top", "Top",
                    "Top", "Top", "Shirt", "Top", "Trousers", "Shorts", "Leggings", "Jumpsuit", "Jumpsuit", "Dress",
                    "Jeans", "Top", "Shirt", "Shirt", "Skirt", "Top", "Dress", "Jeans", "Skirt", "Dress",
                    "Dress", "Shirt"]; 
                         
//descriptions for the products in shop B in the order of the index
var descriptionB = ["Skirt", "Dress", "Joggers", "Joggers", "Jumpsuit", "Jacket", "Leggings", "Joggers", "Shorts", "Dress",
                    "Shorts", "Dress", "Jumpsuit", "Jumpsuit", "Shirt", "Leggings", "Jumpsuit", "Dress", "Dress", "Top",
                    "Dress", "Jacket", "Skirt", "Dress", "Trousers", "Top", "Dress", "Dress", "Dress", "Top",
                    "Shirt", "Top", "Dress", "Dress", "Shirt", "Shirt", "Jacket", "Dress", "Dress", "Shirt",
                    "Jacket", "Shorts", "Dress", "Dress", "Top", "Top", "Dress", "Jeans", "Jumpsuit", "Shirt",
                    "Jumpsuit", "Shirt", "Jumper", "Shorts", "Dress", "Skirt", "Dress", "Skirt", "Jeans", "Dress",
                    "Shorts", "Trousers", "Dress", "Jacket", "Dress", "Top", "Jumpsuit", "Dress", "Dress", "Jumpsuit",
                    "Top", "Top"];
                    
//descriptions for the products in shop C in the order of the index
var descriptionC = ["Skirt", "Jumpsuit", "Trousers", "Joggers", "Shirt", "Shirt", "Top", "Shirt", "Leggings", "Leggings",
                    "Dress", "Top", "Shirt", "Dress", "Dress", "Trousers", "Dress", "Dress", "Dress", "Dress",
                    "Jumpsuit", "Shorts", "Shirt", "Dress", "Jumpsuit", "Jumper", "Dress", "Top", "Dress", "Dress",
                    "Top", "Shorts", "Dress", "Top", "Skirt", "Top", "Dress", "Jumper", "Top", "Dress",
                    "Top", "Shorts", "Leggings", "Dress", "Jumpsuit", "Trousers", "Top", "Trousers", "Shorts", "Dress",
                    "Top", "Jumpsuit", "Shirt", "Dress", "Top", "Dress", "Dress", "Top", "Dress", "Skirt",
                    "Trousers", "Trousers", "Dress", "Jumper", "Jeans", "Dress", "Skirt", "Leggings", "Shirt", "Jumper",
                    "Shirt", "Shirt"];
                                        
//descriptions for the products in shop D in the order of the index
var descriptionD = ["Shirt", "Top", "Dress", "Jeans", "Top", "Shirt", "Dress", "Shirt", "Jumpsuit", "Top",
                    "Shirt", "Top", "Trousers", "Skirt", "Shirt", "Shirt", "Dress", "Dress", "Top", "Dress",
                    "Top", "Jumper", "Top", "Leggings", "Shirt", "Dress", "Dress", "Dress", "Shorts", "Dress",
                    "Trousers", "Jeans", "Jumpsuit", "Dress", "Dress", "Top", "Shirt", "Dress", "Top", "Joggers",
                    "Joggers", "Jumpsuit", "Dress", "Jacket", "Trousers", "Skirt", "Jumpsuit", "Shorts", "Jumpsuit", "Skirt",
                    "Dress", "Top", "Shirt", "Jeans", "Top", "Top", "Top", "Dress", "Top", "Dress",
                    "Top", "Skirt", "Dress", "Top", "Joggers", "Dress", "Shirt", "Dress", "Skirt", "Jumpsuit",
                    "Dress", "Top"];                    

//to count how many items get each rating type
var ecoCount = [0,0,0,0];

//Putting everything in he ready function. Just blindly following the API. Not sure if this helps.
gorilla.ready(function(){

// create an instance of the state machine
    var SM = new stateMachine.StateMachine();
    
// this allows us to use gorilla's timing features such as stopwatch and sequence
    gorilla.initialiseTimer();
    
/*------------------------------------------------------------------------------
-                           Stimuli Preparation                                -
------------------------------------------------------------------------------*/
    //Create/retrieve the variable that stores the wishlist
    var wishlist = gorilla.retrieve("wishlist", []);
    console.log("Wishlist:", wishlist);
    //Create/retrieve the variable that stores the wishlistTrack
   //(to track what participants do)
   var wishlistTrack = gorilla.retrieve("wishlistTrack", []);
   console.log("wishlistTrack:", wishlistTrack);
    //Create/retrieve the variable that stores the shoppingBag
    var shoppingBag = gorilla.retrieve("shoppingBag", []);;
    console.log("shoppingBag:", shoppingBag);
    //Create/retrieve the variable that stores the shoppingBagTrack
   //(to track what participants do)
   var shoppingBagTrack = gorilla.retrieve("shoppingBagTrack", []);;
   console.log("shoppingBagTrack:", shoppingBagTrack);
    //Create/retrieve the variable that stores the html for the items in the shop
    var shopHTML = gorilla.retrieve("shopHTML", "");;
    
//Some useful variables    
    var basketImage;
    var productInfo = [];  //productInfo[] for adding more information to wishlist page and for storing data at the end
    //initialize productInfo[] to be safe
    for(var j = 0;j < 72;j++) {
        productInfo[j] = {
            productImage:"", 
            description:"", 
            ecoImage:"", 
            price:"", 
            addToWish:"No", 
            removeWish:"No", 
            addToBag:"No", 
            removeBag:"No"
        }
    }
    var inWish = [];
    
/*------------------------------------------------------------------------------
-                        Making the items in HTML                              -
------------------------------------------------------------------------------*/
    
    //Added most of the code into states tobe run by the state machine
    //Only variables declared outside and other functions defined outside gorilla.ready
    //Creating states for the machine to run
    SM.addState(State.Exp, {
       //onEnter tells the machine what to do when entering a state
       onEnter: (machine: stateMachine.Machine) => {
            //If the HTML is empty
            if(shopHTML === ""){
                //create it
                shopHTML = createItemsHTML();
                //store it
                gorilla.store('shopHTML', shopHTML, false);
                //Generate the store
                generateStore();
            }else{ //If there is already html stored (when come back from wishlist/checkout)
                //Generate the store
                generateStore();
            }
            
        
            function createItemsHTML(){
                //Getting the product images
                var productString = "";
                //changing item name based on                 
                var productA = "a";
                
                if (tpbCondition == 'ck'){
                    productA = "b";
                }
                else if (tpbCondition == 'ppr'){
                    productA = "c";
                }
                else if (tpbCondition == 'pce'){
                    productA = "d";
                }
                
                gorilla.metric({manip: tpbCondition});

                
                var jpgString = ".png";
                var nbOfProducts = 72; //this is hardcoded. You need to change this if you add products.
                var images = []; // preparing the list for the images
        
                //images start at 1 so i starts at 1
                for (var i = 1; i <= nbOfProducts; i++){
                    productString = productA + i + jpgString;
                    images.push(productString);
                    }
                
/*-Getting descriptions for items-*/
                //choosing array with descriptions
                var descriptions = eval("description" + productA.toUpperCase());
        
                //Getting the sustainability images (hardcoded) 
                //some copies exist to balance probability of being picked
                var eco = ["sus11.png","sus12.png","sus13.png","sus21.png","sus22.png","sus23.png","sus31.png","sus31.png","sus31.png","sus00.png","sus00.png","sus00.png"];
        
                //number of items to show. This is hardcoded. Need to change it if you want more or less items.
                var nbOfItems = 72;
                var itemsHTML = '';
                var productImage, productImageURL, ecoImage, ecoImageURL, descript, price;
                
                for (var i = 0; i < nbOfItems; i++) {
                    //Selects and removes an image (ensures no doubles)
                    productImage = popChoice(images);
                    //Get image url so that we can add it
                    productImageURL = gorilla.stimuliURL(productImage);
                    //get the number of the image
                    var imgNb = imgNum(productImage);
                    //get the description
                    descript = descriptions[imgNb - 1];
        
                    //Select randomly a possible eco image:
                    var randEcoList= Math.floor(Math.random() * 12);
                    //maximum allowed of each type
                    var maxEco = Math.ceil(nbOfItems / 4);
                    //index for counter ecoCount[]
                    var randEcoCount = Math.floor(randEcoList / 3);
                    //cycles through array to find type that does not exceed limit
                    while(ecoCount[randEcoCount] >= maxEco){
                        randEcoList = Math.floor(Math.random() * 12);
                        randEcoCount = Math.floor(randEcoList / 3);
                    }
                    //increment counter for that type
                    ecoCount[randEcoCount]++;
                    ecoImage = eco[randEcoList];
                    //Get image url so that we can add it
                    ecoImageURL = gorilla.stimuliURL(ecoImage);
                    
                    //Get price for items
                    price = popChoice(prices);

                    //adding elements to productInfo[] 
                    productInfo[imgNb - 1] = {
                        productImage:productImage, 
                        description:descript, 
                        ecoImage:ecoImage, 
                        price:price, 
                        addToWish:"No", 
                        removeWish:"No", 
                        addToBag:"No", 
                        removeBag:"No"
                    }
                
                
                    //Write the html
                    itemsHTML += `
                        <div id="itemContainer${i}">
                            <div class="imgdisp-hold">
                                <img class="clothpics" src="${productImageURL}" alt="item">
                                <div class="imgdisp-ghost" id="${productImage}">
                                        <div class="add-rmv-text">Add to wishlist</div>
                                </div>
                            </div>
                            <br><br>
                            <div class="description">${descript}</div>
                            <div>
                                <span class="price">${price}</span>
                            </div>
                            <div>
                                <img class="ecorate" src=${ecoImageURL} alt="ecoRating">
                            </div>
                        </div>
                    `;
                }
        
                return itemsHTML;
            }
            
            //trying to create wishlist count
            var wishLength = wishlist.length;
        
            function generateStore(){
                //Get the condition and condition image
                console.log(tpbCondition);
                var conditionImage = tpbCondition + ".png";
        
                //Send the condition image to the modal and send the html text to the shop div
                gorilla.populate('#gorilla', 'exp', {tpb: conditionImage, shop: shopHTML, shopname: shopName, count:wishlist.length});
                //gorilla.refreshLayout();

                //Enable the close button after 5 seconds
                var sequence = gorilla.addTimerSequence()
                .delay(7000)
                .then(() => {
                    gorilla.populate('#close', 'closes', {});
                    $("#close").prop("disabled", false);
                })
                .run();
                
                //This will begin the stopwatch to time the customer at the shop
                gorilla.startStopwatch();
            }
/*------------------------------------------------------------------------------
-                                 Modal (popup)                                -
------------------------------------------------------------------------------*/
        
            // Show the modal
            document.getElementById("myModal").style.display = "block";
        
            // Get the modal
            var modal = document.getElementById("myModal");
            
            //Make the close button disabled at the start
            //$("#close").prop("disabled", true);
            
            
            // Get the <span> element that closes the modal
            var span = document.getElementById("close");
        
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
        
            // When the user clicks anywhere outside of the modal, close it
           // window.onclick = function(event) {
             //   if (event.target == modal) {
               //     modal.style.display = "none";
            //    }
            //}
        
/*------------------------------------------------------------------------------
-                       Adding elements to wishlist                            -
------------------------------------------------------------------------------*/
            
            
            //for basket image on wishlist page
            basketImage = basketCondition;
        
            //Adding a function to add to wishlist when clicking a product image:
            $(".imgdisp-ghost").click(addToWishList);
        
            function addToWishList(e){
                //Get the id of the product clicked
                var productID = e.target.attributes.id.value;
                
                //prepare track variable:
                var wishlistTrackText = productID;
                
                //If it is not already in the wishlist, add it
                if(wishlist.indexOf(productID) === -1){
                    wishlist.push(productID);
                
                    //update track variable
                    wishlistTrackText += "_added";
                    
                    //updating productInfo[]
                    productInfo[imgNum(productID) - 1].addToWish = "Yes";
                    
                    inWish.push(imgNum(productID) - 1);
                    
                    gorilla.populate("#wishlist-btn", "wishcount", {count:wishlist.length});
                } 
                
                /*else {
                    //if it is already in the wishlist, remove it
                    wishlist.splice(wishlist.indexOf(productID), 1);

                    //update track variable
                    wishlistTrackText += "_removed";
                }*/
        
                //Store wishlist
                gorilla.store('wishlist', wishlist, false);
        
                //Show wishlist
                console.log("Wishlist:", wishlist);
            }
            
            //Add a function to the wishlist button to go to the wishlist/checkout section
            $('.wishlist').one('click', (event: JQueryEventObject) => {
                machine.transition(State.Wishlist);
            });
       }
    });
/*------------------------------------------------------------------------------
-                                 Naviguation                                  -
------------------------------------------------------------------------------*/

    //State for Wishlist page
    SM.addState(State.Wishlist, {
        onEnter: (machine: stateMachine.Machine) => {
            
/*-Getting the wishlist and shopping bag-*/
            //Create/retrieve the variable that stores the wishlist
            var wishlist = gorilla.retrieve("wishlist", []);
            console.log("wishlist:", wishlist);
            //Create/retrieve the variable that stores the wishlistTrack
            //(to track what participants do)
            var wishlistTrack = gorilla.retrieve("wishlistTrack", []);
            console.log("wishlistTrack:", wishlistTrack);

            //Create/retrieve the variable that stores the shoppingBag
            var shoppingBag = gorilla.retrieve("shoppingBag", []);;
            console.log("shoppingBag:", shoppingBag);
            //Create/retrieve the variable that stores the shoppingBagTrack
            //(to track what participants do)
            var shoppingBagTrack = gorilla.retrieve("shoppingBagTrack", []);;
            console.log("shoppingBagTrack:", shoppingBagTrack);
            
            
/*-Creating the sections-*/            
            //Prepare the html for the wishlist:
            var productImage, productImageURL, ecoImage, ecoImageURL, descript, price; //prepare variables
            
            var wishlistHTML = '';
            var shoppingBagHTML = '';
            //Go through every item in the wishlist
            for (var i = 0; i < wishlist.length; i++) {
                //Get image of the product
                productImage = wishlist[i];
                //Get image url so that we can add it
                productImageURL = gorilla.stimuliURL(productImage);
                
                //Get eco rating of the product
                ecoImage = productInfo[imgNum(productImage) - 1].ecoImage;
                //Get eco image URL
                ecoImageURL = gorilla.stimuliURL(ecoImage);
                
                //Get description of the product
                descript = productInfo[imgNum(productImage) - 1].description;
                
                //Get price of the product
                price = productInfo[imgNum(productImage) - 1].price;
                
                wishlistHTML += `
                    <div id="${productImage}">
                        <div>
                            <img class="wishlistitem" src="${productImageURL}" alt="item">&nbsp;&nbsp;
                            <p class="wishlistdesc">${descript}&nbsp;&nbsp;
                                <span class="wishlistprice">${price}</span>
                            </p>
                            <img class="wishlisteco" src="${ecoImageURL}" alt="eco">
                        </div>
                        <br>
                        <div>
                            <button class="addtobag">Add to basket</button>&nbsp;&nbsp;
                            <button class="removefromwish">Remove from wishlist</button>
                        </div>
                    </div>
                    <br><br>
                `;
            }
            
            //Prepare the html for the shopping bag:
            //Go through every item in the shopping bag
            for (var i = 0; i < shoppingBag.length; i++) {
                //Get image of the product
                productImage = shoppingBag[i];
                //Get image url so that we can add it
                productImageURL = gorilla.stimuliURL(productImage);
                
                //Get eco rating of the product
                ecoImage = productInfo[imgNum(productImage) - 1].ecoImage;
                //Get eco image URL
                ecoImageURL = gorilla.stimuliURL(ecoImage);
                
                //Get description of the product
                descript = productInfo[imgNum(productImage) - 1].description;
                
                //Get price of the product
                price = productInfo[imgNum(productImage) - 1].price;
                
                shoppingBagHTML += `
                    <div id="${productImage}">
                        <div>
                            <img class="wishlistitem" src="${productImageURL}" alt="item">&nbsp;&nbsp;
                            <p class="wishlistdesc">${descript}&nbsp;&nbsp;
                                <span class="wishlistprice">${price}</span>
                            </p>
                            <img class="wishlisteco" src="${ecoImageURL}" alt="eco">
                        </div>
                        <br>
                        <div>
                            <button class="removefrombag">Remove from basket</button>
                        </div>
                    </div>
                    <br><br>
                `;
            }
    

            //Populate the wishlist/checkout section
            gorilla.populate('#gorilla','Wishlist', {wishlist: wishlistHTML, shoppingBag: shoppingBagHTML, basketImage: basketImage, shopname: shopName});
            //gorilla.refreshLayout();
    
            //Store wishlist
            gorilla.store('wishlist', wishlist, false);
    
            //Show wishlist
            console.log("Wishlist:", wishlist);
            
            $('.removefromwish').click(removeFromWishList);
            //function removes from the wishlist on screen and from array wishlist[]
            function removeFromWishList(e) {
                //get li whose button was clicked
                var listElement = e.target.parentNode.parentNode.attributes.id.value;
                console.log(listElement);
                
                //find and remove from array wishlist[]
                var indexInWishList = wishlist.indexOf(listElement);
                wishlist.splice(indexInWishList,1);
                                
                //remove from ul for wishlist
                var ul = document.getElementById("wishlist-list");
                ul.removeChild(ul.childNodes[indexInWishList]);
                
                //Prepare wishlistTrack variable
                var wishlistTrackText = listElement + "_removed";
                //Update wishlistTrack
                wishlistTrack.push(wishlistTrackText);
                //Store wishlistTrack
                gorilla.store('wishlistTrack', wishlistTrack, false);
                
                //updating productInfo[]
                productInfo[imgNum(listElement) - 1].removeWish = "Yes";
                
                //Store wishlist
                gorilla.store('wishlist', wishlist, false);
                
                //refresh page with new list
                machine.transition(State.Wishlist);
                //gorilla.refreshLayout();
                
            };
            
            $(".addtobag").click(addToBag);
            
            function addToBag(e) {
                //get li whose button was clicked
                var listElement = e.target.parentNode.parentNode.attributes.id.value;
                console.log(listElement);
                
                if(shoppingBag.indexOf(listElement) === -1) {
                    shoppingBag.push(listElement);
                }
                
                gorilla.store('shoppingBag', shoppingBag, false);
                
                //Prepare shoppingBagTrack variable
                var shoppingBagTrackText = listElement + "_added";
                //Update shoppingBagTrack
                shoppingBagTrack.push(shoppingBagTrackText);
                //Store shoppingBagTrack
                gorilla.store('shoppingBagTrack', shoppingBagTrack, false);
                
                //updating productInfo[]
                productInfo[imgNum(listElement) - 1].addToBag = "Yes";
                
                //find and remove from array wishlist[]
                var indexInWishList = wishlist.indexOf(listElement);
                wishlist.splice(indexInWishList,1);
                                
                //remove from ul for wishlist
                var ul = document.getElementById("wishlist-list");
                ul.removeChild(ul.childNodes[indexInWishList]);
                
                //refresh page with new list
                machine.transition(State.Wishlist);
                //gorilla.refreshLayout();
            }
            
            $('.removefrombag').click(removeFromBag);
            //function removes from the shopping on screen and from array shopping[]
            function removeFromBag(e) {
                //get li whose button was clicked
                var listElement = e.target.parentNode.parentNode.attributes.id.value;
                
                if(wishlist.indexOf(listElement) === -1) {
                    wishlist.push(listElement);
                }
                
                //find and remove from array wishlist[]
                var indexInBag = shoppingBag.indexOf(listElement);
                shoppingBag.splice(indexInBag,1);
                                
                //remove from ul for wishlist
                var ul = document.getElementById("shoppingBag-list");
                ul.removeChild(ul.childNodes[indexInBag]);
                
                //Prepare shoppingBagTrack variable
                var shoppingBagTrackText = listElement + "_removed";
                //Update shoppingBagTrack
                shoppingBagTrack.push(shoppingBagTrackText);
                //Store shoppingBagTrack
                gorilla.store('shoppingBagTrack', shoppingBagTrack, false);
                
                //updating productInfo[]
                productInfo[imgNum(listElement) - 1].removeBag = "Yes";

                //Save shopping bag
                gorilla.store('shoppingBag', shoppingBag, false);
                
                //refresh page with new list
                machine.transition(State.Wishlist);
                //gorilla.refreshLayout();
                
            }
            
            //Go back to shop page
            $('.backtoonline').one('click', (event: JQueryEventObject) => {
                machine.transition(State.Exp);
                //gorilla.refreshLayout();
            });
            
            //Finishes experiment
            $('#finish').on('click', ()=>{
               machine.transition(State.Finish); 
            });
        }
    });
    
    
    //State for finishing experiment
    //add metrics here if not above
    SM.addState(State.Finish, {
        onEnter: (machine: stateMachine.Machine) => {
            
            // gorilla.stopStopwatch(); this stops the stopwatch.  Note that the time on the stopwatch is still stored 
            // (like a real stopwatch) we can retrieve this using getStopwatch
            gorilla.stopStopwatch();
            var shopTime = gorilla.getStopwatch();
            
            //store all the items that were added to the wishlist at any time
            for(var j = 0;j < inWish.length;j++){
                var n = inWish[j];
                
                //store the values: 1 row for each element
                //gets values from productInfo[]
                gorilla.metric({
                    img: productInfo[n].productImage,
                    desc: productInfo[n].description,
                    eco: productInfo[n].ecoImage,
                    price: productInfo[n].price,
                    addToWish: productInfo[n].addToWish,
                    removeWish: productInfo[n].removeWish,
                    addToBag: productInfo[n].addToBag,
                    removeBag: productInfo[n].removeBag
                });
            }
            
            //store the time the customer was at the shop
            gorilla.metric({time: Math.round(shopTime/1000)});
            
            gorilla.finish();
       } 
    });

    // Tells gorilla that everything is set up and we're ready to start the task
    // in the callback function we indicate the first stage of 
    gorilla.run(function(){
        // .start is used to begin running the state machine and sends us to the first state
        SM.start(State.Exp);
    });

}); //End of ready function

/*------------------------------------------------------------------------------
-                            Useful functions                                  -
------------------------------------------------------------------------------*/

//Function to randomly choose an element from an array:
function choice(array){
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
    return randomElement;
}

//Function to randomly choose an element from an array (but also removes it):
function popChoice(array) {
    var randomIndex = Math.floor(Math.random()*array.length);
    return array.splice(randomIndex, 1)[0];
}

//function to get number value from image name
function imgNum(s) {
    return s.substring(1, s.indexOf("."));
}
