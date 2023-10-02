import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import config from "../config.json";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/user";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:10rem;
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

const Login = ()=>{
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [userData,setUserData] = useRecoilState(UserAtom);

    const handleLogin = async ()=>{
        const url = config.SERVER_URL + "/user/login";
        try{
            const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({email:username,password}),
            }
            const response = await fetch(url,options);
            const data = await response.json();
            if(!data.error){
                setUserData(data.user);
                localStorage.setItem('jwt',data.jwt);
                navigate("/");
            }else{
                setError(data.error);
            }
        }catch(e){
            setError(e);
        }
    }

    return(
        <Container>
            <Title>Login</Title>
            <Form>
                <TextField 
                    placeholder="Email" 
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value);}}
                />
                <TextField 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value);}}
                />
                {
                    error && <Error>{error}</Error>
                }
                
                <ViewBtn onClick={handleLogin}>Login</ViewBtn>

                <Info>Do not have an Account?
                    <Link to="/register"><Error>&nbsp;Create Account &nbsp; </Error></Link>
                here!</Info>
            </Form>
        </Container>
    );
}

export default Login;