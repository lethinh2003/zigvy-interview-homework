"use client";

import { InputField } from "@/shared/components/forms/input-field";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../schemas";
import { useLoginMutation } from "../hooks/mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PathEnum } from "@/shared/enums";
import { LoadingButton } from "@/shared/components/ui/loading-button";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/shared/types";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success("Login successful");
      window.location.href = PathEnum.HOME;
    } catch (error: unknown) {
      const errorMessage = (error as AxiosError<ErrorResponse>).response?.data
        .error;
      toast.error(errorMessage as string);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-xl  bg-card/80 shadow-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="relative z-10 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <InputField
                  control={form.control}
                  name="email"
                  label="Email"
                  inputProps={{
                    type: "email",
                    placeholder: "name@example.com",
                  }}
                />
              </div>

              <div className="space-y-2">
                <InputField
                  control={form.control}
                  name="password"
                  label="Password"
                  inputProps={{
                    type: showPassword ? "text" : "password",
                    placeholder: "••••••••",
                  }}
                  rightElement={
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  }
                />
              </div>

              <LoadingButton
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full"
              >
                Sign in
              </LoadingButton>
            </form>
          </Form>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              onClick={() => router.push(PathEnum.REGISTER)}
            >
              Create one
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export { LoginForm };
