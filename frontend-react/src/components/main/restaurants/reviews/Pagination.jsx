import React, {  useState } from 'react'
import PaginationBootStrap from 'react-bootstrap/Pagination';

const Pagination = ({totalReviews,reviewPerPage,paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalReviews / reviewPerPage); i++)
    pageNumbers.push(i);
    let [active,setActive] = useState(1);
    
    return (
        <PaginationBootStrap style={{placeContent: 'center', marginTop: '2vh'}}>
            <PaginationBootStrap.First onClick={() =>{
                paginate(1)
                setActive(1)
            }} />
            {pageNumbers.map(number => (
            <PaginationBootStrap.Item key={number} active={number === active} 
            onClick={() => {
                    paginate(number)
                    setActive(number)
                }}>
            {number}
            </PaginationBootStrap.Item>
            ))}
            <PaginationBootStrap.Last onClick={() =>{
                paginate(pageNumbers.length)
                setActive(pageNumbers.length)
            }} />
        </PaginationBootStrap>

    
  )
}

export default Pagination