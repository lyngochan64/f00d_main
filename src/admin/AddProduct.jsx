import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup as div } from "reactstrap";
import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


import Swal from 'sweetalert2'
const AddProduct = () => {

    const [enterTitle, setEnterTitle] = useState("");
    const [enterShortDesc, setEnterShortDesc] = useState("");
    const [enterDescription, setEnterDescription] = useState("");
    const [enterCategory, setEnterCategory] = useState("");
    const [enterPrice, setEnterPrice] = useState("");
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        console.table(enterTitle, enterShortDesc, enterDescription, enterCategory, enterPrice, enterProductImg)
    }, [enterTitle, enterShortDesc, enterDescription, enterCategory, enterPrice, enterProductImg])
    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const product = {
        //     title: enterTitle,
        //     shortDesc: enterShortDesc,
        //     description: enterDescription,
        //     category: enterCategory,
        //     price: enterPrice,
        //     imgUrl: enterProductImg,
        // }

        //-------add product to the firebase database------
        try {
            const docRef = await collection(db, "products")

            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)
            console.log(uploadTask)
            uploadTask.on(() => {
                toast.error("Images not uploaded")
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    await addDoc(docRef, {
                        title: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                        cmt: []
                    });
                });

            });
            setLoading(false);
            toast.success("Sản phẩm đã được thêm vào giỏ hàng");
            navigate("/dashboard/all-products");
        } catch (error) {
            setLoading(false);
            toast.error("Lỗi");
        }


        // console.log(product);
    }

    const upload = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: enterTitle + "" + enterShortDesc + "" + enterDescription + "" + enterCategory + "" + enterPrice + "" + enterProductImg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                addProduct(e)
            }
        })
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? <h4 className="py-5">Đang tải....</h4> : <>

                                <h4 className="mb-5">Thêm sản phẩm</h4>
                                <div >
                                    <div className="form__group">
                                        <span>Tên sản phẩm</span>
                                        <input type="text" placeholder="Coca" value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                                    </div>
                                    {/* <div className="form__group">
                                        <span>Mô tả ngắn gọn</span>
                                        <input type="text" placeholder="Nó có vị ra sao..." value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                                    </div> */}

                                    <div className="form__group">
                                        <span>Mô tả</span>
                                        <input type="text" placeholder="Mô tả....." value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between gap-5">
                                        <div className="form__group w-50">
                                            <span>Giá</span>
                                            <input type="number" placeholder="100000đ" value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                                        </div>
                                        <div className="form__group w-50">
                                            <span>Loại</span>
                                            <select className="w-100 p-2"
                                                value={enterCategory}
                                                onChange={e => setEnterCategory(e.target.value)}>
                                                <option>Chọn loại</option>
                                                <option value="thức ăn nhanh">Thức ăn nhanh</option>
                                                <option value="kem">Kem</option>
                                                <option value="đồ uống">Đồ uống</option>
                                                <option value="trái cây">Trái cây</option>
                                                <option value="kẹo">Kẹo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="form__group">
                                            <span>Hình ảnh</span>
                                            <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} required />
                                        </div>
                                    </div>

                                </div>
                                <button onClick={addProduct} className="buy__btn" type="submit">Thêm</button>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddProduct;