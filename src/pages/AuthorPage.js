import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { BookCard } from '../components/BookCard'


export const AuthorPage = () => {
    const params = useParams()
    const history = useHistory()
    const [booksList, setBooksList] = useState()

    useEffect(() => {
        fetch(`https://bardolphs-books.herokuapp.com/authors/${params.author}`)
            .then((res) => res.json())
            .then((json) => {
                setBooksList(json)
                console.log(params)
            })
    }, [])

    return (
        <div className="App">
            <button onClick={() => history.push('/')}>Back</button>
            {booksList && booksList.map((book) => {
                return <BookCard {...book} />
            })}

        </div>

    )

}