import { Container } from './styles'
import UpdateModal from './updateProfileDetailsModal/updateModal';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userService from '../../../services/user'

const UserDetails = ({ user, isMy }) => {
  const [isPrivate, setIsPrivate] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      setIsPrivate(user.privateProfile)
  }, [])

  const changePrivacy = () => {
    userService.updateUser({ id: user.id, privateProfile: !isPrivate })
      .then(() => setIsPrivate(!isPrivate))
      .catch((err) => console.log(err))
  }

  const handleMessage = () => {
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
              {!isMy && <button onClick={handleMessage}>
                Message
              </button>}
            </div>
            {isMy
              ? <button onClick={changePrivacy}>{isPrivate ? "Private" : "Public"}</button>
              : <button>{isPrivate ? "Private" : "Public"}</button>
            }

          </div>
        </div>
      </Container>
    </>
  );
}

export default UserDetails;
