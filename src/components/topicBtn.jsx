import styled from "styled-components";

const Btn = styled.div`
    padding:0.5rem 1.5rem;
    background-color:#313131;
    color:#fff;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-radius:0.25rem;
`

const TopicBtn = (props)=>{
    return (
        <Btn>{props.topic}</Btn>
    );
}

export default TopicBtn;