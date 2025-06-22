"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useForm } from "react-hook-form";
import { CreateTaskFormData, createTaskSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTaskMutation } from "../hooks/mutations";
import { Form } from "@/shared/components/ui/form";
import {
  DatePickerField,
  InputField,
  TextareaField,
} from "@/shared/components/forms";
import { useState } from "react";
import { LoadingButton } from "@/shared/components/ui/loading-button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/types";

type TaskDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogTrigger: React.ReactNode;
};

const TaskDialog = ({ open, setOpen, dialogTrigger }: TaskDialogProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: undefined,
    },
  });

  const createTaskMutation = useCreateTaskMutation();

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await createTaskMutation.mutateAsync(data);
      toast.success("Task created successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      const errorMessage = (error as AxiosError<ErrorResponse>).response?.data
        .error;
      toast.error(errorMessage as string);
    }
  };

  console.log(form.getValues());

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Add a new task to your list.</DialogDescription>
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
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={createTaskMutation.isPending}
              >
                Add Task
              </LoadingButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export { TaskDialog };
