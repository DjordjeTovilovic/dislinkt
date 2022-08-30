import { Container, Content, Header, Update} from "./styled";

const UpdateEducationModal = (props) => {

    const reset = (e) => {
        props.updateEducationHandler(e);
    }

    return(
        <> { props.showUpdateEducationModal === true &&
            <Container>
                <Content>
                    <Header>
                    <h2>Update education</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src="/images/close-icon.svg"></img>
                        </button>
                    </Header>
                    <Update>
                        <ul>
                            <li>
                                <h3>Item 1 <button style={{backgroundColor: 'red', color:'white', borderRadius: "20px"}}>Delete</button></h3>
                                <div>
                                    <input></input>
                                    <input className="date" type='date'></input>
                                    <input className="date" type='date'></input>
                                </div>
                                    <textarea></textarea>
                            </li>                            
                        </ul>
                    </Update>
                    <button className="submit">Submit</button>
                </Content>
            </Container>
            }
        </>
    )
}


export default UpdateEducationModal;