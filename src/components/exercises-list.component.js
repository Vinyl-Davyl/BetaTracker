import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// This file has two components, the Exercise component(implemented as a functional react comp, no state and lifecycle methods) and ExercisesList component(implemented as a class comp)

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    {/* Substring because the date is a full date, include time and timezone */}
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>
        edit
      </Link> |
      <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>
        delete
      </a>
    </td>
  </tr>
)


export default class ExercisesList extends Component {
  // We start with a constructor to initialize the array
  constructor(props){
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};
  }

  // Then we get the list of exercises from the DB (endpoint)
  componentDidMount() {
    axios.get('https://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Method to delete exercises, taking in the object id that mongoDB automatically assigns
  deleteExercise(id){
    axios.delete('http://localhost:5000/exercises'+id)
      .then(res => console.log(res.data));
      // Then to delete on main page We sat IF el._id !== id then delete and return exercises
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  // .map is always going to return something for every element in the array, so returns component Exercise, then we pass in three props
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}  />
    })
  }

  render() {
    return (
      <div>
        {/* To show every exercise that has been added to the database */}
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Calls the exercise list method */}
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}