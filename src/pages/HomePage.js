import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BookCard } from '../components/BookCard'
import { NavBar } from 'components/NavBar'


const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

export const HomePage = ({ order, changeOrder, page, setPage, setBooks, books }) => {

    useEffect(() => {
        fetch(`https://bardolphs-books.herokuapp.com/books?order=${order}&page=${page}`)
            .then((res) => res.json())
            .then((json) => {
                setBooks(json)
                console.log(json)
            })
    }, [page, order])

    return (
        <Container>
            <NavBar changeOrder={changeOrder} order={order} page={page} setPage={setPage} />
            {books && books.map((book) => {
                return <BookCard {...book} />
            })}
        </Container>
    );
}
