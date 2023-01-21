import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap";
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {login} from '../auth'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const navigate=useNavigate()

    const loginUser = (data) => {
        console.log(data)

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('/auth/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data.access_token)
                login(data.access_token)

                navigate('/')
            })

        reset()

    }

    return (
        <div className="containerClass">
            <div className="formClass">
                <h1>Login Page</h1>
                <br/>
                <form>
                    <Form.Group>
                        <Form.Label>Enter username</Form.Label>
                        <Form.Control type="text" placeholder="Username"
                                      {...register('username', {required: true, maxLength: 25})}
                        />
                    </Form.Group>
                    {errors.username && <p style={{color: 'red'}}><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" &&
                        <p style={{color: 'red'}}><small>Username should be at least 25 characters</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      {...register('password', {required: true, minLength: 4})}
                        />
                    </Form.Group>
                    {errors.password && <p style={{color: 'red'}}><small>Password is required</small></p>}
                    {errors.password?.type === "minLength" &&
                        <p style={{color: 'red'}}><small>Password too short</small></p>}
                    <br/>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}> Login </Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>You don't have an account? <Link to='/signup'>Create account</Link></small>
                    </Form.Group>
                </form>
            </div>

        </div>
    )
}

export default LoginPage