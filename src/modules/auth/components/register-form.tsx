"use client";

import { InputField } from "@/shared/components/forms";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { LoadingButton } from "@/shared/components/ui/loading-button";
import { PathEnum } from "@/shared/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterMutation } from "../hooks/mutations";
import { RegisterFormData, registerSchema } from "../schemas";
import { ErrorResponse } from "@/shared/types";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      toast.success("Register successful");
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
              Create an account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to get started
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
              <div className="space-y-2">
                <InputField
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
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
                Sign up
              </LoadingButton>
            </form>
          </Form>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              onClick={() => router.push(PathEnum.LOGIN)}
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export { RegisterForm };
