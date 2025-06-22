import { TaskFilters } from "@/modules/task/components";
import { Suspense } from "react";

export default function TasksPage() {
  return (
    <div>
      <Suspense>
        <TaskFilters />
      </Suspense>
    </div>
  );
}
