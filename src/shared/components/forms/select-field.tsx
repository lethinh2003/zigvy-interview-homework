import { ComponentProps, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/utils";
import { Asterisk } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  showRequiredMark?: boolean;
  options: SelectOption[];
  placeholder?: string;
  formItemProps?: ComponentProps<typeof FormItem>;
  selectProps?: ComponentProps<typeof Select>;
  triggerProps?: ComponentProps<typeof SelectTrigger>;
  contentProps?: ComponentProps<typeof SelectContent>;
  labelClassName?: string;
  labelWrapperClassName?: string;
  formMessageClassName?: string;
  selectClassName?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  showRequiredMark = false,
  options,
  placeholder,
  formItemProps,
  selectProps,
  triggerProps,
  contentProps,
  labelClassName,
  labelWrapperClassName,
  formMessageClassName,
  selectClassName,
  leftElement,
  rightElement,
}: SelectFieldProps<T>) => {
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
              <div className={cn("flex", selectClassName)}>
                {leftElement || rightElement ? (
                  <div className="relative w-full">
                    {leftElement}
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      {...selectProps}
                    >
                      <SelectTrigger {...triggerProps}>
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent {...contentProps}>
                        {options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {rightElement}
                  </div>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    {...selectProps}
                  >
                    <SelectTrigger {...triggerProps}>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent {...contentProps}>
                      {options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export { SelectField };
export type { SelectOption };
