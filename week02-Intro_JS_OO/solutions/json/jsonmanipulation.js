class jsonmanipulation {

    tt = { "classes":[
        { "room":"9310", "subject":"Fundamentals of Programming", "start":"10:00", "time":1 },
        { "room":"521", "subject":"Programming for Beginners", "start":"10:00", "time":1 },
        { "room":"9306", "subject":"Networking and Server Administration", "start":"14:00", "time":2 },
        { "room":"310", "subject":"Fundamentals of Programming", "start":"15:00", "time":1 }
    ]};

    constructor() {
    }

    //1. The whole data structure
    wholeStructure() {
        //whole structure
        console.log(this.tt);
        //Notice the difference in the output
        console.log(this.tt["classes"]);
        for (let c in this.tt.classes)
            console.log("class ", this.tt.classes[c]);
    }

    //2. The first data item
    firstElement() {
        // first element
        console.log("first element\n\t "+ JSON.stringify(this.tt["classes"][0]));
        console.log(this.tt.classes[0]);
    }

    //3. All item except the first
    allButFirst() {
        // all but the first
        console.log( "not the first element\n\t " + JSON.stringify(this.tt["classes"].slice(1) ));
        // or
        this.tt["classes"].slice(1).forEach(element => {
            console.log( "not the first element\n\t " + JSON.stringify(element) )
        });
        //or
        for(let i=1; i<this.tt.classes.length; i++)
            console.log("the class ", this.tt.classes[i]);
    }

    //4. All classes taught in room 310
    classesIn310() {
        // all classes taught in room 310
        this.tt["classes"].forEach(element => {
            if(element["room"] === "310")   
                console.log(element)
        });
        //or
        for (let c in this.tt.classes) {
            if( this.tt.classes[c].room === '310')
                console.log("class ", this.tt.classes[c])
        }
    }

    //5. All classes not taught in room 310
    classesNotIn310() {
        for (let c in this.tt.classes) {
            if( this.tt.classes[c].room !== '310')
                console.log("class ", this.tt.classes[c]);
        }
    }

    //6. Classes which are one hour long
    oneHourLong() {
        // classes that are one hour long
        this.tt["classes"].forEach(element => {
            if (element["time"] == 1)
                console.log(element);
        });
    }

    //7. Classes on the third floor of building nine
    thirdFloorBuildingNine() {
        // classes on floor 3 of building 9
        this.tt["classes"].forEach(element => {
            if (element["room"].slice(0,2) == "93")
                console.log("Building 9 floor 3 " + JSON.stringify(element))
        });
    }

    //8. Classes which are not titled Fundamentals of something
    noFundamentals() {
        // not titled fundamentals of something
        this.tt["classes"].forEach(element => {
            if (element["subject"].split(' ')[0] != "Fundamentals")
                console.log("Fundamentally Not " + JSON.stringify(element))
        });
        let patt = new RegExp("Fundamentals");
        for (let c in this.tt.classes) {
            let res = patt.test( this.tt.classes[c].subject )
            if(! res)
                console.log("class", this.tt.classes[c])
        }
    }
}

//Instantiating the object
let jsonmanipulation1 = new jsonmanipulation();

//Calling each method

// 1. The whole data structure
jsonmanipulation1.wholeStructure();

// 2. The first data item
jsonmanipulation1.firstElement();

// 3. All item except the first
jsonmanipulation1.allButFirst();

// 4. All classes taught in room 310
jsonmanipulation1.classesIn310();

// 5. All classes not taught in room 310
jsonmanipulation1.classesNotIn310();

// 6. Classes which are one hour long
jsonmanipulation1.oneHourLong();

// 7. Classes on the third floor of building nine
jsonmanipulation1.thirdFloorBuildingNine();

// 8. Classes which are not titled Fundamentals of something
jsonmanipulation1.noFundamentals();
