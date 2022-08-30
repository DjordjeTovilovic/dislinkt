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
    top: 200px;
    margin: 0 auto;
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

export const Main = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 200px;
    justify-content: space-evenly;
    
    ul {
        list-style: none;
        display: flex;
        min-height: 200px;
        width: 100%;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;

        li {
            display: flex;
            justify-content: space-evenly;
            gap: 20px;
            flex-direction: row;
                button {
                    background-color: red;
                    cursor: pointer;
                    border-radius: 20px;
                    color: white;
                }
        }
    }
`;

export const Button = styled.div`
    display: flex;
    
    button {
        margin: auto;
        margin-bottom: 30px;
        width: 100px;
        height: 40px;
        border-radius: 20px;
    }        
`;
