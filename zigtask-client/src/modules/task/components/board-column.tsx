"use client";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MoreHorizontal, Plus } from "lucide-react";
import { TaskStatus } from "../enums";
import { useTaskStore } from "../stores/task.store";
import { Task } from "../types/task.type";
import { TaskCard } from "./task-card";

interface BoardColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
}

const columnStyles = {
  todo: {
    bg: "bg-gray-100 dark:bg-gray-800",
    header: "bg-gray-100 dark:bg-gray-800",
    accent: "text-red-600",
    button: "hover:bg-red-50 text-red-600",
  },
  progress: {
    bg: "bg-gray-100 dark:bg-gray-800",
    header: "bg-gray-100 dark:bg-gray-800",
    accent: "text-yellow-600",
    button: "hover:bg-yellow-50 text-yellow-600",
  },
  done: {
    bg: "bg-gray-100 dark:bg-gray-800",
    header: "bg-gray-100 dark:bg-gray-800",
    accent: "text-green-600",
    button: "hover:bg-green-50 text-green-600",
  },
};

const BoardColumn = ({ id, title, tasks, color }: BoardColumnProps) => {
  const { openCreateTaskDialog } = useTaskStore();

  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const style =
    columnStyles[color as keyof typeof columnStyles] || columnStyles.todo;

  let displayTitle = title;
  if (id === TaskStatus.TODO) {
    displayTitle = "Pending";
  } else if (id === TaskStatus.IN_PROGRESS) {
    displayTitle = "In Progress";
  } else if (id === TaskStatus.DONE) {
    displayTitle = "Completed";
  }

  return (
    <div className="w-80 flex-shrink-0">
      <Card className={`${style.bg} border-0 shadow-md`}>
        <CardHeader className={`${style.header} rounded-t-lg pb-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  id === TaskStatus.TODO
                    ? "bg-gray-400"
                    : id === TaskStatus.IN_PROGRESS
                    ? "bg-yellow-500"
                    : id === TaskStatus.DONE
                    ? "bg-green-500"
                    : "bg-purple-500"
                }`}
              />
              <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                {displayTitle}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                {tasks.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-gray-200 p-1"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent
          ref={setNodeRef}
          className={`pt-4 min-h-[300px] transition-colors duration-200 ${
            isOver ? "bg-white/50" : ""
          }`}
        >
          <SortableContext
            items={tasks.map((task) => task._id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </SortableContext>

          <Button
            variant="ghost"
            className={`w-full justify-start ${style.button} hover:shadow-md transition-all duration-200 font-medium`}
            onClick={() => openCreateTaskDialog(id)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add a task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export { BoardColumn };
