import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Users = () => {

    const { data: usersData, loading } = useGetData("users");

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        toast.success("Đã xóa.!")
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <h4 className="fw-bold">Danh sách người dùng</h4>
                    </Col>
                    <Col lg="12" className="pt-5" style={{ width: "90%" }} >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên người dùng</th>
                                    <th>Email</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? (
                                        <h5 className="pt-5 fw-bold">Đang tải....</h5>
                                    ) : (
                                        usersData?.map(user => (
                                            <tr key={user.uid}>
                                                <td>
                                                    <img src={user.photoURL} alt="" />
                                                </td>
                                                <td>{user.displayName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button className="btn btn-danger" 
                                                    style={{ width: "30px", height: "35px" }}
                                                     onClick={() => {
                                                        deleteUser(user.uid);
                                                    }}>x</button>
                                                </td>

                                            </tr>
                                        ))
                                    )}
                            </tbody>


                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Users;