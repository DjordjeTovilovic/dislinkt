
import { Container, Content, Header, UpdateForm } from "./styled";

const UpdateModal = (props) => {

    const reset = (e) => {
        props.updateHandler(e);
    }

    return (
        <>
        { props.showUpdateModal === 'open' &&
        <Container>
            <Content>
                <Header>
                    <h2>Update information</h2>
                    <button onClick={(event) => reset(event)}>
                        <img src="/images/close-icon.svg"></img>
                    </button>
                </Header>
                <UpdateForm>
                    <div className="labels">
                        <label>Username: </label>
                        <label>Email: </label>
                        <label>Phone number: </label>
                        <label>Birth day: </label>
                        <label>Gender: </label>
                    </div>
                    <div className="inputs">
                        <input placeholder="Username"></input>
                        <input placeholder="Email"></input>
                        <input type='number' placeholder="Phone number"></input>
                        <input type='date' placeholder="Birth day"></input>
                        <select>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </UpdateForm>
                <button className="submit">Submit</button>
            </Content>
            </Container>
            }
        </>
    )
}

export default UpdateModal;