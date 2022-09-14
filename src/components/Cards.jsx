import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { AddCart } from "../redux/actions/action";
import Cardsdata from "./CardsData";
import "./style.css";
const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  // console.log(data);
  const dispatch = useDispatch();
  const send = (e) =>{
    // console.log(e)
    dispatch(AddCart(e));
  }
  return (
    <div className="container-fluid mt-3">
      <h2 className="text-center">Add To Cart Project</h2>
      <div className="row d-flex justify-content-center items-align-center">
        {data.map((element, id) => {
          return (
            <>
              <Card style={{ width: "18rem", border:"none" }} className="mx-2 mt-4 card_style">
                <Card.Img variant="top" src={element.imgdata} style={{height:"16rem"}} className="mt-3"/>
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Rs. {element.price}</Card.Text>
                  <div className="buttonDiv d-flex justify-content-center ">
                    <Button variant="primary" className="col-lg-12" onClick={()=>send(element)}>Add To Cart</Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
