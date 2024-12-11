import { useParams } from "react-router-dom";
import { Checklist } from "../components";

const ChecklistDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Checklist not found</div>;
  }

  return <Checklist id={id} />;
};

export default ChecklistDetails;
