import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images = [{ url: '' }] }) => {
  const [main, setMain] = useState(images[0])
  return (
    <Wrapper>
      <img src={main.url} alt='main' className='main' />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image.url}
              alt={images.filename}
              onClick={() => setMain(images[index])}
              className={`${image.url === main.url ? 'cover' : 'active '}`}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .cover{
    display: none;
  }
  .active:hover {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
   
  }

  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 70px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
