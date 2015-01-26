var faker = require('faker');



module.exports = {

	name : faker.name.findName(),
	password : faker.internet.password(),
	email : faker.internet.email(),
	content: faker.lorem.paragraphs(),
	title: faker.lorem.sentence(),


	postLogin: function(){
		return {
			email:this.email,
			password:this.password
		};
	},

	postCreateAnswer: function(){
		return {
			body:this.content
		};
	},

	postCreateQuestion: function(){
		return {
			title:this.title,
			body:this.content
		}
	},

	postRegister : function(){
		return {
			name: this.name, 
			password: this.password,
			email:this.email
		};
	}

}