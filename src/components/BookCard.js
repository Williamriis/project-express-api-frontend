import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%; 
`
const Image = styled.img`
  width: 70px;
  heigth: 200px;
`

export const BookCard = ({ ...book }) => {
    const author = book.authors.split('-')[0].replace(' ', '_')
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
    }
    return (
        <CardContainer>
            {!book.image_url && <Image src="" />}
            {book.image_url && <Image src={book.image_url} />}
            <p>{book.title}</p>
            <Link to={`/authors/${author}`}>{author}</Link>
            <p>{book.average_rating} avg rating from {book.ratings_count} ratings</p>
            <form onSubmit={(e) => addImage(e)}>
                <input placeholder="add image url" onChange={(e) => setImgUrl(e.target.value)}></input>
                <button type="submit">Click</button>
            </form>


        </CardContainer>
    )
}