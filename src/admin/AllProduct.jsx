import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData.js";

import { db } from "../firebase.config.js";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AllProduct = () => {
    const { data: productsData, loading } = useGetData("products");
    // console.log(productsData);

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, "products", id));
        toast.success("Deleted.!");
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" style={{ width: "90%" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th style={{ width: "400px" }}>Tên</th>
                                    <th>Loại</th>
                                    <th>Giá</th>
                                    <th>
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <h4 className="py-5 text-center fw-bold">Loading...</h4>
                                ) : (
                                    productsData.map(item => (
                                        <tr key={item.id}>
                                            <td><img src={item.imgUrl} alt="" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.category}</td>
                                            <td>{item.price} đ</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        deleteProduct(item.id);
                                                    }}
                                                    style={{ width: "30px", height: "35px" }} className="btn btn-danger">x</button>
                                            </td>
                                        </tr>

                                    ))
                                )

                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AllProduct;