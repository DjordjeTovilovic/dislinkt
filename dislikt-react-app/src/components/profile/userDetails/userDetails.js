import {Container} from './styles'
import { useState } from 'react';
import UpdateModal from './updateProfileDetailsModal/updateModal';

const UserDetails = (props) => {

  const [isPrivate, setisPrivate] = useState('private');
  const [showUpdateModal, setShowUpdateModal] = useState('close');

  const updateHandler = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget) {
      return;
    }
    switch(showUpdateModal) {
      case 'open' :
        setShowUpdateModal('close');
        break;
      case 'close' :
        setShowUpdateModal('open');
        break;
      default:
        setShowUpdateModal('close');
        break;
    }
  }

  const changePrivacy = () => {
    switch (isPrivate) {
      case 'private': 
        setisPrivate('public');
        break;
      case 'public':
        setisPrivate('private');
        break;   
      default:
        setisPrivate('private');
        break;
    }
  }

    return (
      <>
        <Container>
            <div>
                <h1>Kevin Hart</h1>
                <p>Email: email@hart.com</p>
                <p>Phone number: 042421421</p>
                <p>Birth day: 20.03.1999.</p>
                <p>Gender: Male</p>

                <div className='row'>  
                    <div className="buttons">
                      <button>
                        Follow
                      </button>
                      <button>
                        Unfollow
                      </button>
                      <button onClick={updateHandler}>
                        Update
                      </button>
                    </div>

                  { isPrivate==='public' && <button onClick={changePrivacy}>Private</button> }
                  { isPrivate==='private' && <button onClick={changePrivacy}>Public</button> }  
                </div>
            </div>      
        </Container>
        <UpdateModal showUpdateModal={showUpdateModal} updateHandler={updateHandler}/>
      </>
    );
}

export default UserDetails;
