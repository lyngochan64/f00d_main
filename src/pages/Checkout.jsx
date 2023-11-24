
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/checkout.css";
import { useSelector } from "react-redux";
import useAuth from "../custom-hooks/useAuth";


import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Timestamp, collection, addDoc, setDoc, doc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const { currentUser } = useAuth();

  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      userId: currentUser?.uid,
      displayName: currentUser?.displayName,
      email: currentUser?.email,
      phone: phone,
      city: city,
      address: address,
      code: code,
      cartItems,
      totalAmount: totalAmount,
      createdAt: Timestamp.now(),
    };
    // console.table(data?.cartItems)
    try {
      // const docRef = await collection(db, "orders", '8')
      await setDoc(doc(db, "orders", uuidv4()), data);

      setLoading(false);
      toast.success("Đặt hàng thành công");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Loi");
    }

    // console.log(product);
  };

  return (
    <Helmet title="Thanh toán">
      <CommonSection title="Thanh toán" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Thông tin đơn hàng</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    value={currentUser?.displayName}
                    disabled
                    placeholder="Enter your name"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="email"
                    value={currentUser?.email}
                    disabled
                    placeholder="Enter your email"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="number"
                    placeholder="Điện thoại"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    placeholder="Địa chỉ"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    type="text"
                    placeholder="Thành phố"
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    type="text"
                    placeholder="Postal code"
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Số lượng: <span>{totalQty} sản phẩm</span>
                </h6>
                <h6>
                  Giá: <span>{totalAmount} đ</span>
                </h6>
                <h6>
                  <span>
                    Vận chuyển: <br />
                    miễn phí
                  </span>
                  <span>0 đ</span>
                </h6>

                <h4>
                  Tổng chi phí: <span>{totalAmount} đ</span>
                </h4>
                {currentUser?.uid != "" ? (
                  <>
                    <button
                      onClick={addProduct}
                      className="buy_btn auth__btn w-100"
                    >
                      ĐẶT HÀNG
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={navigate("/login")}
                      className="buy_btn auth__btn w-100"
                    >
                      Place an oder
                    </button>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;