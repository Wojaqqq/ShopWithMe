import React, {useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const CreateShoppingListPage = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [show, setShow] = useState(false)
    const [serverResponse, setServerResponse] = useState('')
    const createShoppingList = (data) => {
        console.log(data)

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        console.log(token)

        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }
        fetch('/shopping_list/shopping_lists', requestOptions)
            .then(res => res.json())
            .then(data =>{
                setServerResponse(data.message)
                setShow(true)
            })
            .catch(err => console.log(err))
        reset()
    }


    return (
        <div className="containerClass">

            {show ?
                <>
                    <h1>Create Shopping List</h1>
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        <p>
                            {serverResponse}
                        </p>
                    </Alert>
                </> :
                <h1>Create Shopping List</h1>
            }
            <br/>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                                  {...register('title', {required: true, maxLength: 30})}
                    />
                </Form.Group>
                {errors.title && <p style={{color: 'red'}}><small>Title is required</small></p>}
                {errors.title?.type === "maxLength" &&
                    <p style={{color: 'red'}}><small>Title should be less 30 characters</small></p>}
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    < Form.Control as="textarea" rows={5}
                                   {...register('description', {required: true, maxLength: 300})}
                    />
                </Form.Group>
                {errors.description && <p style={{color: 'red'}}><small>Description is required</small></p>}
                {errors.description?.type === "maxLength" &&
                    <p style={{color: 'red'}}><small>Description should be less 300 than characters</small></p>}
                <br/>
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(createShoppingList)}>
                        Add
                    </Button>
                </Form.Group>
            </Form>

        </div>
    )
}

export default CreateShoppingListPage