import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useAuth from "../custom-hooks/useAuth";
import useGetData from "../custom-hooks/useGetData";
const Dashboard = () => {


    const { data: product } = useGetData("products");
    const { data: users } = useGetData("users");
    const { data: orders } = useGetData("orders");
    
    const totalAmountSum = orders?.reduce(
        (acc, order) => acc + order.totalAmount,
        0
    ) || 0;
    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col className="lg-3">
                            <div className="revenue__box">
                                <h5>Tổng doanh thu</h5>
                                <span>{totalAmountSum}đ</span>
                            </div>
                        </Col>
                        <Col className="lg-3">
                            <div className="order__box">
                                <h5>Tổng đơn hàng</h5>
                                <span>{orders.length}</span>
                            </div>
                        </Col>
                        <Col className="lg-3">
                            <div className="products__box">
                                <h5>Tổng sản phẩm</h5>
                                <span>{product.length}</span>
                            </div>
                        </Col>
                        <Col className="lg-3">
                            <div className="users__box">
                                <h5>Tổng người dùng</h5>
                                <span>{users.length}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Dashboard;