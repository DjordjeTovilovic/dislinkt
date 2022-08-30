import { useEffect, useState } from "react";
import RequestList from "../components/Lists/RequestList/RequestList";
import adminService from "../service/admin";

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const removeFromList = (id) => {
    setRequests(requests.filter((e) => e.id !== id));
  };
  useEffect(() => {
    adminService
      .getAll()
      .then((gotRequests) => setRequests(gotRequests))
      .catch((e) => console.log(e));
  }, []);

  const handleConfirm = (requestId) => {
    adminService.confirmRequest(requestId);
    removeFromList(requestId);
  };

  const handleDelete = (requestId) => {
    adminService.deleteRequest(requestId);
    removeFromList(requestId);
  };

  if (requests.length > 0)
    return (
      <RequestList
        requests={requests}
        handleConfirm={handleConfirm}
        handleDelete={handleDelete}
      />
    );
  return <h1>No requests</h1>;
};
export default Admin;
