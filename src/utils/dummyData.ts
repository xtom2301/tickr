import { Checklist } from "../types/checklist";
import { v4 as uuidv4 } from "uuid";

export const dummyChecklists: Checklist[] = [
  {
    id: `checklist-${uuidv4()}`,
    title: "Checklist 1",
    items: [
      { id: "1", text: "Item 1", completed: false },
      { id: "2", text: "Item 2", completed: false },
      { id: "3", text: "Item 3", completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: `checklist-${uuidv4()}`,
    title: "Checklist 2",
    items: [
      { id: "1", text: "Item 1", completed: false },
      { id: "2", text: "Item 2", completed: false },
      { id: "3", text: "Item 3", completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: `checklist-${uuidv4()}`,
    title: "Checklist 3",
    items: [
      { id: "1", text: "Item 1", completed: false },
      { id: "2", text: "Item 2", completed: false },
      { id: "3", text: "Item 3", completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: `checklist-${uuidv4()}`,
    title: "Checklist 4",
    items: [
      { id: "1", text: "Item 1", completed: false },
      { id: "2", text: "Item 2", completed: false },
      { id: "3", text: "Item 3", completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: `checklist-${uuidv4()}`,
    title: "Checklist 5",
    items: [
      { id: "1", text: "Item 1", completed: false },
      { id: "2", text: "Item 2", completed: false },
      { id: "3", text: "Item 3", completed: false },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
