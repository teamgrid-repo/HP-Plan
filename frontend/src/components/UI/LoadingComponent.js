import Loader from "react-spinners/HashLoader";
import ListingComponent from "./ListingComponent";

const LoadingComponent = () => {
  return (
    <ListingComponent>  
      <Loader color="#4A90E2" size={100} css={{ margin: "auto" }} />
    </ListingComponent>
  );
};

export default LoadingComponent;
