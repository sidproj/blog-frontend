import styled from "styled-components";
import backIcon from "../assets/Arrow 1.svg";
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
    font-size:1.5rem;
    font-weight:600;
`

const Description = styled.div`
    font-size:1rem;
    margin-top:-1rem;
`

const GreenSpan = styled.span`
    color:#91b602;
`

const Disclaimer = () => {
    const navigate = useNavigate();
    return(
        <>
            <ControlBar>
                <img src={backIcon} onClick={()=>navigate(-1)}/>
                <Accent1>Disclaimer</Accent1>
            </ControlBar>
            <Title>Copyrighted Content</Title>
            <Description>
                At Nerd’s Notebook, we respect the intellectual property rights of content 
                creators and strive to adhere to all relevant copyright laws. We make every 
                effort to ensure that the content used in our blogs is either original or falls under fair use.
            </Description>

            <Description>
                <GreenSpan>Original Content:</GreenSpan> Our team creates a substantial portion of the content 
                featured on our blog. Any original content, including articles, images, 
                and graphics, is the exclusive property of Nerd’s Notebook.
            </Description>

            <Description>
                <GreenSpan>Fair Use:</GreenSpan> In some cases, we may use copyrighted material under
                the fair use doctrine, for purposes of commentary, criticism, 
                news reporting, or education. We strive to provide proper attribution 
                and context when utilizing such content.
            </Description>

            <Description>
                It is our sincere intention to respect the rights of content creators. 
                If you believe that your copyrighted work has been used on our blog in a 
                way that constitutes copyright infringement, please contact us immediately 
                at <GreenSpan>morisidhraj001@gmail.com</GreenSpan>. We will promptly 
                investigate the matter and, if necessary, take appropriate action, 
                including the removal of the disputed content.
            </Description>
        </>
    )
}

export default Disclaimer;