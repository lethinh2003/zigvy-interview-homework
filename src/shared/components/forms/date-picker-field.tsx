import { ComponentProps, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { DateOfBirthPicker } from "@/shared/components/ui/date-picker";
import { cn } from "@/shared/utils";
import { Asterisk } from "lucide-react";

interface DatePickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  showRequiredMark?: boolean;
  formItemProps?: ComponentProps<typeof FormItem>;
  datePickerProps?: {
    open?: boolean;
    setOpen?: (open: boolean) => void;
  };
  labelClassName?: string;
  labelWrapperClassName?: string;
  formMessageClassName?: string;
  datePickerClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const DatePickerField = <T extends FieldValues>({
  control,
  name,
  label,
  showRequiredMark = false,
  formItemProps,
  datePickerProps,
  labelClassName,
  labelWrapperClassName,
  formMessageClassName,
  datePickerClassName,
  leftElement,
  rightElement,
}: DatePickerFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleDateChange = (date: Date | undefined) => {
          field.onChange(date?.toISOString());
        };

        const fieldDate = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem {...formItemProps}>
            {label && (
              <div
                className={cn(
                  "flex items-center gap-[2px]",
                  labelWrapperClassName
                )}
              >
                {showRequiredMark && (
                  <div className="text-red-500">
                    <Asterisk className="h-3 w-3" />
                  </div>
                )}
                <FormLabel
                  className={cn("text-sm leading-none", labelClassName)}
                >
                  {label}
                </FormLabel>
              </div>
            )}
            <FormControl>
              <div className={cn("flex", datePickerClassName)}>
                {leftElement || rightElement ? (
                  <div className="relative w-full">
                    {leftElement}
                    <DateOfBirthPicker
                      open={datePickerProps?.open || false}
                      setOpen={datePickerProps?.setOpen || (() => {})}
                      date={fieldDate}
                      setDate={handleDateChange}
                    />
                    {rightElement}
                  </div>
                ) : (
                  <DateOfBirthPicker
                    open={datePickerProps?.open || false}
                    setOpen={datePickerProps?.setOpen || (() => {})}
                    date={fieldDate}
                    setDate={handleDateChange}
                  />
                )}
              </div>
            </FormControl>

            <FormMessage className={formMessageClassName} />
          </FormItem>
        );
      }}
    />
  );
};

export { DatePickerField };
