import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { BookCard } from '../components/BookCard'

const Container = styled.div`
margin-top: 150px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

export const AuthorPage = ({ setLocation }) => {
    const params = useParams()
    const [booksList, setBooksList] = useState()
    useEffect(() => {
        fetch(`https://bardolphs-books.herokuapp.com/authors/${params.author}`)
            .then((res) => res.json())
            .then((json) => {
                setBooksList(json)
                setLocation('author')
            })
    }, [])

    return (
        <Container>
            {booksList && booksList.map((book) => {
                return <BookCard {...book} />
            })}

        </Container>

    )

}