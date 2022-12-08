import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PET } from "../Utils/mutations";
import { PET } from "../Utils/queries";
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";

function EditListing() {
  // Create state variables for the fields in the form
  const petId = useParams().petId;

  const [species, setSpecies] = useState();
  const [breed, setBreed] = useState();
  const [image, setImage] = useState();
  const [colour, setColour] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [medicalHistory, setMedicalHistory] = useState();

  const { loading, data } = useQuery(PET, { variables: { petId }});
  const [updatePet, { error }] = useMutation(UPDATE_PET, petId);

  const pet = data?.pet;
  if(data) {
    console.log('pet:', pet);
    console.log('image:', pet.image)
  }

  const handleEditPet = async (event) => {
    event.preventDefault();
    console.log(event);
    try {
      const { data } = await updatePet({
        variables: {
          petId: pet._id,
          species,
          breed,
          image,
          colour,
          name,
          description,
          gender,
          city,
          country,
          medicalHistory,
        },
      });
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <div className="formContainer">
      {loading ? <p>Loading...</p> : 
      <Form
        onSubmit={handleEditPet}
        style={{
          backgroundColor: "#AD7940",
          opacity: "0.8",
          width: "80%",
          marginLeft: "10%",
          marginTop: "100px",
          marginBottom: "150px",
          padding: "2vh",
        }}
      >
        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "20px" }}
          >
            ANIMAL SPECIES:
          </Form.Label>
          <Form.Control
            style={{ color: "#AD7940", fontSize: "20px" }}
            type="species"
            placeholder="REQUIRED"
            defaultValue={`${pet.species}`}
            name="species"
            onChange={(event) => setSpecies(event.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "2.5vh" }}
          >
            BREED:
          </Form.Label>
          <Form.Control
            style={{  fontSize: "2.5vh" }}
            type="breed"
            placeholder="REQUIRED"
            defaultValue={`${pet.breed}`}
            name="breed"
            onChange={(event) => setBreed(event.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "2.5vh" }}
          >
            COLOUR:
          </Form.Label>
          <Form.Control
            style={{ fontSize: "2.5vh" }}
            type="colour"
            placeholder="REQUIRED"
            defaultValue={`${pet.colour}`}
            name="colour"
            onChange={(event) => setColour(event.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "2.5vh" }}
          >
            GENDER:
          </Form.Label>
          <Form.Control
            style={{ fontSize: "2.5vh" }}
            type="gender"
            placeholder="REQUIRED"
            defaultValue={`${pet.gender}`}
            name="gender"
            onChange={(event) => setGender(event.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "2.5vh" }}
          >
            NAME:
          </Form.Label>
          <Form.Control
            style={{  fontSize: "20px" }}
            type="name"
            placeholder="REQUIRED"
            defaultValue={`${pet.name}`}
            name="name"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

{/*         <Form.Group
          style={{ width: "100%", marginLeft: "3%" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "2.5vh" }}
          >
            UPLOAD IMAGE OF YOUR PET:
          </Form.Label>
          <Form.Control
            style={{ width: "81%", fontSize: "2.5vh", display: "inline-block" }}
            type="file"
            placeholder="ENTER IMAGE"
             defaultValue={pet.image}  
            accept="image/png image.jpg"
            name="image"
            onChange={(event) => setImage(event.target.value)}
          />
        </Form.Group> */}

        <Form.Group style={{ width: "94%", marginLeft: "3%" }} className="mb-3">
          <Form.Label
            style={{ color: "#f2faf5", width: "95%", fontSize: "20px" }}
          >
            DESCRIPTION:
          </Form.Label>
          <textarea
            style={{
              color: "#AD7940",
              fontSize: "20px",
              height: "100px",
              width: "99%",
            }}
            type="description"
            placeholder="REQUIRED"
            defaultValue={`${pet.description}`}
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            className="form-control input"
          />
        </Form.Group>

        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "20px" }}
          >
            CITY:
          </Form.Label>
          <Form.Control
            style={{ color: "#AD7940", fontSize: "20px" }}
            type="city"
            placeholder="REQUIRED"
            defaultValue={`${pet.city}`}
            name="city"
            onChange={(event) => setCity(event.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{ width: "45%", marginLeft: "3%", display: "inline-block" }}
          className="mb-3"
        >
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "20px" }}
          >
            COUNRTY:
          </Form.Label>
          <Form.Control
            style={{ color: "#AD7940", fontSize: "20px" }}
            type="country"
            placeholder="REQUIRED"
            defaultValue={`${pet.country}`}
            name="country"
            onChange={(event) => setCountry(event.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ width: "93%", marginLeft: "3%" }} className="mb-3">
          <Form.Label
            style={{ color: "#f2faf5", width: "80%", fontSize: "20px" }}
          >
            MEDICAL HISTORY:
          </Form.Label>
          <Form.Control
            style={{ color: "#AD7940", fontSize: "20px" }}
            type="medical-history"
            placeholder="REQUIRED"
            defaultValue={`${pet.medicalHistory}`}
            name="medicalHistory"
            onChange={(event) => setMedicalHistory(event.target.value)}
          />
        </Form.Group>

        <Button
          style={{
            width: "25vh",
            marginLeft: "42%",
            backgroundColor: "#9CCBC3",
            color: "#f2faf5",
            marginBottom: "2vh",
            marginTop: "2vh",
            fontSize: "20px",
          }}
          variant="primary"
          type="submit"
        >
          UPDATE PET
        </Button>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            {error.message}
          </div>
        )}
      </Form>
}
    </div>
        
  );
}

export default EditListing;
