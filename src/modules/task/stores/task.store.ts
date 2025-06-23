import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TaskStatus } from "../enums";
import { Task } from "../types/task.type";
import { CreateTaskFormData, UpdateTaskFormData } from "../schemas";

type TaskState = {
  isOpenTaskDialog: boolean;
  setIsOpenTaskDialog: (isOpen: boolean, status?: TaskStatus) => void;
  defaultTaskStatus: TaskStatus;
  dialogMode: "create" | "edit";
  setDialogMode: (mode: "create" | "edit") => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;

  openCreateTaskDialog: (status?: TaskStatus) => void;
  openEditTaskDialog: (task: Task) => void;

  getInitialValues: (
    task?: Task | null
  ) => CreateTaskFormData | UpdateTaskFormData;
};

const useTaskStore = create<TaskState>()(
  devtools(
    immer((set) => ({
      isOpenTaskDialog: false,
      defaultTaskStatus: TaskStatus.TODO,
      dialogMode: "create",
      setDialogMode: (mode) => set({ dialogMode: mode }),
      selectedTask: null,
      setSelectedTask: (task) =>
        set({ selectedTask: task, isOpenTaskDialog: true }),
      openCreateTaskDialog: (status) =>
        set({
          dialogMode: "create",
          defaultTaskStatus: status || TaskStatus.TODO,
          isOpenTaskDialog: true,
          selectedTask: null,
        }),
      openEditTaskDialog: (task) =>
        set({ dialogMode: "edit", selectedTask: task, isOpenTaskDialog: true }),

      setIsOpenTaskDialog: (isOpen, status) =>
        set((state) => {
          state.isOpenTaskDialog = isOpen;
          state.defaultTaskStatus = status || TaskStatus.TODO;
        }),
      getInitialValues: (task) => {
        return {
          title: task?.title || "",
          description: task?.description || "",
          dueDate: task?.dueDate || undefined,
          status: task?.status || TaskStatus.TODO,
          priority: task?.priority || 1,
        };
      },
    })),
    { name: "TaskStore" }
  )
);

export { useTaskStore };
export const taskStore = useTaskStore;
