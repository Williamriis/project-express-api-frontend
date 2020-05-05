import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../lib/Button'

export const NavBar = ({ changeOrder, page, order, setPage }) => {

    const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 150px;
    width: 100%;
  `

    return (

        <Container>
            <select onChange={(e) => changeOrder(e.target.value)} value={order}>
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
        </Container>
    )
}