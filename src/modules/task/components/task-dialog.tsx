"use client";

import {
  DatePickerField,
  InputField,
  SelectField,
  TextareaField,
} from "@/shared/components/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Form } from "@/shared/components/ui/form";
import { LoadingButton } from "@/shared/components/ui/loading-button";
import { useSearchParams } from "@/shared/hooks";
import { ErrorResponse } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TaskStatus } from "../enums";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../hooks/mutations";
import { useDeleteTaskMutation } from "../hooks/mutations/use-delete-task.mutation";
import { useGetTasksQuery } from "../hooks/queries";
import {
  CreateTaskFormData,
  createTaskSchema,
  UpdateTaskFormData,
  updateTaskSchema,
} from "../schemas";
import { useTaskStore } from "../stores/task.store";

type TaskDialogProps = {
  dialogTrigger: React.ReactNode;
};

const TaskDialog = ({ dialogTrigger }: TaskDialogProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const queryClient = useQueryClient();
  const { getParam } = useSearchParams();

  const queryKey = [
    "tasks",
    {
      title: getParam("title"),
      dueDate: getParam("date"),
    },
  ];

  const {
    defaultTaskStatus,
    isOpenTaskDialog,
    setIsOpenTaskDialog,
    dialogMode,
    selectedTask,
    getInitialValues,
  } = useTaskStore();

  const form = useForm<CreateTaskFormData | UpdateTaskFormData>({
    resolver: zodResolver(
      dialogMode === "create" ? createTaskSchema : updateTaskSchema
    ),
    defaultValues: getInitialValues(selectedTask),
  });
  useEffect(() => {
    form.reset(getInitialValues(selectedTask));
  }, [selectedTask, dialogMode]);

  useEffect(() => {
    console.log(defaultTaskStatus, dialogMode);
    if (dialogMode === "create") {
      form.setValue("status", defaultTaskStatus);
    }
  }, [dialogMode, defaultTaskStatus]);

  const currentStatus = form.watch("status");

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const { data: tasksByNewStatus, refetch: refetchTasksByNewStatus } =
    useGetTasksQuery(
      {
        status: currentStatus as TaskStatus,
      },
      {
        enabled: !!currentStatus,
      }
    );

  const invalidateTasksQuery = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const onSubmit = async (data: CreateTaskFormData | UpdateTaskFormData) => {
    try {
      if (dialogMode === "create") {
        await createTaskMutation.mutateAsync(data);
        toast.success("Task created successfully");
      } else {
        if (!selectedTask) return;
        let newPriority = selectedTask.priority;
        if (selectedTask.status !== data.status) {
          await refetchTasksByNewStatus();
          const tasks = tasksByNewStatus?.data.result || [];
          newPriority = tasks?.length ? tasks.length + 1 : 1;
        }
        const newData = {
          ...data,
          priority: newPriority,
        };

        await updateTaskMutation.mutateAsync({
          id: selectedTask?._id as string,
          body: newData as UpdateTaskFormData,
        });
        toast.success("Task updated successfully");
      }
      setIsOpenTaskDialog(false);
      form.reset();
      invalidateTasksQuery();
    } catch (error) {
      const errorMessage = (error as AxiosError<ErrorResponse>).response?.data
        .error;
      toast.error(errorMessage as string);
    }
  };

  const onDeleteTask = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;
    try {
      await deleteTaskMutation.mutateAsync({ id: selectedTask?._id as string });
      toast.success("Task deleted successfully");
      setIsOpenTaskDialog(false);
      invalidateTasksQuery();
    } catch (error) {
      const errorMessage = (error as AxiosError<ErrorResponse>).response?.data
        .error;
      toast.error(errorMessage as string);
    }
  };

  return (
    <div>
      <Dialog open={isOpenTaskDialog} onOpenChange={setIsOpenTaskDialog}>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "create" ? "Add Task" : "Edit Task"}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "create"
                ? "Add a new task to your list."
                : "Edit the task details."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <InputField
                  showRequiredMark
                  control={form.control}
                  name="title"
                  label="Title"
                  inputProps={{
                    type: "text",
                    placeholder: "Task title",
                  }}
                />
              </div>
              <div className="space-y-2">
                <TextareaField
                  control={form.control}
                  name="description"
                  label="Description"
                  textareaProps={{
                    placeholder: "Enter your description...",
                    rows: 4,
                    className: "min-h-[100px]",
                  }}
                />
              </div>
              <div className="space-y-2">
                <DatePickerField
                  control={form.control}
                  name="dueDate"
                  label="Due Date"
                  datePickerProps={{
                    open: datePickerOpen,
                    setOpen: setDatePickerOpen,
                  }}
                />
              </div>
              <div className="space-y-2">
                <SelectField
                  control={form.control}
                  name="status"
                  label="Status"
                  options={Object.values(TaskStatus).map((status) => ({
                    value: status,
                    label: status,
                  }))}
                />
              </div>
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={
                  createTaskMutation.isPending || updateTaskMutation.isPending
                }
              >
                {dialogMode === "create" ? "Add Task" : "Update Task"}
              </LoadingButton>

              {dialogMode === "edit" && (
                <LoadingButton
                  variant="destructive"
                  type="button"
                  onClick={onDeleteTask}
                  loading={deleteTaskMutation.isPending}
                  disabled={deleteTaskMutation.isPending}
                >
                  Delete Task
                </LoadingButton>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export { TaskDialog };
