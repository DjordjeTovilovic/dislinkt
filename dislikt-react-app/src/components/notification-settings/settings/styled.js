import styled from 'styled-components'

export const Container = styled.div`
        padding: 62px;
    max-width: 100%; 
`;

export const Header = styled.div`
    display: flex;
    align-items: center;

    .MuiSvgIcon-root{
        width: 35px;
        height: 35px;
    }
`;

export const Content = styled.div`
    width: 50%;
    height: 90vh;
    margin: auto;
    border-radius: 23px;
    border: 1px solid lightgray;
    overflow-y: auto;
    background-color: white;

    h1 {
        padding: 20px 16px 20px 16px;
        font-size: xx-large;
    }


    .details {
        display: flex;
        flex-direction: column;
    border: 1px solid lightgray;

    }
`;

export const Setting = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
`;