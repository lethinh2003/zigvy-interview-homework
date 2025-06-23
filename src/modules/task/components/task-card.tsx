"use client";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, GripVertical } from "lucide-react";
import { useTaskStore } from "../stores/task.store";
import { Task } from "../types/task.type";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const openEditTaskDialog = useTaskStore((state) => state.openEditTaskDialog);
  return (
    <Card
      onClick={() => openEditTaskDialog(task)}
      ref={setNodeRef}
      style={style}
      className={`mb-3 cursor-pointer hover:shadow-lg transition-all duration-200  dark:bg-gray-700 border-l-4  ${
        isDragging
          ? "opacity-50 rotate-3 scale-105 shadow-2xl"
          : "hover:scale-[1.02]"
      }`}
      {...attributes}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex-1 pr-2">
            {task.title}
          </h3>
          <div
            {...listeners}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            {task.dueDate && (
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                <Calendar className="w-3 h-3" />
                <span className="font-medium">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { TaskCard };
