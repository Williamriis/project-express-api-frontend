import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    margin-top: 150px;
    align-items: flex-start;
    justify-content: space-between;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 0;
`

const TextInput = styled.input`
  margin-bottom: 5px;
  padding: 10px;
  font-size: 20px;
  width: 90%;
`

const SubmitButton = styled.button`
  border: none;
  background-color: black;
  color: white;
  font-size: 15px;
  font-family: 'Cormorant Garamond';
  font-weight: bold;
  padding: 10px;
  width: 30%;
  margin-top: 20px;
  cursor: pointer;
`

const TextWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


export const AddBook = ({ setBooks }) => {
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [pages, setPages] = useState()
    const [image, setImage] = useState()

    const submitBook = (e) => {
        e.preventDefault()
        fetch(`https://bardolphs-books.herokuapp.com/books/addbook`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ title: title, author: author, pages: pages, image: image })
        })
            .then((res) => res.json())
            .then((json) => {
                setBooks(json)
                setTitle('')
                setAuthor('')
                setPages('')
                setImage('')
            })
    }


    return (
        <Container>
            <Form onSubmit={(e) => submitBook(e)}>
                <span><TextInput value={title} type="text" required placeholder="Book title" onChange={(e) => setTitle(e.target.value)}></TextInput> *</span>
                <span><TextInput value={author} type="text" required placeholder="Book author" onChange={(e) => setAuthor(e.target.value)}></TextInput> *</span>
                <TextInput value={pages} type="" placeholder="Number of pages" onChange={(e) => setPages(e.target.value)}></TextInput>
                <TextInput value={image} type="url" placeholder="Add a cover image url" onChange={(e) => setImage(e.target.value)}></TextInput>
                <SubmitButton type="submit">Upload Book</SubmitButton>
            </Form>
            <TextWrapper>
                <p>Upload a book to the database! Try searching for your title to see if it already exists before uploading.</p>
                <p>* indicates required field</p>
            </TextWrapper>
        </Container>

    )
}