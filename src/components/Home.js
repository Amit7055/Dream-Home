import React from 'react';
import 'animate.css';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true });
  const [propertiesRef, propertiesInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true });

  return (
    <div>
      <section className="hero text-white text-center position-relative">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="4000">
              <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" className="d-block w-100 carouselImg" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src="https://architecturebeast.com/wp-content/uploads/2015/05/Modern_Apartment_With_An_Amazing_Ideas_featured_on_architecture_beast-7-min.jpg" className="d-block w-100 carouselImg" alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src="https://static.vecteezy.com/system/resources/previews/023/308/053/non_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg" className="d-block w-100 carouselImg" alt="..." />
            </div>
          </div>
        </div>
        <div className="hero-content">
          <h2>Find Your Dream Home Today</h2>
          <p>Search, buy, sell, and rent properties with ease</p>
          <div className="search-background">
            <form className="form-inline justify-content-center search-form">
              <input type="text" className="form-control FormControl mr-2 mb-2 mb-sm-0" placeholder="Search by City Name..." id="search-input" />
              <button type="submit" className="btn btn-warning mb-2 mb-sm-0 bttt">Search</button>
            </form>
          </div>
        </div>
      </section>

      <section ref={servicesRef} id="services" className={`services py-5 ${servicesInView ? 'animate__animated animate__fadeInUp' : ''}`}>
        <div className="container">
          <h2 className="text-center mb-5">Services</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="service">
                <h3>Buying</h3>
                <p>Explore a wide range of properties available for purchase.</p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="service">
                <h3>Selling</h3>
                <p>List your property and reach potential buyers quickly.</p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="service">
                <h3>Renting</h3>
                <p>Find rental properties that fit your needs and budget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={propertiesRef} id="properties" className={`properties py-5 ${propertiesInView ? 'animate__animated animate__fadeInUp' : ''}`}>
        <div className="container">
          <h2 className="text-center mb-5">Featured Properties</h2>
          <div className="row">
            <div className="col-md-4 mb-4 text-center">
              <div className="card">
                <img src="https://www.theplancollection.com/Upload/Designers/141/1323/Plan1411323MainImage_4_2_2021_10_891_593.jpg" className="card-img-top" alt="Property 1" />
                <div className="card-body">
                  <h5 className="card-title">Beautiful Family House</h5>
                  <p className="card-text">Located in a serene neighborhood, this beautiful family house is perfect for you.</p>
                  <p className="card-text"><strong>Price:</strong> $500,000</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <div className="card">
                <img src="https://media.istockphoto.com/id/1373329869/photo/modern-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=VBzd-UExnctNDY9rfqUc5Ys8IUyBmELYT0R2SSZ1_L4=" className="card-img-top" alt="Property 2" />
                <div className="card-body">
                  <h5 className="card-title">Modern Apartment</h5>
                  <p className="card-text">A modern apartment located in the heart of the city with all the amenities you need.</p>
                  <p className="card-text"><strong>Price:</strong> $300,000</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <div className="card">
                <img src="https://www.theplancollection.com/Upload/Designers/142/1265/Plan1421265MainImage_12_6_2021_2_891_593.jpg" className="card-img-top" alt="Property 3" />
                <div className="card-body">
                  <h5 className="card-title">Cozy Cottage</h5>
                  <p className="card-text">A cozy cottage located in the countryside, perfect for a weekend getaway.</p>
                  <p className="card-text"><strong>Price:</strong> $200,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} id="about" className={`about py-5 bg-light ${aboutInView ? 'animate__animated animate__fadeInUp' : ''}`}>
        <div className="container">
          <div className="row">
            <div className='col-md-6 aboutVideo'>
              <video width="100%" controls>
                <source src="./components/video/3410663-uhd_2562_1440_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-6 text-center">
              <h2>About Us</h2>
              <p>Dream Home is dedicated to making the property market more accessible and efficient for everyone involved. Our platform provides a seamless experience for buying, selling, and renting properties with innovative features and enhanced security measures.</p>
            </div>
          </div>
        </div>

      </section>

      <section ref={testimonialsRef} id="testimonials" className={`testimonials py-5 ${testimonialsInView ? 'animate__animated animate__backInUp' : ''}`}>
        <div className="container">
          <h2 className="text-center">Testimonials</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body d-flex align-items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaf8RofVDd8PwwAKBx95nOVkgh0xollJrQpQ&s" className="card-img-top testimonial-avatar mr-3" alt="Testimonial 1" />
                  <div>
                    <h5 className="card-title">John Doe</h5>
                    <p className="card-text">"Dream Home made finding our perfect house so easy! The platform is user-friendly and the customer service is excellent."</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body d-flex align-items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaf8RofVDd8PwwAKBx95nOVkgh0xollJrQpQ&s" className="card-img-top testimonial-avatar mr-3" alt="Testimonial 2" />
                  <div>
                    <h5 className="card-title">Jane Smith</h5>
                    <p className="card-text">"Selling our property through Dream Home was a breeze. We got great offers quickly and the entire process was smooth."</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body d-flex align-items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaf8RofVDd8PwwAKBx95nOVkgh0xollJrQpQ&s" className="card-img-top testimonial-avatar mr-3" alt="Testimonial 3" />
                  <div>
                    <h5 className="card-title">Sarah Brown</h5>
                    <p className="card-text">"I found my dream rental apartment thanks to Dream Home. The listings were detailed and the search filters were very helpful."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}