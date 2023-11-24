import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import products from "../assets/data/products";

import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";

import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";

import Clock from "../components/UI/Clock";

import counterImg from "../assets/images/counter-timer-img.png";

import useGetData from "../custom-hooks/useGetData";
const Home = () => {

    const { data: product, loading } = useGetData("products");
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    const [mobileProducts, setMobileProducts] = useState([]);
    const [wirelessProducts, setWirelessProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);

    const year = new Date().getFullYear();

    useEffect(() => {
        const filteredTrendingProducts = product.filter((item) => item.category === "thức ăn nhanh"
        );

        // const filteredBestSalesProducts = product.filter((item) => item.category === "ice cream");
        // const filteredMobileProducts = product.filter((item) => item.category === "drink");
        // const filteredWirelessProducts = product.filter((item) => item.category === "fruits");


        const filteredPopularProducts = shuffle(product);
        // console.log(filteredPopularProducts)

        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(shuffle(product));
        setMobileProducts(shuffle(product));
        setWirelessProducts(shuffle(product));
        setPopularProducts(filteredPopularProducts);
    }, [product]);
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    return (
        <Helmet title={"Home"}>
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg="6" md="6">
                            <div className="hero__content">
                                <p className="hero__subtitle">Trending product in {year}</p>
                                <h2>Get fresh Food in a Easy Way</h2>
                                <p>Just a click - We deliver what you want.Fast - Convenient - Safe!</p>

                                <motion.button whileTap={{ scale: 1.2 }} style={{ width: "210px" }} className="buy__btn"><Link to="/shop">Chọn món ngay</Link> </motion.button>
                            </div>
                        </Col>

                        <Col lg="6" md="6">
                            <div className="hero__img">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Services />
            <section className="trending__products">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title">Sản phẩm nổi bật</h2>
                        </Col>
                        {
                            loading ? <h5 className="fw-bold">Loading...</h5> :
                                <ProductsList data={trendingProducts} />
                        }

                    </Row>
                </Container>
            </section>
            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section__title">Sảm phẩm chất lượng nhất</h2>
                        </Col>
                        {
                            loading ? <h5 className="fw-bold">Đang tải....</h5> :
                                <ProductsList data={bestSalesProducts} />
                        }


                    </Row>
                </Container>
            </section>

            {/* <section className="timer__count">
                <Container>
                    <Row>
                        <Col lg="6" md="12" className="count__down-col">
                            <div className="clock__top-content">
                                <h4 className="text-white = fs-6 mb-2">Limited Offers</h4>
                                <h3 className="text-white = fs-5 mb-3">Best Sales</h3>
                            </div>
                            <Clock />
                            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn store__btn">
                                <Link to="/shop">Visit Store</Link>
                            </motion.button>
                        </Col>

                        <Col lg="6" md="12" className="text-end counter__img">
                            <img src={counterImg} alt="" />
                        </Col>
                    </Row>
                </Container>
            </section> */}
            <section className="new__arrivals">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-5">
                            <h2 className="section__title">Sản phẩm mới</h2>
                        </Col>
                        {
                            loading ? <h5 className="fw-bold">Đang tải....</h5> :
                                <ProductsList data={mobileProducts} />
                        }
                        {/* {
                            loading ? <h5 className="fw-bold">Loading...</h5> :
                                <ProductsList data={wirelessProducts} />
                        } */}


                    </Row>
                </Container>
            </section>
            <section className="popular_category">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-5">
                            <h2 className="section__title">Phổ biến trong danh mục</h2>
                        </Col>
                        {
                            loading ? <h5 className="fw-bold">Đang tải....</h5> :
                                <ProductsList data={popularProducts} />
                        }


                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};
export default Home;