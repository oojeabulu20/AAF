/*
Here is an array of video cassettes (ask your parents). You may wish to add more data to the to ensure that your solutions work.
*/

newReleases = [
{ "id": 70111470, "title": "Die Hard", "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",  "uri": "",  "rating": [4.0], "bookmark": [] },
{ "id": 654356453, "title": "Bad Boys", "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": [5.0], "bookmark": [{ id: 432534, time: 65876586 }] },
{ "id": 65432445, "title": "The Chamber", "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": [4.0], "bookmark": [] }, 
{ "id": 675465, "title": "Fracture", "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg", "uri": "http://api.netflix.com/catalog/titles/movies/70111470", "rating": 5.0, }
]

//Convert the array into an array of {id,title} pairs using forEach()
var videos = newReleases.map(v => [v.id, v.title]);

//Collect only those videos with a rating of 5.0 using filter()
var goodRating = newReleases.filter(v => v.rating == 5);

//Return an array containing only the {id,title} pairs for videos with a rating of 5.0
var goodRatingVideos = newReleases.filter(v => v.rating == 5).map(v => [v.id, v.title]);

console.log(videos);
console.log(goodRating);
console.log(goodRatingVideos);