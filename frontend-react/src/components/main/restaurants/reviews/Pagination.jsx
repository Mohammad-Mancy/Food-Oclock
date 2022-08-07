import React from 'react'

const Pagination = ({totalReviews,reviewPerPage,paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalReviews / reviewPerPage); i++)
    pageNumbers.push(i);
    
    return (
        <nav>
            <ul>
                {pageNumbers.map(number => (
                <li key={number}>
                    <div onClick={() => {
                        paginate(number)
                    }}>
                        {number}
                    </div>
                </li>
                ))}
            </ul>
        </nav>
    
  )
}

export default Pagination