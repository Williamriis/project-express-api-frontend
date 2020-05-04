import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%; 
  padding: 30px;
  background-color: #f4f1ea;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
`
const Title = styled.p`
  color: burgundy;
  font-size: 30px;
  margin: 0;
`


export const Header = ({ changeOrder, page, setPage, getAuthors, setAuthor, author }) => {

    return (
        <Container>
            <Title>BARDOLPH'S <br></br> BOOK NOOK</Title>
            <select onChange={(e) => changeOrder(e.target.value)}>
                <option value="default">Sort by</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
                <option value="longest">Longest</option>
                <option value="shortest">Shortest</option>
            </select>

            <form onSubmit={(e) => getAuthors(e)}>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </form>
            <div>
                {page > 1 && <button onClick={() => setPage(page - 1)}>Back</button>}
                <button onClick={() => setPage(page + 1)}>Next Page</button>
            </div>
        </Container>
    )
}