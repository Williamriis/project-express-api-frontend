import React, { useState, useEffect } from 'react'
import { BookCard } from '../components/BookCard'

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
        <div className="App">
            <header className="App-header">

                <select onChange={(e) => changeOrder(e.target.value)}>
                    <option value="default">Sort by</option>
                    <option value='highest'>Highest rated</option>
                    <option value='lowest'>Lowest rated</option>
                    <option value='longest'>Longest</option>
                    <option value='shortest'>Shortest</option>
                </select>

                {books && books.map((book) => {
                    return <BookCard {...book} />
                })}

                {page > 1 && <button onClick={() => setPage(page - 1)}>Back</button>}
                <button onClick={() => setPage(page + 1)}>Next Page</button>
                <form onSubmit={(e) => getAuthors(e)}>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}></input>
                </form>
            </header>
        </div>
    );
}
