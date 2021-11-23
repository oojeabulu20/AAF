import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class CreateAnimal extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
    this.onChangeAnimalSpecies = this.onChangeAnimalSpecies.bind(this);
    this.onChangeAnimalBreed = this.onChangeAnimalBreed.bind(this);
    this.onChangeAnimalAge = this.onChangeAnimalAge.bind(this);
    this.onChangeAnimalColour = this.onChangeAnimalColour.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      species: '',
      breed: '',
      age: '',
      colour: ''
    }
  }

  onChangeAnimalName(e) {
    this.setState({name: e.target.value})
  }

  onChangeAnimalSpecies(e) {
    this.setState({species: e.target.value})
  }

  onChangeAnimalBreed(e) {
    this.setState({breed: e.target.value})
  }

  onChangeAnimalAge(e) {
    this.setState({age: e.target.value})
  }

  onChangeAnimalColour(e) {
    this.setState({colour: e.target.value})
  }


  onSubmit(e) {
    e.preventDefault()

    const animalObject = {
      name: this.state.name,
      species: this.state.species,
      breed: this.state.breed,
      age: this.state.age,
      colour: this.state.colour
    };
    axios.post('http://localhost:4000/animals/create-animal', animalObject)
    .then(res => console.log(res.data));

    this.setState({
      name: '', 
      species: '', 
      breed: '', 
      age: '', 
      colour: ''
    })

  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeAnimalName}/>
        </Form.Group>

        <Form.Group controlId="Species">
          <Form.Label>Species</Form.Label>
          <Form.Control type="text" value={this.state.species} onChange={this.onChangeAnimalSpecies}/>
        </Form.Group>

        <Form.Group controlId="Breed">
          <Form.Label>Breed</Form.Label>
          <Form.Control type="text" value={this.state.breed} onChange={this.onChangeAnimalBreed}/>
        </Form.Group>

        <Form.Group controlId="Age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={this.state.age} onChange={this.onChangeAnimalAge}/>
        </Form.Group>

        <Form.Group controlId="Colour">
          <Form.Label>Colour</Form.Label>
          <Form.Control type="text" value={this.state.colour} onChange={this.onChangeAnimalColour}/>
        </Form.Group>



        <Button variant="danger" size="lg" block="block" type="submit">
          Create Animal
        </Button>
      </Form>
    </div>);
  }
}