import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import useAuth from "../custom-hooks/useAuth";
import { deleteDoc, doc, or } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import moment from "moment";
import 'moment/locale/vi';

const Order = () => {
  //   const { data: Data, loading } = useGetData("orders");
  const { data: ordersData, loading } = useGetData("orders");
  const { currentUser } = useAuth();

  console.log(ordersData);

  const userOrders = ordersData?.filter(order => order.email === currentUser.email);

  const totalAmountSum = ordersData?.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Đơn hàng của bạn</h4>
          </Col>
          <Col lg="12">
            <h4 className="fw-bold">Người dùng hiện tại: {currentUser.email}</h4>
          </Col>
          <Col lg="12" className="pt-5">

            {userOrders?.map((order) => {
              return (
                <>
                  <div className="border border-success rounded m-2">
                    <div className="d-flex">
                      <table className="table">
                        <thead>
                          <tr className="d-flex justify-content-between align-items-center">
                            <th className="d-flex justify-content-start align-items-start">
                              {/* <button
                                style={{ width: "30px", height: "35px" }}
                                className="btn btn-danger justify-content-center align-items-center"
                                onClick={() => {
                                  deleteOrder(order.id);
                                }}
                              >
                                X
                              </button> */}
                            </th>
                            <th>Tên: {order?.displayName}</th>
                            <th>Email: {order?.email}</th>
                            <th>Điện thoại: {order?.phone}</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div className="d-flex">
                      <table className="table">
                        <thead>
                          <tr className="justify-content-center ">
                            <th>Địa chỉ: {order?.address}</th>
                            <th>Thành phố: {order?.city}</th>
                            <th>Tổng: {order?.totalAmount} đ</th>
                            <th>
                              Ngày:
                              {order?.createdAt.toDate()?.toDateString()} {"  "}
                            </th>
                            <th>
                              <th>
                                Thời gian: {moment(order?.createdAt.toDate()).locale('vi').format('HH:mm')}
                              </th>

                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    {order?.cartItems.map((item) => {
                      return (
                        <div class="card rounded-3 bg-info">
                          <div class="card-body ">
                            <div class="row d-flex justify-content-between align-items-center">
                              <div class="col-md-1 ">
                                <img
                                  src={item?.imgUrl}
                                  class="img-fluid rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </div>
                              {/* <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <p class="lead fw-normal mb-2">{i?.productName}</p>
                                                            <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                                                        </div> */}
                              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button
                                  class="btn btn-link px-2"
                                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                >
                                  <i class="fas fa-minus"></i>
                                </button>

                                <input
                                  disabled
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={item?.quantity}
                                  type="number"
                                  class="form-control form-control-sm"
                                />

                                <button
                                  class="btn btn-link px-2"
                                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                >
                                  <i class="fas fa-plus"></i>
                                </button>
                              </div>
                              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0">{item?.totalPrice} đ</h5>
                              </div>
                              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" class="text-danger">
                                  <i class="fas fa-trash fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </Col>


        </Row>
      </Container>
    </section>
  );
};

export default Order;