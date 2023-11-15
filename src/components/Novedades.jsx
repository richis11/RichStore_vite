import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { useState } from "react";
//import ExampleCarouselImage from '../images/productExample2.png';

function Novedades() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Container className="mt-3">
        <div>
          <h1>News</h1>
          <hr />
            <h2>⏳Proximamente...</h2>
          {/* <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <ExampleCarouselImage text="First slide" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <ExampleCarouselImage text="Second slide" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <ExampleCarouselImage text="Third slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel> */}
        </div>
      </Container>
    </>
  );
}

export default Novedades;
