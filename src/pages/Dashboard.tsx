import { Link } from "react-router-dom";
import { dummyChecklists } from "../utils/dummyData";

const Dashboard = () => {
  return (
    <div>
      <div className="text-2xl font-bold text-white text-center">
        Create New Checklists or View Existing Ones
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-4">
        {dummyChecklists.map((checklist) => (
          <Link
            to={`/checklist/${checklist.title}`}
            className="bg-white text-black p-4 rounded-md"
            key={checklist.id}
          >
            {checklist.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
