import Loader from "react-spinners/HashLoader";

const ModalLoading = ({ color }) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "10px",
        width: "-webkit-fill-available",
      }}
    >
      <Loader size={50} color={color || "#4A90E2"} css={{ margin: "auto" }} />
    </div>
  );
};

export default ModalLoading;
