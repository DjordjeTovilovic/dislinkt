import RequestCard from "../../Cards/RequestCard/RequestCard";

const RequestList = ({ requests, handleConfirm, handleDelete }) => {
  return (
    <>
      {requests?.map((request) => (
        <RequestCard
          request={request}
          key={request.id}
          handleConfirm={handleConfirm}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};
export default RequestList;
