(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('airpath',"https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");

  //the controller function
  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var searchmenu=this;
    searchmenu.message="";
    searchmenu.found=[];
    searchmenu.itemsearch="";
    searchmenu.search=function(){
      if( searchmenu.itemsearch.trim()===""){
       searchmenu.message="Nothing found";
       searchmenu.found=[];
      }else{

        var promise=MenuSearchService.getMatchedMenuItems(searchmenu.itemsearch);
        //declare the then function
        promise.then(function (response) {
         searchmenu.found = response;
         if(searchmenu.found.length==0){
          searchmenu.message="Nothing found";
         }else{
          searchmenu.message="";
         }
       })
       .catch(function (error) {
         console.log("Something went terribly wrong.");
       });
      }
     

    }
  searchmenu.removeItem=function(indexIItem){
       MenuSearchService.removeItem(indexIItem);
   }
  
  }
//the service 
MenuSearchService.$inject=['$http', 'airpath'];
function MenuSearchService($http, airpath){
  var menuservice=this;
  menuservice.getMatchedMenuItems=function(searchTerm){
    var response = $http({
      method: "GET",
      url: airpath  // Use 'airpath' instead of 'ApiBasePath'
    })
    .then(function(response){
      var menuItems = response.data.menu_items;  // Access menu_items directly
      var found=[];
      for(var i=0; i<menuItems.length; i++){
        if(menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase())){
          found.push(menuItems[i]);
        }
      }
      return found;
    })
    .catch(function(error){
      return error;
    });

    return response;
  };
  menuservice.removeItem=function(indexIItem){
    found.splice(indexIItem,1);
  }
}

})();