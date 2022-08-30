
import { Container, Content, Header, Main, Button } from "./styled";

const UpdateInterestModal = (props) => {

    const reset = (e) => {
        props.updateInterestHandler(e);
    }


    return(
    <>
    { props.showUpdateInterestsModal === true && 
        <Container>
            <Content>
                <Header>
                    <h2>Update a interest</h2>
                    <button onClick={(event) => reset(event)}>
                        <img src="/images/close-icon.svg"></img>
                    </button>
                </Header>
                <Main>
                    <ul>
                        <li>
                            <input value='texttt'></input> 
                            <button>Delete</button>
                        </li>
                        <li>
                            <input value='texttt'></input> 
                            <button>Delete</button>
                        </li>
                    </ul>
                </Main>
                <Button>
                    <button>Update</button>
                </Button>
            </Content>
        </Container>  
    }
    </>
    )
}

export default UpdateInterestModal;