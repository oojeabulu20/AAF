# Week 03 - Functional JavaScript

This material can be found in this [link](https://codeberg.org/kaduardo/shu-aaf/src/branch/main/).

## Introduction

## Exercises

### Array manipulation

Here is an array of names:

```javascript
let names = ["Ben”, " Jones", "Riyadh”, “Hussein","Sam”, “Robertson-Chamberlain", "Francis”, “Mendoza", "Louise Macdonald","Zachary Akerman", "Kostas Stavropoulos", "Anna Ivanovic", "Tasleem Khan", "Mounika Sharma", "Dianne Ameter"];
```

Considering the given array, use the Array types list comprehensions to 

1. Return only those names with more than six characters. 
2. Return the length of the longest item in the array. 
3. Return all array items converted to lowercase. 
4. Return all items reversed so that “Fred” becomes “derF”. 

### Dice rolling

Implement the dice rolling program from the lecture slides. Write controlling code such that dice may only have 4, 6, 8, 10, 12 or 20 sides. 
Your code should be able to display the individual dice or the total rolled. The user should be able to choose between these options. Test that you can  

1. Create arbitrary numbers of dice of each type 
2. Combinations of dice in a single roll such as 3 six-sided and 2 twenty-sided 

### Factorial

Write a recursive function that calculates a factorial. Include error checking in your code as appropriate. 

### Array again

Here is an array of video cassettes (ask your parents). You may wish to add more data to the to ensure that your solutions work. 

```javascript
let newReleases = [ 
  { "id": 70111470, "title": "Die Hard", "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",  "uri": "",  "rating": [4.0], "bookmark": [] }, 
  { "id": 654356453, "title": "Bad Boys", "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": [5.0], "bookmark": [{ id: 432534, time: 65876586 }] }, 
  { "id": 65432445, "title": "The Chamber", "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": [4.0], "bookmark": [] },  
  { "id": 675465, "title": "Fracture", "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": 5.0, } 
]; 
```

1. Convert the array into an array of {id,title} pairs using `forEach()`.
2. Collect only those videos with a rating of 5.0 using `filter()`.
3. Return an array containing only the {id,title} pairs for videos with a rating of 5.0. 

### Challenge

Write a program that is able to take arbitrary length lists of numbers and return a list containing the square of each number in the list. 

## Other sources of exercises

The world is full of programming challenges and many of them can be done using a functional approach. 

If you don’t mind registering for an account then have a look at <https://www.hackerrank.com/domains/fp> 

If you want a classic set of problems and don’t want to register an account then take a look at <https://projecteuler.net>
