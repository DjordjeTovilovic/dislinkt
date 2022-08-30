import { Container, Content, Header, Main, Button } from "./styled";

const UpdateSkillModal = (props) => {

    const reset = (e) => {
        props.updateSkillHandler(e);
    }

    return(
        <>
        { props.showUpdateSkillModal === true && 
            <Container>
                <Content>
                    <Header>
                        <h2>Update a skill</h2>
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

export default UpdateSkillModal;