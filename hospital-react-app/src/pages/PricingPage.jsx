import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
    const services = [
        {
            id: 1,
            name: 'standard',
            price: 56.95,
            features: [
                'Quisque rhoncus',
                'Lorem ipsum dolor',
                'Vivamus velit mir',
                'Elit mir ivamus'
            ]
        },
        {
            id: 2,
            name: 'basic',
            price: 79.50,
            features: [
                'Quisque rhoncus',
                'Lorem ipsum dolor',
                'Vivamus velit mir',
                'Velit mir',
                'Elit mir ivamus'
            ]
        },
        {
            id: 3,
            name: 'deluxe',
            price: 103.40,
            features: [
                'Quisque rhoncus',
                'Lorem ipsum dolor',
                'Vivamus velit mir',
                'Elit mir ivamus',
                'Lorem ipsum dolor',
                'Ipsum dolor'
            ]
        },
        {
            id: 4,
            name: 'ultimate',
            price: 190.50,
            features: [
                'Quisque rhoncus',
                'Lorem ipsum dolor',
                'Vivamus velit mir',
                'It ir ivamus',
                'Elit mir ivamus',
                'Quisque rhoncus',
                'lit mir iamus'
            ]
        }
    ];

    return (
        <>
            <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
                <div className="container">
                    <div className="banner-content padding-large">
                        <h1 className="display-3 fw-bold text-dark">Pricing Plan</h1>
                        <span className="item"><Link to="/" className="">Home</Link></span> &nbsp; <span className="">/</span> &nbsp; <span
                            className=" item">Pricing</span>
                    </div>
                </div>
            </section>

            <section id="price" className="my-5">
                <div className="container py-5">
                    <h2 className="fw-bold display-4 mb-5">Pricing Plans</h2>
                    <div className="row py-4">
                        {services.map((service) => (
                            <div key={service.id} className="col-md-6 col-lg-3 pb-4">
                                <div className={`py-5 plan-post text-center ${service.name === 'basic' ? 'recommend-price' : ''}`}>
                                    <h6 className={`mb-3 ${service.name === 'basic' ? 'text-white' : ''}`}>{service.name}</h6>
                                    <h2 className={`${service.name === 'basic' ? 'text-white' : 'heading-color'} display-5 fw-bold mb-5`}>
                                        ${service.price}
                                    </h2>
                                    <div className="price-option">
                                        {service.features.map((feature, index) => (
                                            <p key={index} className={service.name === 'basic' ? 'text-white' : ''}>
                                                <span className={`price-tick ${service.name === 'basic' ? 'text-white' : ''}`}>✓</span> {feature}
                                            </p>
                                        ))}
                                    </div>
                                    <Link 
                                        to={`/booking?service=${service.name}&price=${service.price}`} 
                                        className={`btn btn-primary mt-3 px-4 py-3 mx-2 ${
                                            service.name === 'basic' ? 'text-black' : ''
                                        }`}
                                        style={service.name === 'basic' ? { background: 'white' } : {}}
                                    >
                                        Book now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="about-us" className="padding-large pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">5120</h5>
                                </div>
                                <p className="counter-description">Happy Patients</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">26</h5>
                                </div>
                                <p className="counter-description">Total Branches</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">53</h5>
                                </div>
                                <p className="counter-description">Senior Doctors</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="counter-info text-center">
                                <div className="counter-number text-primary-500 display-2 fw-semibold d-flex align-items-center justify-content-center">
                                    <span className="counter-prefix">+</span>
                                    <h5 className="timer display-4 fw-bold m-0" data-to="5120" data-speed="8000">10</h5>
                                </div>
                                <p className="counter-description">Years Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="our-services"
                style={{ backgroundImage: "url(images/services-bg.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "center top" }}>
                <div className="container">
                    <div className="row">
                        <div className="display-header text-light d-flex flex-wrap justify-content-between padding-medium">
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <h2 className="text-light">Our Best Services For Your Solution</h2>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <p className="text-light">Vitae aliquam vestibulum elit adipiscing massa diam in dignissim. Risus tellus libero
                                    elementum aliquam etiam. Lectus adipiscing est auctor mi quisque nunc non viverra est.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="home-thermometer mt-3 primary-color-500" width="50" height="50">
                                        <use xlinkHref="#home-thermometer" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">General Practitioners</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="pregnant-woman mt-3 primary-color-500" width="50" height="50">
                                        <use xlinkHref="#pregnant-woman" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">Pregnancy Support</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="nutrition mt-3 primary-color-500" width="50" height="50">
                                        <use xlinkHref="#nutrition" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">Nutritional Support</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 pb-3">
                            <div className="icon-box p-4 bg-light border-radius-10 text-center">
                                <div className="icon-box-icon">
                                    <svg className="local-pharmacy mt-3 primary-color-500" width="50" height="50">
                                        <use xlinkHref="#local-pharmacy" />
                                    </svg>
                                </div>
                                <div className="icon-box-content">
                                    <h3 className="card-title py-2">Pharmaceutical care</h3>
                                    <p>Aliquam etiam lectus adipiscing est auctor mi quisque non viverra.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingPage;