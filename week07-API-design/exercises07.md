# Week 07 - Reading week

Designing an API

## 1. Introduction

For the reading week we have provided you some exercises and topics of reading to help you prepare for the next weeks.

This week we are going to think about RESTful API design. We’ll take a very simple example which has a single class and identify the API calls which it requires.
There aren’t perfect solutions here. There are many possible solutions, each of which might be appropriate for a different scenario. We’re only going to look at the domain objects and routes which are, essentially, the model and controller components of an MVC architecture.

## 2. Playing around with APIs

Take the following JavaScript prototype and define an API for it. You will need to think about all possible routes and HTTP protocols.
You don't need to produce code for it. We are interested in the specification of your API.

```javascript
function author(sn,fn,on,dob,died,home,bio) {
	this.sname = sn;
	this.fname = fn;
	this.othernames = on;
	this.born = dob;
	this.died = dod;
	this.country = home;
	this.bio = bio;
	this.getName = function() { return this.fname +" "+ this.sname; }
}

author.prototype.toString = function() {
	return this.getName +" "+ this.born +" "+ this.died;
}
```

**TIP:** Use the [OpenAPI](https://oai.github.io/Documentation/) specification to describe your API.
There are several [tools](https://github.com/OAI/OpenAPI-Specification/blob/main/IMPLEMENTATIONS.md#editors) that can be used for it, including plugin for [VS Code](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) and the [swagger editor](https://editor.swagger.io/).

## 3. Documenting the petshop

Now create the API documentation for the petshop application. Start by documenting the endpoints that are already defined in your code and then introduce endpoints for extra functionalities.

*These will be explored in the following weeks*
