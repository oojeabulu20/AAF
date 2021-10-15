# Week 05 - Node JS

This material can be found in this [link](https://codeberg.org/kaduardo/shu-aaf/src/branch/main/week05-NodeJS/exercises05.md).

## Introduction

This week you will start playing around with NodeJS.
The idea is to gradually build a basic Web application while exploring the different ways in which code can be organised.

## Getting set up on Windows

Create a folder called <some drive>:\aaf
Download the latest version of the server from http://nodejs.org/download/
Using a plain text editor such as Atom, Notepad++ or Sublime Text create a file called hello.js in <some drive>:\aaf
Put this code in the file and save it
console.log("Hello World");
Open a terminal (or Windows Powershell) and go to
 <some drive>:\aaf
The Azure Labs VM has VS Code and node installed and ready to use.

## Getting set up

Run your code with this instruction if you have node in the same directory as your code
.\node.exe hello.js
Or this if node is installed on your system path
node .\hello.js
Or this if you are using a mac
node ./hello.js
Did it give you the output that you expected?
Note that you can use JavaScript engines to execute this type of code without having node.js
If you are using a USB stick or have node on a SHU PC you will need to put the full path to your node executable

e:\node\v10.11.0\node hello.js


## Use cases for a Web application
Throughout this lab you are going to develop a simple Web application with the following features
User can see the application in a browser
The user sees a welcome page when they navigate to one of the following URLs
On your own PC http://localhost:3000/welcome
The user is asked to enter name and password into a form
The form is submitted to a server application which returns an acknowledgement


The stack
We need the following components
An HTTP server
A router to direct requests to processes depending on the URL from which they originate
Code to handle the requests
Handlers for the data which the user submits from the form
Views which construct the pages we return to the user

We’re going to build this stack as a set of modules

The server
Create a file called server.js containing the following code
var http = require("http");

http.createServer( function( request, response ) {

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();

}).listen(3000);

Run the code by typing node server.js in a terminal or shell

Converting server.js into a module
We should organise our code into distinct modules
Then we can call functions from other parts of our program
Do this by exporting those functions which you want to call from outside the module
There are many design patterns and idioms for creating JavaScript and node modules
Refactor your server.js like the next slide
Replace the ellipses with the code that returns "Hello World"
You’ll need to stop node (using Ctl-C) and restart it to run your new code

Converting server.js into a module
var http = require("http");
function start() {
	function onRequest(request, response) { ...
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server started");
}
exports.start = start;


Converting server.js into a module
Now you’ll need a way of calling the code inside the module
Create a new file called index.js
Put this code into it
var server = require("./server");
server.start();
Run the server with 
node.exe index.js
View the result in the preview browser 
Now let’s understand what is happening there


The server
Is that really asynchronous and event-driven?
Try adding some console logging
var http = require("http");

function onRequest(request, response) {
	console.log("Request received");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}

http.createServer(onRequest).listen(3000);
console.log("Server started");


Routing requests
Requests from different URLs need to be routed to different functions
POST and GET parameters need to be extracted and made available
Everything we need is in the request object we are using as a parameter to onRequest()
Node has two modules which will help us handle these data items
url
querystring

Routing requests
var http = require("http");
var url = require("url");
function start() {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request from "+ pathname);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server started");
}
exports.start = start;

Try calling this from different URLs such as

http://localhost:3000  http://localhost:3000/blah  http://localhost:3000/blah?val=23

The router
In a file called router.js put
function route(pathname) {
	console.log("Routing to "+ pathname);
}
exports.route = route;
And change the start() function to be
function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		route(pathname);
This is an example of dependency injection

Extend index.js
We now need to modify index.js so that the dependency is injected
var server = require("./server");
var router = require("./router");

server.start(router.route);
Restart the server and try the code
What output do you get?
Do you understand what is happening?

Request handlers
The router needs somewhere to route to
Each URL (endpoint) is going to map onto a function
These are called request handlers
Create a new module named requestHandlers.js with this code
function start() {
	console.log("Request handler start called");
}
function submit() {
	console.log("Request handler submit called");
}
exports.start = start;
exports.submit = submit;


Request handlers
Now you need to tell the router about the handlers
This has to be done in a way which is flexible and extensible
We’ll do this using a JavaScript object in index.js
Change that module to look like this
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/submit"] = requestHandlers.submit;
server.start(handle, router.route);


Request handlers
Now you need to change the server to
Accept the handler at start up
Pass the handler to the router

function start(handle, route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		route(handle, pathname);

The route() function needs some more drastic changes
This will make decisions about where to send requests
It is acting as a controller

The route() function
Modify the router to be
function route(handle, pathname) {
	console.log("Routing to "+ pathname);
	if(typeof handle[pathname] === 'function') {
		handle[pathname]();
	} else {
		console.log("No request handler found for "+ pathname);
	}
}
exports.route = route;

Notice the use of typeof()
Notice ===
Notice how the function call is constructed dynamically

Returning results the wrong way
You can get data back to the client by following the incoming route
Remember how server.js writes a response?
Return the result from the requestHandler to server.start()
Have server.start() write it out
Try and do this for yourself…
You’ll need to edit server.js, requestHandlers.js and router.js
Test all possible routes through your solution
Can you think of any potential problems?
What if the request handler is blocked waiting for data?
Accessing another system
Accessing a database server

Returning results the wrong way
Modify requestHandlers.start() to be
function start() {
	console.log("Request handler start called");
	function sleep(mSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + mSeconds);
	}
	sleep(10000);
	return "In start()";
}
Try running concurrent requests from two browsers 
One for start and one for submit

Add code to print the times when the function is called and when it finishes

Removing the block
We need to re-engineer our code so that it doesn’t block
We’ll move the response phase from the server and put it further down the pipeline
Modify server.start() to begin with
function start(handle, route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		route(handle, pathname, response);
	}
Notice we’re now going to use the response object


Removing the block
Change router.route() to be

function route(handle, pathname, response) {
	console.log("Routing to "+ pathname);
	if(typeof handle[pathname] === 'function') {
		return handle[pathname](response);
	} else {
		console.log("No request handler found for "+ pathname);
		response.writeHead(404, {"Content-Type":  "text/plain"} );
		response.write("404 page not found");
		response.end()
	}
}
exports.route = route;


Removing the block
Finally change the request handlers to
function start(response) {
	console.log("Request handler start called");
	response.writeHead(200, {"Content-Type": "text/plain"} );
	response.write("Request Handler start called");
	response.end();
}
function submit(response) {
	response.writeHead(200, {"Content-Type": "text/plain"} );
	response.write("Request Handler SUBMIT called");
	response.end();
}
exports.start = start;
exports.submit = submit;


Submitting data
Data can be sent using either HTTP GET or POST
The next steps are to 
Extract the submitted data
Put that data into a JavaScript object for further processing
Create a form from which the data can be sent
Change server.start.onRequest to be
function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;
		route(handle, pathname, response, query);
}
Notice the addition of the query parameter? That holds the query string
name=Hallam

