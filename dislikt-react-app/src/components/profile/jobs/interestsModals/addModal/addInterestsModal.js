import { Container, Content, Header, Add } from "./styled"

const AddInterestsModal = (props) => {
    const reset = (e) => {
        props.addInterestHandler(e);
    }

    return(
        <> { props.showAddInterestsModal === true &&

        <Container>
           <Content>
                    <Header>
                    <h2>Add interest</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src="/images/close-icon.svg"></img>
                        </button>
                    </Header>
                    <Add>
                        <label>Interest: </label>
                        <input></input>
                    </Add>
                    <button className="submit">Submit</button>
                </Content>
     
        </Container>}
        </>
    )
}


export default AddInterestsModal