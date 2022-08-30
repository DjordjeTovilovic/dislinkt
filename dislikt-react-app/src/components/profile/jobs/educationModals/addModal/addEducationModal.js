import { Container, Content, Header, Add } from "./styled";

const AddEducationModal = (props) => {
    
    const reset = (e) => {
        props.addEducationHandler(e);
    }

    return(
        <> { props.showAddEducationModal === true &&
            <Container>
                <Content>
                    <Header>
                    <h2>Add education</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src="/images/close-icon.svg"></img>
                        </button>
                    </Header>
                    <Add>
                        <div className="labels">
                            <label>Institution: </label>
                            <label> Description: </label>
                            <label>Starting date: </label>
                            <label>Ending date: </label>
                        </div>
                        <div className="inputs">
                            <input></input>
                            <textarea></textarea>
                            <input></input>
                            <input></input>
                        </div>
                    </Add>
                    <button className="submit">Submit</button>
                </Content>
            </Container>
            }
        </>
    )
}

export default AddEducationModal;