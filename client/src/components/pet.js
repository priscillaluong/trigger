import React from "react";
import "../assets/css/pet.css"
import Button from 'react-bootstrap/Button';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { PET } from '../utils/queries';
import { SAVE_PET } from "../utils/mutations"
import Auth from "../utils/auth";
import CommentList from "./comments/commentList";
import CommentForm from "./comments/commentForm";



const Pet = () => {


  const [savePet, { error }] = useMutation( SAVE_PET );
  const { petId } = useParams();
  const { userId } = useParams();

  const HandleLike = async (e) => {

    const petId = e.target.value

    try {
      const { data } = await savePet({
        variables: { petId },
      });
      window.location.reload(); 

    } catch (err) {

      console.error(err);
    }
  
  };


  const { loading, data } = useQuery(PET, {
    variables: { petId: petId },
  });

  // Check if data is returning from the query
  const pet = data?.pet || {};



  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
  <main>

    <div className="pet">
      <div className="header-container-pet">
        <p style={{color: "white"}} className="date-created">POST CREATED: <span>{pet.dateCreated}</span></p>
        <button class="btn-secondary like-review rounded" value={pet._id} onClick={(e) => HandleLike(e)}>
          <i className="fa fa-heart" aria-hidden="true"></i>Like</button>
        <h3 className="header-text-pet">{pet.name}</h3>
      </div>

      <div className="pet-div">
        <div className="pet-image-div">
          <img className="pet-image" alt="pet" src={pet.image}></img>
        </div>

        <div className="pet-details">
          <h6>AGE: <span>{pet.age}</span></h6>
          <h6>GENDER: <span>{pet.gender}</span></h6>
          <h6>SPECIES: <span>{pet.species}</span></h6>
          <h6>BREED: <span>{pet.breed}</span></h6>
          <h6>COLOUR: <span>{pet.colour}</span></h6>
          <h6>CITY: <span>{pet.city}</span></h6>
          <h6>COUNTRY: <span>{pet.country}</span></h6>
        </div>
      </div>


      <div className="pet-description">
        <h6>DESCRIPTION:</h6>
        <p>{pet.description}</p>
        <h6>MEDICAL HISTORY:</h6>
        <p>{pet.medicalHistory}</p>
      </div>

      <div className="pet-buttons-div">
        <div className="pet-buttons">
          <Link to="/pets">
          <Button>BACK TO PETS</Button>
          </Link>
          {userId ? (
          <Link to={`/dashboard/message-form/${pet.owner._id}`}>
          <Button
          >MESSAGE: <span>{pet.owner.fullname}</span></Button>
          </Link>
          ) : (
          <Link to="/login">
            <Button style={{ width:"fit-content"}}>MESSAGE: <span>{pet.owner.fullname}</span></Button>
          </Link>
          )}
        </div>
      </div>
    </div>
    
    <section className="comment-section">
      <div>
        <CommentForm petId={pet._id} />
        <CommentList comments={pet.comments} />
      </div>
    </section>



  </main >
  )
};

export default Pet;
