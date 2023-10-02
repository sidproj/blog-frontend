import styled from "styled-components";

const Title = styled.div`
    font-size:1rem;
    font-weight:500;
`

const Description = styled.span`
    /* font-size:1rem; */
    font-weight:400;
    /* padding-left:1rem; */
    color:#bdbdbd;
    word-break:break-all;
    /* margin-top:-1rem; */
`

const Comment = (props)=>{
    return(
        
        <Title>{props.name}: &nbsp;
            <Description>
                {props.text}
            </Description>
        </Title>
        
    )
}

export default Comment;