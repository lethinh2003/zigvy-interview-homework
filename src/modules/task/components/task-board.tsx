"use client";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { BoardColumn } from "./board-column";
import { TaskCard } from "./task-card";
import { Task } from "../types/task.type";
import { TaskStatus } from "../enums";
import { useGetTasksQuery } from "../hooks/queries";
import { useSearchParams } from "@/shared/hooks";
import { useUpdateTaskMutation } from "../hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { GetTasksResponse } from "../types/response.type";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";

interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  color: string;
}

const initialData: Column[] = [
  {
    id: TaskStatus.TODO,
    title: "Pending",
    color: "todo",
    tasks: [],
  },
  {
    id: TaskStatus.IN_PROGRESS,
    title: "In Progress",
    color: "progress",
    tasks: [],
  },

  {
    id: TaskStatus.DONE,
    title: "Launched",
    color: "done",
    tasks: [],
  },
];

const getValues = (tasks: Task[]) => {
  const columns = initialData.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.id),
  }));
  return columns;
};

const TaskBoard = () => {
  const { getParam } = useSearchParams();
  const queryClient = useQueryClient();
  const tasksQueryKey = [
    "tasks",
    {
      title: getParam("title"),
      dueDate: getParam("date"),
    },
  ];
  const { data: tasksQuery, isLoading: isLoadingTasks } = useGetTasksQuery({
    title: getParam("title"),
    dueDate: getParam("date"),
  });
  const tasks = useMemo(
    () => tasksQuery?.data?.result || [],
    [tasksQuery?.data.result]
  );

  const [columns, setColumns] = useState<Column[]>(() => getValues(tasks));
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const updateTaskMutation = useUpdateTaskMutation();

  useEffect(() => {
    setColumns(getValues(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = findTaskById(active.id as string);
    setActiveTask(task);
  };

  const invalidateTasksQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = findColumnByTaskId(overId) || findColumnById(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns((columns) => {
      const activeItems = activeColumn.tasks;
      const overItems = overColumn.tasks;

      const activeIndex = activeItems.findIndex(
        (item) => item._id === activeId
      );
      const overIndex = overItems.findIndex((item) => item._id === overId);

      let newIndex: number;
      if (overId in overItems) {
        newIndex = overIndex;
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return columns.map((column) => {
        if (column.id === activeColumn.id) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task._id !== activeId),
          };
        } else if (column.id === overColumn.id) {
          return {
            ...column,
            tasks: [
              ...column.tasks.slice(0, newIndex),
              activeColumn.tasks[activeIndex],
              ...column.tasks.slice(newIndex),
            ],
          };
        } else {
          return column;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnByTaskId(activeId);
    const overColumn = findColumnByTaskId(overId);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      setActiveTask(null);
      return;
    }

    const activeIndex = activeColumn.tasks.findIndex(
      (task) => task._id === activeId
    );
    const overIndex = overColumn.tasks.findIndex((task) => task._id === overId);

    // Update new priority and status
    if (activeTask) {
      const newPriority = overIndex + 1;
      const updatedTask = {
        ...activeTask,
        status: overColumn.id,
        priority: newPriority,
      };

      updateTaskMutation.mutate(
        {
          id: activeTask._id,
          body: {
            title: updatedTask.title,
            status: overColumn.id,
            priority: newPriority,
            description: updatedTask.description,
            dueDate: updatedTask.dueDate,
          },
        },
        {
          onSettled: () => {
            invalidateTasksQuery();
          },
        }
      );

      // Update cache
      const previousTasks = queryClient.getQueryData(tasksQueryKey);
      if (previousTasks) {
        queryClient.setQueryData(
          tasksQueryKey,
          (oldData: AxiosResponse<GetTasksResponse>) => {
            return {
              ...oldData,
              data: {
                ...oldData.data,
                result: oldData.data.result.map((task) => {
                  if (task._id === activeTask._id) {
                    return updatedTask;
                  }
                  return task;
                }),
              },
            };
          }
        );
      }
    }

    if (activeIndex !== overIndex) {
      setColumns((columns) =>
        columns.map((column) =>
          column.id === activeColumn.id
            ? {
                ...column,
                tasks: arrayMove(column.tasks, activeIndex, overIndex),
              }
            : column
        )
      );
    }

    setActiveTask(null);
  };

  const findTaskById = (id: string): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task._id === id);
      if (task) return task;
    }
    return null;
  };

  const findColumnByTaskId = (taskId: string): Column | null => {
    return (
      columns.find((column) =>
        column.tasks.some((task) => task._id === taskId)
      ) || null
    );
  };

  const findColumnById = (id: string): Column | null => {
    return columns.find((column) => column.id === id) || null;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {isLoadingTasks ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6">
            <SortableContext
              items={columns.map((col) => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((column) => (
                <BoardColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  color={column.color}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};

export { TaskBoard };
