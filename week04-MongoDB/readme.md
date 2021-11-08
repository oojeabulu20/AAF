# Week 04 - Using MongoDB

This material can be found in this [link](https://codeberg.org/kaduardo/shu-aaf/src/branch/main/week04-MongoDB/readme.md).

## Introduction

This week you have two sets of tasks to complete in this topic. The first is relatively straightforward: copying and then building on the code shown in the lecture slides. In the second task you are asked to implement a more intriguing, and less straightforward database of your own.

In completing these two tasks you should work using the *command line* mongo client. Take your time - there isn’t a prize for finishing first. Try to avoid copy and paste except when inserting the data into the collection. You’ll find that by typing the code you will “get it under your fingers” and, consequently, you will learn more.

**Hot tip:** Remember to save your commands in a text file before typing them in the Command Interpreter.

## Setting up the server

In order to use MongoDB you will need to run a server locally in your computer. This is done by running the `mongod` command using the command line.

These steps guide you through the process of downloading and starting the `mongod` server for the first time.

1. Visit <https://www.mongodb.com/try/download/community>.
2. From the section *Available Downloads* select the option ZIP and then click on Download.
3. Move the downloaded file into your workspace folder and extract the downloaded package.
    - Some people like to use a folder inside the Documents folder, for example, `C:\Users\LabStudent-55-604385\Documents\Workspace`.
    - It is important to make a note of the folder you are using
4. Rename the extracted folder to `MongoDBServer` (just to keep the name short). 
    - For example, the extracted folder has the name `mongodb-windows-x86_64-5.0.3`.
    - After renaming it the full absolute path for you MongoDB is `C:\Users\LabStudent-55-604385\Documents\Workspace\MongoDBServer`
5. Inside the `MongoDBServer` folder create a new folder named `data`. 
6. From the Command Interpreter (e.g., Power Shell) run the mongod.exe command: `<path to mongod.exe> --dbpath=<path to data folder> --nojournal`
    - Example with full path: `C:\Users\LabStudent-55-604385\Documents\Workspace\MongoDBServer\bin\mongod.exe --dbpath=C:\Users\LabStudent-55-604385\Documents\Workspace\MongoDBServer\data --nojournal`
    - You should see some output in your Command Interpreter console indicating that the MondoDB server is now running. 
    - You can replace the dbpath parameter with any path you want. For example, to maintain separate databases per project.

## Running commands from the shell

In order to run commands from the shell you will use the `mongo` command line client.
Considering the full path used previously the command line client can be started with: 

- `C:\Users\LabStudent-55-604385\Documents\Workspace\MongoDBServer\bin\mongo.exe` (do not confuse with the `mongod` command used before).

You now have two Command Interpreter consoles running. One with the `mongod.exe` server and the other with the `mongo.exe` command line client that can be used to sendo commands to the MongoDB server.

Some usefull commands:

- To show all databases available run the command:
`show dbs`
- To find out your current database run the command `db`
- To create a database named shirts run the command: `use shirts`. If you run the command `show dbs` it will not appear on the list as it is currently empty.
- You can check your current database with the command `db`.

## Lecture slides

Now that you have a MondoDB server running work with the lecture slides to complete these tasks. 

1. Execute the code from the lecture slides so that you have a working collection with a full set of CRUD operations
2. Modify the embedded variants structure to make it queryable
3. Show that you can query variants
4. Create a schema for your products collection
5. Add a new document to represent orders
6. Implement CRUD operations on your orders collection

## Advanced

In this task you take some data that appears to be naturally relational and implement a mongo database to hold it. Hopefully doing this will make you question your assumptions about the ways in which data is structured and in the reasons for those structures.

There isn’t a correct answer to this problem. Often there isn’t a correct answer to the data structures that one builds except where they map nicely onto the relational model after a process of normalization.

### Task

Implement a database to hold data that meets the needs of the following problem.

You are going to run an online gaming tournament. Players will compete in tournaments over a period of 4 weeks. Each competitor will play at least three different games and will play against different opponents in each game. Individual games will be structured as either knockout tournaments or as mini leagues. The knockouts will be used for games that take a relatively long time to complete. Leagues will used for games that generally finish quickly.

- Your database should handle players, games, leagues and knockouts.
- You may use embedded documents.
- You may use arrays of items where necessary.
- You may try to model the solution using schema if you wish

*Remember to use a different database for this task.*

## Next steps

- Play around with MongoDB Compass.
    - the address of the MongoDB server is `localhost` and the default port is `27017`.

## References and further material

- MongoDB Web site - <https://www.mongodb.com/>
