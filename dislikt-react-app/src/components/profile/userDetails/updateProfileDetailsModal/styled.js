import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0,0,0,0.8);
    animation: ${(props) => (props.showModal==='open' ? 'fadeOut 0.3s ease' : 'fadeIn 0.3s ease' )};
`;

export const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white ;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    top: 50px;
    justify-content: space-evenly;

    .submit {
        width: 100px;
        height: 40px;
        margin: auto;
        margin-bottom: 50px ;
    }
`;

export const Header = styled.div`
   display: block;
    padding: 16px 20px;
    border-bottom: 1px solid lightgray;
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        cursor: pointer;
        
        svg, img {
            pointer-events: none;
        }
    }
`;

export const UpdateForm = styled.div`
    display: flex;
    flex-direction: row;
    height: 400px;
    width: 100%;
    padding-left: 10px;
    margin-top: 30px;

    .labels {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        height: 90%;
        justify-content: space-evenly;
    }

    .inputs {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: left;
        height: 90%;
        justify-content: space-evenly;
        
        input {
            width: 60%;
            display: block;
            padding: 0.75rem;
            border-radius: 0.25rem;
            border-width: 1px;
        }
        select {
            width: 70%;
            display: block;
            padding: 0.75rem;
            border-radius: 0.25rem;
            border-width: 1px;    
        }
    }

`;
