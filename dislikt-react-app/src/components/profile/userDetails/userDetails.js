import { Container } from './styles'
import UpdateModal from './updateProfileDetailsModal/updateModal';
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const UserDetails = ({ user }) => {
  const [showUpdateModal, setShowUpdateModal] = useState('close');
  const [isPrivate, setIsPrivate] = useState(false)
  const navigate = useNavigate();


  const updateHandler = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showUpdateModal) {
      case 'open':
        setShowUpdateModal('close');
        break;
      case 'close':
        setShowUpdateModal('open');
        break;
      default:
        setShowUpdateModal('close');
        break;
    }
  }

  const changePrivacy = () => {
    setIsPrivate(!isPrivate)
  }

  const handleMessage = () => {
    setIsPrivate(!isPrivate)
    navigate(`/messenger/${user.id}`)
  }

  return (
    <>
      <Container>
        <div>
          <h1>{user.username}</h1>
          <p>Email: {user.email}</p>
          <p>Phone number: {user.phoneNumber}</p>
          <p>Birth day: {user.birthday}</p>
          <p>Gender: {user.gender === 0 ? "Male" : user.gender === 1 ? "Female" : "Uncategorized"}</p>

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
              <button onClick={handleMessage}>
                Message
              </button>
            </div>
            <button onClick={changePrivacy}>{isPrivate ? "Private" : "Public"}</button>
          </div>
        </div>
      </Container>
      <UpdateModal showUpdateModal={showUpdateModal} updateHandler={updateHandler} />
    </>
  );
}

export default UserDetails;
