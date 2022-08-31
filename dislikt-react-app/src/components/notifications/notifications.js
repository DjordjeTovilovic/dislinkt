import { useEffect, useState } from "react";
import { NotificationsContainer } from "./styles";
import { getNotificationsForUsers } from "../../services/notifications";


const Notifications = () => {
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const fetchedNotifications = await getNotificationsForUsers()
			setNotifications(fetchedNotifications.notifications)
		}
		fetchData()
	}, [])

  // useEffect(() => {
  //   const sse = new EventSource(`http://localhost:3008/notifications/sse/${user.username}`)

  //   sse.onmessage = e => {
  //       setNotifications((old) => [...old, JSON.parse(e.data)])
  //   }
	// }, [])

  return (
    <NotificationsContainer>
      <ul>
			{notifications.map((notification) => 
			<li key={notification.id}>
				<a>
					{`User ${notification.senderUsername} ${notification.type} your post`}
				</a>
			</li>
			)}
      </ul>
    </NotificationsContainer>
  )
}

export default Notifications;