Submitting data
Change router.route() to be
function route(handle, pathname, response, query) {
	console.log("Routing to "+ pathname);
	if(typeof handle[pathname] === 'function') {
		return handle[pathname](response, query);
	} else {
		console.log("No request handler found for "+ pathname);
		response.writeHead(404, {"Content-Type":  "text/plain"} );
		response.write("404 page not found");
		response.end()
	}
}
exports.route = route;


Submitting data
Change requestHandlers.submit() to be
function submit(response, query) {
	console.log("In submit with query string "+ query);
	var queryAsObject = querystring.parse(query);

	response.writeHead(200, {"Content-Type": "text/plain"} );
	response.write("Request Handler SUBMIT called with value "+ queryAsObject['a']);
	response.end();
}
You’ll need to require the querystring module
This code uses a JavaScript object as a dictionary

Exercises
Modify the code such that a request object is passed to the handler which then extracts the parameters itself rather than having the server extract them.
Change requestHandler.start() so that it returns an HTML form
You’ll use a series of calls to response.write()
The form accepts three data items: name,  degree course,  age
The form should send its data to your submit() method using HTTP GET
Modify submit() to extract the three data items and return a table in which they are neatly formatted

Next we will look at POST

POST
HTTP POST is a little different to GET
Data is sent in the body of the reply
Data volumes can be very large
Data arrives across many packets
The server has to be non-blocking
Data can take a long time to arrive
The response handler has to reassemble the data


POST
Node will pass the packets of data to our client code
We must implement listeners and callbacks to handle data as it arrives
The arrival of data triggers an event
We’ll add the listeners to the request object in the server
The server is logically the place which provides data to the rest of the application
First modify your form to use POST instead of GET


The server.start() function
Change this function to handle incoming data
function start(handle, route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = url.parse(request.url).query;
		var postData = "";
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received more data: "+ postDataChunk);
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}


The server.start() function
We need two listeners
One listens for incoming data packets and adds them to the data which has already arrived
The second listens for the end of the data and calls route()
Everything here is asynchronous
I’ve changed the order of the parameters so that the difference from GET is clearer

Router.route()
We’ll need to change this to pass the posted data onto the request handlers
function route(handle, pathname, response, postData) {
	console.log("Routing to "+ pathname);
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		console.log("No request handler found for "+ pathname);
		response.writeHead(404, {"Content-Type":  "text/plain"} );
		response.write("404 page not found");
		response.end()
	}
}
exports.route = route;

Request handlers: submit
The submit() handler just has to be tweaked to manage the different order and naming of the parameters

function submit(response, postData) {
	console.log("In submit with data "+ postData);

	response.writeHead(200, {"Content-Type": "text/plain"} );
	response.write("Request Handler SUBMIT called with value "+ postData);
	response.end();
}


Request handlers: start
function start(response, postData) {
	var body = "<html>"+
		"<head><title>Index</title></head>"+
		"<body>"+
		"<form action='/submit' method='post'>"+
		"Name: <input type='text' name='name'/>"+
		"Degree: <input type='text' name='degree'/>"+
		"Age: <input type='text' name='age'/>"+
		"<input type='submit' value='Submit it' />"+
		"</body></html>";
	response.writeHead(200, {"Content-Type": "text/html"} );
	response.write(body);
	response.end();
}


Exercises
Extract the data from the body of the POST and
Output it console.log
Return it the browser alongside the form that lets users submit more data 
Add a text area to the form and try passing large volumes of data around
Change the requestHandler for POSTed data such that it will put the submitted data into a JavaScript object
Unify the code so that you have 
A method called question which accepts GET parameters
This could be used to query a database
The submit method we just worked on which handles POST data
