import React, {useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form'

const SignUpPage = () => {
    const {register, watch, handleSubmit, reset, formState: {errors}} = useForm()
    const [show, setShow] = useState(false)
    const [serverResponse, setServerResponse] = useState('')
    const submitForm = (data) => {

        if (data.password === data.confirmPassword) {

            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            fetch('auth/signup', requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    console.log(data.message)
                    setShow(true)
                })
                .then(err => console.log(err))
            reset()
        } else {
            alert("Passwords do not match")
        }
    }

    console.log(watch("username"))
    console.log(watch("email"))
    console.log(watch("password"))
    console.log(watch("confirmPassword"))

    return (
        <div className="containerClass">
            <div className="formClass">

                {show ?
                    <>
                        <h1>Sign up Page</h1>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                    </> :
                    <h1>Sign up Page</h1>
                }
                <br/>
                <form>
                    <Form.Group>
                        <Form.Label>Enter username</Form.Label>
                        <Form.Control type="text" placeholder="Username" {...register("username", {
                            required: true,
                            maxLength: 25
                        })}/>
                    </Form.Group>
                    {errors.username && <p style={{color: "red"}}><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" &&
                        <p style={{color: "red"}}><small>Maximum characters should be 25</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Enter email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                                      {...register("email", {required: true, maxLength: 80})}/>
                    </Form.Group>
                    {errors.email && <p style={{color: "red"}}><small>Email is required</small></p>}
                    {errors.email?.type === "maxLength" &&
                        <p style={{color: "red"}}><small>Maximum characters should be 80</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      {...register("password", {required: true, minLength: 4})}/>
                    </Form.Group>
                    {errors.password && <p style={{color: "red"}}><small>Password is required</small></p>}
                    {errors.password?.type === "minLength" &&
                        <p style={{color: "red"}}><small>Minimum characters should be 4</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      {...register("confirmPassword", {required: true, minLength: 4})}/>
                    </Form.Group>
                    {errors.confirmPassword &&
                        <p style={{color: "red"}}><small>Password confirmation is required</small></p>}
                    {errors.confirmPassword?.type === "minLength" &&
                        <p style={{color: "red"}}><small>Minimum characters should be 4</small></p>}
                    <br/>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}> Register </Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>Already have an account? <Link to='/login'>Log in</Link></small>
                    </Form.Group>
                </form>
            </div>

        </div>
    )
}

export default SignUpPage