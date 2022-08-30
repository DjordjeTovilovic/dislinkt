import { Container, Content, Header, Add } from "./styled";

const AddExperianceModal = (props) => {

    const reset = (e) => {
        props.addExperianceHandler(e);
    }

    return(
        <> 
        { 
            props.showAddExperianceModal === true &&
            <Container>
                <Content>
                    <Header>
                    <h2>Add experiance</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src="/images/close-icon.svg"></img>
                        </button>
                    </Header>
                    <Add>
                        <div className="labels">
                            <label>Institution: </label>
                            <label>Company </label>
                            <label> Description: </label>
                            <label>Starting date: </label>
                            <label>Ending date: </label>
                        </div>
                        <div className="inputs">
                            <input></input>
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

export default AddExperianceModal;