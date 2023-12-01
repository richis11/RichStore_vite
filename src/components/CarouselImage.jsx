import React from 'react'
import productExample from "../images/productExample2.png";
import { Image } from 'react-bootstrap';

function CarouselImage({text='example carousel image', imgUrl=productExample}) {
  return (
    <div style={{background:'grey',height:'60vh'}}>
    <Image className='w-100' src={imgUrl} alt="imagen producto" />
    </div>
  )
}

export default CarouselImage