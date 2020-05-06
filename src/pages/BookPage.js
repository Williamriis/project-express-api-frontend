import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  margin-top: 150px;
`

const ImageWrapper = styled.div`
  display: flex;
  width: 250px;
  height: 370px;
  margin-right: 50px;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Cormorant Garamond', serif;
  width: 500px;
  justify-content: space-between;
`

const Image = styled.img`
  width: 100%;
`

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: bold;
`

const Author = styled.h2`
  color: black;
  font-size: 24px;
  margin: 3px;
`
const RatingsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #999999;
`
const StarsContainer = styled.div`
 width: 100px;
 height: 50px;
 display: flex;
 position: relative;
 align-items: center;
`
const StarsFilling = styled.div`
  height: 50px;
  background-color: ${props => props.color};
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

const PersonalRatingWrapper = styled.div`
  display: flex;
  font-family: 'Cormorant Garamond', serif;
  align-items: center;
`
export const BookPage = ({ setLocation }) => {
  const params = useParams()
  const [book, setBook] = useState()

  const rateBook = (rating) => {
    localStorage.setItem(`${book.bookID}`, `${rating}`)
    let readCount = (+localStorage.getItem('readCount') > 0) ? +localStorage.getItem(`readCount`) : 0
    localStorage.setItem(`readCount`, parseInt(++readCount))
    fetch(`https://bardolphs-books.herokuapp.com/books/${params.id}`, {
      method: "PUT",
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user_rating: rating })
    })
      .then((res) => res.json())
      .then((json) => setBook(json))
  }


  useEffect(() => {
    fetch(`https://bardolphs-books.herokuapp.com/books/${params.id}`)
      .then((res) => res.json())
      .then((json) => {
        setBook(json)
        setLocation("book")
      })
  }, [])
  return (
    <div>
      {book && book.error && <h1>{book.error}</h1>}

      {book && !book.error &&
        <Container>
          <div>
            <ImageWrapper>
              {book.image_url && <Image src={book.image_url} />}
              {!book.image_url && <Image src={require('../blank-cover.jpg')} />}
            </ImageWrapper>
            {!localStorage.getItem(`${book.bookID}`) && <select onChange={(e) => rateBook(e.target.value)}>
              <option value="">My rating</option>
              <option value={1.00}>⭐️</option>
              <option value={2.00}>⭐️⭐️</option>
              <option value={3.00}>⭐️⭐️⭐️</option>
              <option value={4.00}>⭐️⭐️⭐️⭐️</option>
              <option value={5.00}>⭐️⭐️⭐️⭐️⭐️</option>
            </select>}
          </div>
          <InfoWrapper>
            <div>
              <Title>{book.title}</Title>
              <Author>by <Link style={{ color: 'black' }} to={`/authors/${book.authors.split('-')[0].replace(' ', '_')}`}>{book.authors.split('-')[0]}</Link></Author>
              <p>{book.num_pages} pages</p>
              {localStorage.getItem(`${book.bookID}`) &&
                <PersonalRatingWrapper>
                  <p>My rating: </p>
                  <StarsContainer>
                    <StarsFilling width={(localStorage.getItem(`${book.bookID}`) / 5) * 100} color="gold">
                      <Stars src={require('../stars.png')} />
                    </StarsFilling>
                  </StarsContainer>
                </PersonalRatingWrapper>}
            </div>
            <RatingsInfoWrapper>
              <StarsContainer>
                <StarsFilling width={(book.average_rating / 5) * 100} color="red">
                  <Stars src={require('../stars.png')} />
                </StarsFilling>
              </StarsContainer>
              <p>{book.average_rating} avg rating from {book.ratings_count} ratings</p>
            </RatingsInfoWrapper>
          </InfoWrapper>
        </Container>
      }
    </div>
  )
}