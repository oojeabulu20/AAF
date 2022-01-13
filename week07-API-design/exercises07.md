# Week 07 - Designing an API (Reading week)

This material can be found in this [link](https://codeberg.org/kaduardo/shu-aaf/src/branch/main/week07-API-design/exercises07.md).

## 1. Introduction

By now you should have a basic node.js application exploring Express, pug and connecting to a mongodb database.
You have also been presented to the notion of API and REST using Express.

The main objective of the reading week is for you to catch-up on the previous exercises (node.js and express). After doing that, come back to this document and continue reading on.

We have also provided you some exercises and topics of reading to help you prepare for the next weeks.
We are going to explore RESTful API design. 

## 2. Some comments about API design

A good API design has simple data collections such as sets, arrays and maps.
These should be data-type specific, and you may not need to implement all possible methods.

In today's programming language you should explore the available data collections and extending them via prototype delegation or other techniques of Object-Oriented Programming.

When learning about APIs it is very common to start with the CRUD (Create-Retrieve-Update-Delete) operations.
This is the case even if you have a NoSQL backend, or when you have multiple backends.

Following the REST principles, these can be mapped into 4 simple HTTP methods

- POST - CREATE
- GET - RETRIEVE
- PUT - UPDATE
- DELETE - DELETE

Sometimes you don't need all of these for each domain class. 
The general strategy is that sets of domain objects are accessed through `/type`.
For example, a call to `GET /books` returns all books.

If you're interested in accessing an individual resource you can use `/type/:id`.
For example, to retrieve the book with id `#123` we can use `GET /books/123`.

The other HTTP verbs are mapped appropriately.

Here are a few tips on designing an API:

- Resources should have concrete names. They are named after domain objects.
- Names should be plural (remember you return a collection of objects).
- Resource names should only contain nouns. There is no need for a verb in a URL name if you use the full set of HTTP methods.
- Do not use a scheme such as
  - `/books/publishedBy/:id`
  - `/books/publishedBy?q=Little+Brown`
  - Instead use sensibly parameterized queries
    - `/books?q=publisher&v=Little+Brown`
  - Or pass in queries
    - As JSON objects (in AJAX requests)

You should also think about the return types of your APIs.
For the moment we are exploring JSON as it can be handled on every platform and in every language.
However, it is very common to find API that support different format for the returned object (typically CSV or XML). For example, `GET /books/123?alt=xml` would return the book with id `#123` using XML.

Another point to consider when designing your API are related to those two questions:

- How does the client developer know that there is more data?
- How do clients tell the server that they want a subset of the data?

Pagination is a way of restricting to just some of the possible results.
It assumes that results are ordered in some meaningful way.
It can be achieved by using two parameters in the request:

- limit: the maximum number of results that should be returned (need to use a sensible default such as 10 or 25).
- offset: the starting point within the result set.

For example, `GET /books?offset=30&limit=10`.
You probably relate these two parameters to some pages where you can change the amount of entries showed in one page when listing or searching.

Talking about search, when designing your API a good practice is to use a standard parameter `?q=`.

You can design your API to allow explicit search with no resources, e.g., `/search?q=wizards+wands`.
The problem with this approach is that the client doesn't know what we are searching on nor what we should expect back.
Thus, you can search on an individual domain type:

- `/authors?q=wizards+wands`
- `/authors/123?q=wizards+wands`

Finally, you should never forget to deal with errors.
You should have an error handling that is structured and meaningful.
There are over 70 different HTTP status codes, way too many to deal with.

For the moment you should use a few HTTP status codes and descriptive text.
In terms of codes these should be enough:

- Status code 200
- Status code 400
- Status code 500

In terms of description, make the error text either

- An HTML page that goes direct to the user
- A JSON document

## 3. Playing around with APIs

We’ll take a very simple example which has a single class and identify the API calls which it requires.

There aren’t perfect solutions here. There are many possible solutions, each of which might be appropriate for a different scenario. 
We’re only going to look at the domain objects and routes.

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

## 4. Documenting the petshop

Now create the API documentation for the petshop application. Start by documenting the endpoints that are already defined in your code and then introduce endpoints for extra functionalities.

*These will be explored in the following weeks*

## 5. Suggestion of material

- Linkedin Learning - Building RESTful APIs with Node.js and Express - <https://www.linkedin.com/learning/building-restful-apis-with-node-js-and-express?u=69719634>
- Microsoft REST API Guidelines - <https://github.com/microsoft/api-guidelines>
