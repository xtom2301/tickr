import { ChecklistItem, Checklist as ChecklistType } from "../types/checklist";
import { ArrowBigLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { Footer } from ".";

interface ChecklistProps {
  id: string;
}

const Checklist = ({ id }: ChecklistProps) => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<ChecklistType | undefined>(() => {
    const checklists = JSON.parse(localStorage.getItem("checklists") || "[]");
    return checklists.find((checklist: ChecklistType) => checklist.id === id);
  });
  const [newItem, setNewItem] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!checklist) return;

    const checklists = JSON.parse(localStorage.getItem("checklists") || "[]");
    const updatedChecklists = checklists.map((c: ChecklistType) =>
      c.id === id ? checklist : c
    );
    localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
  }, [checklist, id]);

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
    if (!checklist) return;

    const updatedItems = checklist.items.map((i) =>
      i.id === item.id ? { ...i, completed: !i.completed } : i
    );
    const updatedChecklist = { ...checklist, items: updatedItems };

    const checklists = JSON.parse(localStorage.getItem("checklists") || "[]");
    const updatedChecklists = checklists.map((c: ChecklistType) =>
      c.id === id ? updatedChecklist : c
    );

    localStorage.setItem("checklists", JSON.stringify(updatedChecklists));

    setChecklist(updatedChecklist);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setChecklist((prev) => {
        if (!prev) return prev;
        const oldIndex = prev.items.findIndex((item) => item.id === active.id);
        const newIndex = prev.items.findIndex((item) => item.id === over?.id);

        return {
          ...prev,
          items: arrayMove(prev.items, oldIndex, newIndex),
        };
      });
    }
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={checklist.items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {checklist.items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
              onToggle={handleToggleItem}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Footer />
    </div>
  );
};

export default Checklist;
