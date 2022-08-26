import {Container} from './styles'

const UserDetails = (props) => {

    return (
        <Container>
            <div>
                <h1>Kevin Hart</h1>
                <p>Email: email@hart.com</p>
                <p>Phone number: 042421421</p>
                <p>Birth day: 20.03.1999.</p>
                <p>Gender: Male</p>

                <div className="buttons">  
                    <button>
                      Follow
                    </button>
                    <button>
                      Unfollow
                    </button>
                    <button>
                      Update
                    </button>  
                </div>
            </div>      
        </Container>
    );
}

export default UserDetails;
