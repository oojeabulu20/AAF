import React, { Component } from 'react';
import Animals from './Animals';

class AnimalsClass extends Component {
   constructor(props) {
       super(props);
       this.state = {
           pets: [],
           error: null
       }
   } 

   render() {
       let data = this.state.pets || {};
       return (
           <div>
               <p>Here are the pets</p>
               <ul>
                   {data}
               </ul>
           </div>
       );
   }

   componentDidMount() {
    let pets = [
        { id:"1", name:"Logan", age:"5", breed:"Border Collie", colour:"Black, white, tan" }, 
        { id:"2", name:"Ralph", age:"2", breed:"Cocker Spaniel", colour:"Ginger" },
        { id:"3", name:"Gryphon", age:"9", breed:"Staffie X", colour:"grey" }
    ];
    let temp = [];

    pets.forEach(item => {
        temp.push(<Animals
            key={item.id}
            name={item.name}
            age={item.age}
            breed={item.breed}
            colour={item.colour}
            />);
    });
    this.setState( {pets: temp} );
}
}

export default AnimalsClass;
