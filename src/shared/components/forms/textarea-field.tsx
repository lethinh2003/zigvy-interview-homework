import { ComponentProps, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/utils";
import { Asterisk } from "lucide-react";

interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  showRequiredMark?: boolean;
  formItemProps?: ComponentProps<typeof FormItem>;
  textareaProps?: ComponentProps<typeof Textarea>;
  labelClassName?: string;
  labelWrapperClassName?: string;
  formMessageClassName?: string;
  textareaClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  showRequiredMark = false,
  formItemProps,
  textareaProps,
  labelClassName,
  labelWrapperClassName,
  formMessageClassName,
  textareaClassName,
  leftElement,
  rightElement,
}: TextareaFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
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
              <div className={cn("flex", textareaClassName)}>
                {leftElement || rightElement ? (
                  <div className="relative w-full">
                    {leftElement}
                    <Textarea {...field} {...textareaProps} />
                    {rightElement}
                  </div>
                ) : (
                  <Textarea {...field} {...textareaProps} />
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

export { TextareaField };
