import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  // console.log(cartItems);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
        console.log(itemInfo);
      }
    });
    console.log(orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert("error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          placeholder="Email Address"
        />
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={data.zipcode}
            placeholder="Zip code"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          onChange={onChangeHandler}
          name="phone"
          value={data.phone}
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
