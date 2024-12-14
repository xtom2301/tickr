import { ChecklistItem, Checklist as ChecklistType } from "../types/checklist";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface ChecklistProps {
  id: string;
}

const Checklist = ({ id }: ChecklistProps) => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<ChecklistType | undefined>(
    JSON.parse(localStorage.getItem("checklists") || "[]").find(
      (checklist: ChecklistType) => checklist.id === id
    )
  );
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (!checklist) return;

    const checklists = JSON.parse(localStorage.getItem("checklists") || "[]");

    const updatedChecklists = checklists.map((c: ChecklistType) =>
      c.id === checklist.id ? checklist : c
    );

    localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
  }, [checklist]);

  if (!checklist) {
    return <div>Checklist not found</div>;
  }

  const handleDeleteItem = (item: ChecklistItem) => {
    if (confirm(`You sure you want to delete ${item.text}?`)) {
      const updatedChecklist = checklist.items.filter((i) => i.id !== item.id);
      setChecklist({ ...checklist, items: updatedChecklist });
    }
  };

  const handleAddItem = () => {
    if (newItem.trim() === "" || newItem.trim().length <= 3) return;
    const item: ChecklistItem = {
      id: uuidv4(),
      text: newItem,
      completed: false,
    };
    setChecklist({ ...checklist, items: [...checklist.items, item] });
    setNewItem("");
  };

  const handleToggleItem = (item: ChecklistItem) => {
    const updatedChecklist = checklist.items.map((i) =>
      i.id === item.id ? { ...i, completed: !i.completed } : i
    );
    setChecklist({ ...checklist, items: updatedChecklist });
  };

  return (
    <div className="flex flex-col items-center text-white">
      <div className="flex flex-row justify-between w-full max-w-md items-center px-4">
        <div className="text-4xl font-bold mb-10">
          {checklist.title.length > 12
            ? checklist.title.slice(0, 12) + "..."
            : checklist.title}
        </div>
        <div className="text-4xl font-bold mb-10">
          <ArrowBigLeft
            className="cursor-pointer w-10 h-10"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between w-full max-w-md mb-10 px-4">
        <input
          type="text"
          placeholder="Add an item"
          className="w-full max-w-md p-4 rounded-l-lg bg-gray-900 text-white"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddItem();
            }
          }}
        />
        <button
          className="bg-blue-500 text-white p-4 rounded-r-lg"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>

      {checklist.items.map((item) => (
        <div
          className="w-full max-w-md p-4 rounded-md bg-gray-900 text-white mb-4 flex flex-row justify-between items-center"
          key={item.id}
        >
          <div className="flex flex-row items-center gap-4">
            <input
              className="w-6 h-6 text-green-600"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleItem(item)}
            />
            <h1 className={"text-lg cursor-pointer"}>{item.text}</h1>
          </div>
          <Trash2
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteItem(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default Checklist;
