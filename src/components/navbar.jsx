import styled from "styled-components";
import menuIcon from "../assets/Group 1.svg";

const Container = styled.div`
    width:calc(100% - 2.4rem);
    background-color:#242424;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding:1.2rem;
`

const Logo = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    column-gap:0.5rem;
    font-weight:700;
    font-size:1.7rem;
`

const Accent1 = styled.div`
    color:#91b602;
`

const Navbar = (props)=>{
    return(
        <Container>
            <Logo>
                <Accent1>Nerd's</Accent1>
                <div>Notebook</div>
            </Logo>
            <div onClick={()=>props.setSidebar(true)}>
                <img src={menuIcon}/>
            </div>
        </Container>
    );
}

export default Navbar;