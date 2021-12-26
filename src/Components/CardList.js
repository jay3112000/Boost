import React from 'react'
import ResumeReviewCard from './Cards'
import './cardlist.css'
import { Link } from 'react-router-dom';

function CardList(props) {
    return (
        <div className='grid-container'>
            {
                props.list.map((curr,index)=>{
                    return(
                       
                         <ResumeReviewCard key={index} data={curr}/>
                        
                    )
                     
                })
            }
            
        </div>
    )
}

export default CardList
