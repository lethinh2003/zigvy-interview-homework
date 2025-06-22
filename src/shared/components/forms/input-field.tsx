import { ComponentProps, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/utils";
import { Asterisk } from "lucide-react";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  showRequiredMark?: boolean;
  formItemProps?: ComponentProps<typeof FormItem>;
  inputProps?: ComponentProps<typeof Input>;
  labelClassName?: string;
  labelWrapperClassName?: string;
  formMessageClassName?: string;
  inputClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  showRequiredMark = false,
  formItemProps,
  inputProps,
  labelClassName,
  labelWrapperClassName,
  formMessageClassName,
  inputClassName,
  leftElement,
  rightElement,
}: InputFieldProps<T>) => {
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
                    <Asterisk />
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
              <div className={cn("flex", inputClassName)}>
                {leftElement || rightElement ? (
                  <div className="relative w-full">
                    {leftElement}
                    <Input {...field} {...inputProps} />
                    {rightElement}
                  </div>
                ) : (
                  <Input {...field} {...inputProps} />
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

export { InputField };
