import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../lib/Button'

const Container = styled.div`
  display: flex;
  width: 100%; 
  padding: 30px;
  background-color: #f4f1ea;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
`
const Title = styled.p`
  font-size: 30px;
  margin: 0;
  font-family: 'Playfair Display', serif;
`

const Form = styled.form`
  display: flex;
  font-size: 20px;
  width: 60%;
  background-color: white;
  overflow: hidden;
`
const SearchBar = styled.input`
  width: 100%;
  border: none;
  font-size: 20px;
  line-height: 24px;
  padding: 5px; 
`

const Readcount = styled.p`
  font-size: 22px;
  font-family: 'Cormorant Garamond', serif;
`



export const Header = ({ setKeyword, setBooks, setPage, location, setLocation }) => {
  const history = useHistory()
  const [search, setSearch] = useState()

  const reset = () => {
    history.push('/')
    setPage(1)
    fetch(`https://bardolphs-books.herokuapp.com/books?order=default&page=1`)
      .then((res) => res.json())
      .then((json) => {
        setBooks(json)
        setLocation('/')
        setKeyword('')

      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setKeyword(`&keyword=${search}`)
    setSearch('')

  }
  return (
    <Container>
      <Button onClick={() => reset()}><Title>BARDOLPH'S <br></br> BOOK NOOK</Title></Button>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <SearchBar disabled={location !== "/"} type="text"
          placeholder="Search for an author" onChange={(e) => setSearch(e.target.value)} value={search} />
        <Button disabled={location !== "/"} type="submit"><FontAwesomeIcon icon={faSearch} /></Button>
      </Form>
      <div>
        <Readcount>
          {localStorage.getItem('readCount')} books read
        </Readcount>
      </div>
    </Container>
  )
}