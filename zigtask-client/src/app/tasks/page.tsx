import { TaskBoard, TaskFilters } from "@/modules/task/components";
import { Suspense } from "react";

export default function TasksPage() {
  return (
    <div>
      <Suspense>
        <TaskFilters />
      </Suspense>

      <div className="mt-4">
        <Suspense>
          <TaskBoard />
        </Suspense>
      </div>
    </div>
  );
}
