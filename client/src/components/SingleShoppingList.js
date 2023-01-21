import React from 'react'
import {Card} from 'react-bootstrap'

const SingleShoppingList=({title, description})=>{
    return(
    //     <div className='singleShoppingListClass' >
    //         <p className='dateClass'>2023-01-01</p>
    //         <h3>{title}</h3>
    //         <br/>
    //         <p>{description}</p>
    //     </div>
        <Card className={'singleShoppingListClass'}>
            <Card.Body>
                <p className='dateClass'>2023-01-01</p>
                <Card.Title>{title}</Card.Title>
                <p>{description}</p>
            </Card.Body>
        </Card>
    )
}

export default SingleShoppingList