import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    row-gap:1rem;
`

const Title = styled.div`
    font-size:1.5rem;
`

const Dash = styled.div`
    width:3rem;
    height:0.2rem;
    background-color:#91b602;
`

const Heading = (props)=>{
    return(
        <Container>
            <Title>{props.title}</Title>
            <Dash></Dash>
        </Container>
    );
}
export default Heading;