import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RemoveCart,AddCart, RemoveOne} from "../redux/actions/action";
const CardsDetails = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  const { id } = useParams();
  // console.log(id);
  const history = useNavigate();
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.CartReducer.carts);
  // console.log(getData)
  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    // console.log(compareData);
    setData(compareData);
  };
  useEffect(() => {
    compare();
  }, [id]);

  // For Remove Cart
  const remove =(id)=>{
    dispatch(RemoveCart(id));
    history("/");
  }
  const send = (e) =>{
    // console.log(e)
    dispatch(AddCart(e));
  }
  //Remove Each Item
  const removeDec = (item)=>{
    dispatch(RemoveOne(item))
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">Items Details Pages</h2>
      <section className="container mt-3">
        <div className="iteamsdetails">
          {data.map((element) => {
            return (
              <>
                <div className="items_img">
                  <img
                    src={element.imgdata}
                    alt="images"
                  />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          <strong>Restaurant</strong>: {element.rname}
                        </p>
                        <p>
                          <strong>Price</strong>: Rs. {element.price}
                        </p>
                        <p>
                          <strong>Dishes</strong>: {element.address}
                        </p>
                        <p>
                          <strong>Total</strong>: {element.price * element.qnty}
                        </p>
                        <div className="d-flex justify-content-between align-items-center" style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                           <span style={{fontSize:24}} onClick={element.qnty<=1 ? ()=>remove(element.id): ()=>removeDec(element)}>-</span>
                           <span style={{fontSize:21}}>{element.qnty}</span>
                           <span style={{fontSize:24}} onClick={()=>send(element)}>+</span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <strong>Rating: </strong>
                          <span
                            style={{
                              background: "green",
                              color: "#fff",
                              padding: "2px 5px",
                              borderRadius: "5px",
                            }}
                          >
                            {element.rating}★
                          </span>
                        </p>
                        <p>
                          <strong>Order Review: </strong>
                          <span>{element.somedata}</span>
                        </p>
                        <p>
                          <strong>Remove: </strong>
                          <span>
                            <i
                              className="fas fa-trash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            onClick={()=>remove(element.id)}></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CardsDetails;
