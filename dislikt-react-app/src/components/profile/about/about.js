import { Container } from "./styles";

const About = ({ bio }) => {

    return (

        <Container>
            <h1>About</h1>
            <p>{bio}</p>
        </Container>
    );
}



export default About;