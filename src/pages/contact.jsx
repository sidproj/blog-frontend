import styled from "styled-components";
import backIcon from "../assets/Arrow 1.svg";
import instagramIcon from "../assets/instagram.svg";
import githubIcon from "../assets/github.svg";
import linkedin from "../assets/LinkedIn.svg";
import { useNavigate } from "react-router";

const ControlBar = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`
const Accent1 = styled.div`
    color:#91b602;
    font-size:1.25rem;
    font-weight:600;
`

const Title = styled.div`
    font-size:1.4rem;
    font-weight:500;
`

const Description = styled.div`
    font-size:1rem;
    font-weight:400;
    margin-top:-1rem;
`

const GreenSpan = styled.span`
    color:#91b602;
`

const IconRow = styled.div`
    display:flex;
    flex-direction:row;
    align-items:baseline;
    justify-content:flex-start;
    column-gap:2rem;
`

const Contact = ()=>{
    const navigate = useNavigate();
    return(
        <>
            <ControlBar>
                <img src={backIcon} onClick={()=>navigate(-1)}/>
                <Accent1>Contact Us</Accent1>
            </ControlBar>
            <Title>Contact Nerd’s Notebook</Title>
            <Description>
                We love hearing from our readers and fellow enthusiasts. 
                If you have questions, suggestions, or just want to connect, 
                here are several ways to reach out to us: 
                <GreenSpan> morisidhraj001@gmail.com</GreenSpan>
            </Description>

            
            <Title>Social Links</Title>
            <IconRow>
                <img src={githubIcon}/>
                <img src={linkedin}/>
                <img src={instagramIcon}/>
            </IconRow>
        </>
    );
}

export default Contact;