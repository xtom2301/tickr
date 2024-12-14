import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Checklist } from "../types/checklist";
import { v4 as uuidv4 } from "uuid";
const Dashboard = () => {
  const [checklists, setChecklists] = useState<Checklist[]>(() => {
    try {
      const savedChecklists = localStorage.getItem("checklists");
      if (!savedChecklists) return [];

      const parsedChecklists = JSON.parse(savedChecklists);
      if (!Array.isArray(parsedChecklists)) {
        localStorage.removeItem("checklists");
        return [];
      }

      return parsedChecklists;
    } catch (error) {
      console.error("Error parsing checklists from localStorage:", error);
      localStorage.removeItem("checklists");
      return [];
    }
  });
  const [newChecklistName, setNewChecklistName] = useState<string>("");

  const handleDeleteChecklist = (checklist: Checklist) => {
    if (confirm(`Are you sure you want to delete ${checklist.title}?`)) {
      const updatedChecklists = checklists.filter((c) => c.id !== checklist.id);
      setChecklists(updatedChecklists);
      localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
    }
  };

  const handleAddChecklist = () => {
    if (newChecklistName.trim() === "" || newChecklistName.trim().length <= 3)
      return;
    const newChecklist: Checklist = {
      id: uuidv4(),
      title: newChecklistName,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedChecklists = [...checklists, newChecklist];
    setChecklists(updatedChecklists);
    localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
    setNewChecklistName("");
  };

  return (
    <div>
      <div className="text-3xl font-bold text-white text-center px-4">
        Create New Checklists or View Existing Ones
      </div>
      <div className="flex flex-row items-center justify-center mt-10 px-4">
        <input
          type="text"
          placeholder="Add a checklist"
          className="w-full max-w-md p-4 rounded-l-lg bg-gray-900 text-white"
          value={newChecklistName}
          onChange={(e) => setNewChecklistName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddChecklist();
            }
          }}
        />
        <button
          className="bg-blue-500 text-white p-4 rounded-r-lg"
          onClick={handleAddChecklist}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-4">
        {checklists.map((checklist) => (
          <Link
            to={`/checklist/${checklist.id}`}
            key={checklist.id}
            className="flex flex-row items-center justify-between bg-gray-900 p-4 rounded-md hover:scale-105 transition-all duration-300"
          >
            <div className="text-white rounded-md" key={checklist.id}>
              {checklist.title.length > 20
                ? checklist.title.slice(0, 20) + "..."
                : checklist.title}
            </div>
            <Trash2
              className="text-red-500 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteChecklist(checklist);
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
