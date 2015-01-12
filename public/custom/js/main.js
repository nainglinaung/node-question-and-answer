var App = angular.module('myApp',[]);

App.filter('greet',function(){
	return function(name){
		return 'Hello, '+name+ '!';
	}
})

App.controller('QuestionCtrl',function($scope,question){

	$scope.lorem = function(){

	}

	question.get("",function(data){
		console.log(data);
		$scope.questions = data;	
	});
	
});


App.service('question',function($http){



  this.get = function(id,callback) {
	
  	id = id || ""; 

	$http.get('/api' + id)
	  .then(function(result) {callback(result.data);
	  })
	  .then(function(error){
	  		return error;
	  });  	
  	
  }

});


