import styled from "styled-components";
import closeBtn from "../assets/close btn.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { UserAtom } from "../recoil/user";

const Container = styled.div`
    width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color:#0000003e;
`

const Bar = styled.div`
    align-self:flex-end;
    height:100%;
    width:55%;
    background-color:#91b602;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:1.5rem;
    row-gap:1rem;
`

const Closediv = styled.div`
    align-self:flex-end;
`

const MenuItems = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:2rem;
    align-self:flex-start;
`

const Item = styled.div`
    font-weight:600;
    font-size:1.3rem;
    color:white !important;
`

const Sidebar = (props)=>{

    const [user,setUser] = useRecoilState(UserAtom);

    const handleLogout = ()=>{
        localStorage.removeItem("jwt");
        setUser(null);
    }

    return(
        <Container>
            <Bar>
                <Closediv onClick={()=>props.setSidebar(false)}>
                    <img src={closeBtn}/>
                </Closediv>
                <MenuItems onClick={()=>props.setSidebar(false)}>
                    <Link to="/"><Item>HOME</Item></Link>
                    <Link to="/topics"><Item>TOPICS</Item></Link>
                    <Link to="/about"><Item>ABOUT</Item></Link>
                    <Link to="/contact"><Item>CONTACT</Item></Link>
                    <Link to="/disclaimer"><Item>DISCLAIMER</Item></Link>
                    {
                        !user?
                        <Link to="/login"><Item>LOGIN</Item></Link>:
                        <Item onClick={handleLogout}>LOGUT</Item>
                    }
                    
                </MenuItems>
            </Bar>
        </Container>
    );
}

export default Sidebar;