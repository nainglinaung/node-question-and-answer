var app = require('../server');
var fake = require('./fake');



var request =require('supertest');
var server = request.agent('http://localhost:8080');
var url = '';


describe('Registering a User', function(){

    it('POST Register',function(done){
    	server.post('/user/register')
    		  .send(fake.postRegister())
    		  .expect(302)
    		  .expect('Location','/')
    		  .end(function(err,res){

    		  	if (err) return done(err);
    		  	console.log(res.body);
    		  	done();

    		  });
    });
});


describe('Signing In a User',function(){

	it('POST Login',loginUser());
	

});


describe('Create a Question',function(){

	it('Create a question after login', function(done){
    server
        .post('/question/create')
        .send(fake.postCreateQuestion())                       
        .expect(302)
        .expect(function(res){
        	url = res.headers.location;
        })
        .end(function(err, res){

            if (err) return done(err);
         
            done();
        });
    });

});


describe('Show One Question',function(){

	it('GET Question',function(done){
		
		server.get(url)
			  .expect(200)
			  .end(function(err,res){
			  	if (err) return done(err);
			  	done();
			  })

		done();
	});


});





describe('Create an Answer',function(){
	it('POST answer',function(done){

		url = url.split('/')[2];

		server.post('/answer/'+url)
			  .send(fake.postCreateAnswer())
			  .expect(302)
			  .end(function(err,res){
			  	if (err) return done(err);	
				done();
			  });
	});
});


describe('Vote Up an Question',function(){
	it('GET UP',function(done){
		server.get('/question/up/'+url)
		      .expect(302)
		      .end(function(err,res){
		      	if (err) return done(err);
		      	done();
		      })
	})
})




function loginUser() {

    return function(done) {
        server
            .post('/user/login')
            .send(fake.postLogin())
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};





    /*
   















*/









/*

describe('HomePage',function(){

	it("HomePage loading ", function(done) {
		request(url, function(error, response, body){
			expect(response.statusCode).toEqual(200);
		done();
		});
	});
});

describe('User Testing',function(){

		 
	it("create user", function(done){
		var form = fake.postRegister();

		request.post({url:url+'user/register',form:form}, function(err,httpResponse,body){ 
			var message = httpResponse.body.toString();
			form.name = undefined;
			expect(message).toEqual("Moved Temporarily. Redirecting to /");		
			done();
		});

	});

	it('login user',function(done){

		var form = fake.postLogin();
		request.post({url:url+'user/login',form:form},function(err,httpResponse,body){
			var message = httpResponse.body.toString(); 
			expect(message).toEqual("Moved Temporarily. Redirecting to /");
			done();	
		});
	});

	it('post question',function(done){

		var questions  = fake.postCreate();
		request.post({url:url+'question/create',form:questions},function(err,httpResponse,body){
			var message = httpResponse.body.toString();
			expect(message).toEqual("Moved Temporarily. Redirecting to /");
			done();
		})
	})
	
});


*/



