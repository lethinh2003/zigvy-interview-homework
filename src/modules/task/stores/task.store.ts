import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TaskState = {
  isOpenTaskDialog: boolean;
  setIsOpenTaskDialog: (isOpen: boolean) => void;
};

const useTaskStore = create<TaskState>()(
  devtools(
    immer((set) => ({
      isOpenTaskDialog: false,

      setIsOpenTaskDialog: (isOpen) =>
        set((state) => {
          state.isOpenTaskDialog = isOpen;
        }),
    })),
    { name: "TaskStore" }
  )
);

export { useTaskStore };
export const taskStore = useTaskStore;
