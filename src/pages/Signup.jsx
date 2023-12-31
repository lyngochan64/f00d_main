import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebase.config.js";
import { storage } from "../firebase.config.js";
import { db } from "../firebase.config.js";

import { toast } from "react-toastify";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState("null");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + userName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on((error) => {
                toast.error(error.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    //update user profile
                    await updateProfile(user, {
                        displayName: userName,
                        photoURL: downloadURL,
                    });

                    //store user data in firestore database
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        displayName: userName,
                        email,
                        photoURL: downloadURL,
                    })
                });
            }
            );


            setLoading(false);
            toast.success("Tạo tài khoản thành công");
            navigate('/login');

        } catch (error) {
            setLoading(false)
            toast.error("Lỗi");

        }
    };

    return (
        <Helmet title="Signup">
            <section>
                <Container>
                    <Row>
                        {
                            loading ? <Col lg="12" className="text-center"><h5
                                className="fw-bold">Đang tải.....</h5></Col> : <Col lg="6" className="m-auto text-center">
                                <h3 className="fw-bold mb-4">Đăng kí</h3>

                                <Form className="auth__form" onSubmit={signup}>
                                    <FormGroup className="form__group">
                                        <input type="text" placeholder="Tên" value={userName} onChange={e => setUsername(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="email" placeholder="Nhập email của bạn" value={email} onChange={e => setEmail(e.target.value)} />
                                    </FormGroup>


                                    <FormGroup className="form__group">
                                        <input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
                                    </FormGroup>

                                    <FormGroup className="form__group">
                                        <input type="file" onChange={e => setFile(e.target.files[0])} />
                                    </FormGroup>

                                    <button type="submit" style={{ width: "145px" }} className="buy__btn auth__btn">Đăng kí</button>
                                    <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                                </Form>

                            </Col>
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );

};

export default Signup;