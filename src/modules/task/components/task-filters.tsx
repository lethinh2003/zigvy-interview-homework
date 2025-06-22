"use client";
import { Button } from "@/shared/components/ui/button";
import { DateOfBirthPicker } from "@/shared/components/ui/date-picker";
import { Input } from "@/shared/components/ui/input";
import { useSearchParams } from "@/shared/hooks";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const TaskFilters = () => {
  const [open, setOpen] = useState(false);

  const {
    params,
    setParam,
    getParam,
    clearParams,

    isDirty,
    debouncedParams,
  } = useSearchParams();

  const handleClearFilters = () => {
    clearParams();
  };

  const handleSetTitle = (value: string) => {
    setParam("title", value);
  };
  const handleSetDate = (value: Date | undefined) => {
    setParam("date", value?.toISOString());
  };
  const title = getParam("title");

  console.log(title, isDirty);

  useEffect(() => {
    console.log(params, debouncedParams);
  }, [params, debouncedParams]);

  return (
    <div>
      <div className="flex items-center gap-4 mt-4 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Title</span>
          <Input
            placeholder="Search by title"
            value={getParam("title") || ""}
            onChange={(e) => handleSetTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Due Date</span>
          <DateOfBirthPicker
            open={open}
            setOpen={setOpen}
            date={getParam("date") ? new Date(getParam("date")!) : undefined}
            setDate={handleSetDate}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-gray-600 h-8"
          onClick={handleClearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export { TaskFilters };
