import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  border-bottom: 1px solid grey;
  box-sizing: border-box;
  padding: 10px;
  font-family: 'Cormorant Garamond', serif;
`
const ImageWrapper = styled.div`
  position: relative;
  margin: 8px;
  cursor: pointer;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Image = styled.img`
  width: 70px;
  heigth: 200px;
  ${ImageWrapper}:hover & {
      filter: brightness(20%)
  }
`
const ImageText = styled.button`
  position: absolute;
  cursor: pointer;
  border: none;
  font-size: 15px;
  background-color: transparent;
  top: 20%;
  color: white;
  display: none;
  ${ImageWrapper}:hover & {
      display: block;
  }
`

const RatingsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #999999;
`

const BookTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 5px;
`

const StarsContainer = styled.div`
 width: 100px;
 height: 30px;
 display: flex;
 position: relative;
 align-items: center;
`
const StarsFilling = styled.div`
  height: 30px;
  background-color: red;
  width: ${props => props.width}%;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: -1
  
`
const Stars = styled.img`
  width: 100%;
  position: absolute;
  z-index: -2;
`

const AuthorButton = styled.button`
  border: none;
  background: transparent;
  text-decoration: underline;
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
`

export const BookCard = ({ setKeyword, ...book }) => {
  const author = book.authors.split('-')[0].replace(' ', '_')
  const [showTextField, setShowTextField] = useState(false)
  const [imgUrl, setImgUrl] = useState()


  const addImage = (e) => {
    e.preventDefault()
    fetch(`https://bardolphs-books.herokuapp.com/books/${book.bookID}`, {
      method: "PUT",
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ image_url: imgUrl })
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
    setShowTextField(false)
  }
  return (
    <CardContainer>
      <ImageWrapper>
        {!book.image_url && <Image src={require('../blank-cover.jpg')} />}
        {book.image_url && <Image src={book.image_url} />}
        <ImageText onClick={() => setShowTextField(!showTextField)}>Update Image</ImageText>
      </ImageWrapper>
      <InfoWrapper>
        <Link style={{ color: 'black', textDecoration: 'none' }} to={`/books/${book.bookID}`}><BookTitle>{book.title}</BookTitle> </Link>
        <span>by <AuthorButton onClick={() => setKeyword(`&keyword=${author.toLowerCase()}`)}>{author}</AuthorButton></span>
        <RatingsInfoWrapper>
          <StarsContainer>
            <StarsFilling width={(book.average_rating / 5) * 100}>
              <Stars src={require('../stars.png')} />
            </StarsFilling>
          </StarsContainer>
          <p>{book.average_rating} avg rating from {book.ratings_count} ratings  {localStorage.getItem(`${book.bookID}`) &&
            <span style={{ color: 'red', fontWeight: 'bold' }}>(Read)</span>}</p>
          {showTextField && <form onSubmit={(e) => addImage(e)}>
            <input type="url" placeholder="Add image url" onChange={(e) => setImgUrl(e.target.value)}></input>
            <button type="submit">Upload</button>
          </form>}
        </RatingsInfoWrapper>

      </InfoWrapper>
    </CardContainer>
  )
}