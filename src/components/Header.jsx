import {useState,useEffect} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { RemoveCart } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);
  // console.log("I am working")
  const getData = useSelector((state)=>state.CartReducer.carts);
  // console.log(getData);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const remove = (id)=>{
    dispatch(RemoveCart(id));
  }

  //Calculate Total Price
  const totalPrice = ()=>{
    let price = 0;
    getData.map((e,k)=>{
       price = e.price + price;
    });
    setPrice(price);
  }
  useEffect(()=>{
    totalPrice();
  },[totalPrice])
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-5">
            Add To Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {
            getData.length ?
            <div className="card_details" style={{width:"24rem", padding:10}}>
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getData.map((e)=>{
                      return (
                        <>
                          <tr>
                            <td>
                              <NavLink to={`/cart/${e.id}`} onClick={handleClose}><img src={e.imgdata} alt="images" style={{width:"5rem", height:"5rem"}}/></NavLink> 
                            </td>
                            <td>
                              <p>{e.rname}</p>
                              <p>Price: Rs. {e.price}</p>
                              <p>Quantity:{e.qnty}</p>
                              <p style={{color:"red",fontSize:20, cursor:"pointer"}} onClick={()=> remove(e.id)}>
                                <i className="fas fa-trash smalltrash"></i>
                              </p>
                            </td>
                            <td className="mt-5" style={{color:"red", fonrSize:20,cursor:"pointer"}} onClick={()=> remove(e.id)}>
                              <i className="fas fa-trash largetrash"> </i>
                            </td>
                          </tr>
                        </>
                      )
                    })
                  }
                  <p className="text-center">Total :Rs.{price}</p>
                </tbody>
              </Table>
            </div>:
            <div className="card_details d-flex justify-content-center align-items-center" style={{width:"14rem",padding:10,position:"relative"}}>
            <i className="fas fa-close smallclose" style={{position:"absolute",top:18,right:4,fontSize:23,cursor:"pointer"}} onClick={handleClose}></i>
            <p style={{fontSize:22}}>Your Cart is Empty</p>
          </div>
          }
          
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
