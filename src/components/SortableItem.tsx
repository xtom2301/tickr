import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChecklistItem } from "../types/checklist";
import { Trash2 } from "lucide-react";

interface Props {
  item: ChecklistItem;
  onDelete: (item: ChecklistItem) => void;
  onToggle: (item: ChecklistItem) => void;
}

export function SortableItem({ item, onDelete, onToggle }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggle(item);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full max-w-md p-4 rounded-md bg-gray-900 text-white mb-4 flex flex-row justify-between items-center"
    >
      <div className="flex flex-row items-center gap-4">
        <input
          className="w-6 h-6 text-green-600"
          type="checkbox"
          checked={item.completed}
          onChange={handleCheckboxChange}
        />
        <h1 className="text-lg cursor-pointer" {...listeners}>
          {item.text}
        </h1>
      </div>
      <Trash2
        className="text-red-500 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item);
        }}
      />
    </div>
  );
}
