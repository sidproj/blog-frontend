import styled from "styled-components";
import img1 from "../assets/image 2.png";
import { Link } from "react-router-dom";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:1rem;
`

const Title = styled.div`
    font-size:1.3rem;
    font-weight:500;
`

const MainImg = styled.div`
    padding:0.6rem;
    background-color:#333;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Img = styled.img`
    width:100%;
    object-fit:contain;
`

const Description = styled.div`
    font-size:1rem;
`

const ViewBtn = styled.div`
    padding:0.5rem 1.5rem;
    color:#313131;
    font-size:1.25rem;
    font-weight:600;
    background-color:#91b602;
    width:fit-content;
    border-radius: 0.25rem;
`

const ThumbnailArticle = (props) => {
    return(
        <Container>
            <Title>{props.name}</Title>
            <MainImg>
                <Img src={props.img}/>
            </MainImg>
            <Description>
                {props.text?.substring(0,150)}...
            </Description>
            <Link to="/article" state={{article_id:props.id}}>
                <ViewBtn>View Atricle</ViewBtn>
            </Link>
        </Container>
    )
}

export default ThumbnailArticle;