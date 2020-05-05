import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BookCard } from '../components/BookCard'
import { Header } from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../lib/Button'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`
const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 150px;
  width: 80%;
`

export const HomePage = () => {
    const [books, setBooks] = useState()
    const [author, setAuthor] = useState()
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('default')
    useEffect(() => {
        fetch(`https://bardolphs-books.herokuapp.com/books?order=${order}&page=${page}`)
            .then((res) => res.json())
            .then((json) => {
                setBooks(json)
                console.log(json)
            })
    }, [page, order])

    const getAuthors = (e) => {
        e.preventDefault()
        const formatted = author.replace(' ', '_')
        fetch(`https://bardolphs-books.herokuapp.com/authors/${formatted}`)
            .then((res) => res.json())
            .then((json) => {
                setBooks(json)
            })
    }

    const changeOrder = (e) => {
        setPage(1)
        setOrder(e)
    }

    return (
        <Container className="App">
            <Header changeOrder={changeOrder} page={page} setPage={setPage} getAuthors={getAuthors} setAuthor={setAuthor}
                author={author} />
            <NavBar>
                <select onChange={(e) => changeOrder(e.target.value)}>
                    <option value="default">Sort by</option>
                    <option value="highest">Highest rated</option>
                    <option value="lowest">Lowest rated</option>
                    <option value="longest">Longest</option>
                    <option value="shortest">Shortest</option>
                </select>
                <div>
                    {page > 1 && <Button onClick={() => setPage(page - 1)}><FontAwesomeIcon icon={faAngleDoubleLeft} /></Button>}
                    <Button onClick={() => setPage(page + 1)}><FontAwesomeIcon icon={faAngleDoubleRight} /></Button>
                </div>
            </NavBar>
            {books && books.map((book) => {
                return <BookCard {...book} />
            })}

        </Container>
    );
}
