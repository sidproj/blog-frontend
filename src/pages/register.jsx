import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:7rem;
    row-gap:2rem;
`

const Title = styled.div`
    font-size:2rem;
    font-weight:700;
    color:#91b602;
`

const Form = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    row-gap:1rem;
`

const TextField = styled.input`
    outline:none;
    border:none;
    padding:0.75rem;
    font-size:1rem;
    font-family: Lato;
    font-weight: 600;
    border-radius:0.30rem;
    background-color:#313131;
    width:15rem;
    color:#bdbdbd;
    &&::placeholder{
        color:#bdbdbd;
    }
`
const ViewBtn = styled.div`
    padding:0.40rem 1.2rem;
    color:#313131;
    font-size:1.25rem;
    font-weight:600;
    background-color:#91b602;
    width:fit-content;
    border-radius: 0.25rem;
`

const Error = styled.div`
    color:#91b602;
`

const Info = styled.div`
    display:flex;
    text-align:center;
`

const Register = ()=>{
    
    const [error,setError] = useState(null);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [conf_password,setConf_Password] = useState("");

    return(
        <Container>
            <Title>Register</Title>
            <Form>
                <TextField 
                    placeholder="Email" 
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value);}}
                    autocomplete="one-time-code"
                />
                <TextField 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value);}}
                    autocomplete="one-time-code"
                />
                <TextField 
                    type="password" 
                    placeholder="Confirm Password"
                    value={conf_password}
                    onChange={(e)=>{setConf_Password(e.target.value);}}
                    autocomplete="one-time-code"
                />
                {
                    error ? <Error>Error!!</Error>:<></>
                }
                
                <ViewBtn>Register</ViewBtn>
                <Info>Already have an Account?
                    <Link to="/login"><Error>&nbsp;Login &nbsp; </Error></Link>
                here!</Info>
            </Form>
        </Container>
    );
}

export default Register;