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
        fetch('/petshop/pet')
        .then(data => data.json())
        .then(res => {
            if (res.error)
                this.setState({ error: res.message });

            let temp = [];
            res.forEach(item => {
                temp.push(
                    <Animals 
                        key = {item._id}
                        name = {item.name}
                        age = {item.age}
                        breed = {item.breed}
                        colour = {item.colour}
                    />
                );
            });
            this.setState( {pets: temp} );
        });
    }
}

export default AnimalsClass;
