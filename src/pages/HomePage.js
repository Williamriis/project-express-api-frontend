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

export const HomePage = ({ order, changeOrder, page, setPage, setBooks, books, keyword, setKeyword }) => {

    useEffect(() => {
        fetch(`https://bardolphs-books.herokuapp.com/books?order=${order}${keyword}&page=${page}`)
            .then((res) => res.json())
            .then((json) => {
                setBooks(json)
                console.log(json)
            })
    }, [page, order, keyword])

    return (
        <Container>
            <NavBar changeOrder={changeOrder} order={order} page={page} setPage={setPage} />
            {books && books.map((book) => {
                return <BookCard {...book} setKeyword={setKeyword} />
            })}
        </Container>
    );
}
