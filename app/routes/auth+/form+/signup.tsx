import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { type DataFunctionArgs, json } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { FormStrategy } from "remix-auth-form";
import { z } from "zod";

import { ErrorList, Field, SubmitButton } from "~/components/form.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~/components/ui/card.tsx";
import {
  DEFAULT_FAILURE_REDIRECT,
  DEFAULT_SUCCESS_REDIRECT,
  authenticator
} from "~/utils/auth.server.ts";
import { redirectToCookie } from "~/utils/cookies.server.ts";
import { prisma } from "~/utils/db.server.ts";

export async function signUp(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      passwordHash,
      username
    },
    select: { id: true }
  });

  return { id: user.id };
}

const SignUpFormSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    firstName: z.string({ required_error: "First name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    username: z.string({ required_error: "Username is required" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

export const action = async ({ request }: DataFunctionArgs) => {
  const formData = await request.formData();
  const submission = await parse(formData, {
    async: true,
    schema: () => {
      return SignUpFormSchema.superRefine(async (data, ctx) => {
        const existingUser = await prisma.user.findUnique({
          select: { id: true },
          where: { username: data.username }
        });
        if (existingUser) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "A user already exists with this username",
            path: ["username"]
          });
          return;
        }
      });
    }
  });
  if (!submission.value || submission.intent !== "submit") {
    return json(
      {
        status: "error",
        submission
      } as const,
      { status: 400 }
    );
  }

  const { firstName, lastName, password, username } = submission.value;

  // Create new user
  await signUp(username, password, firstName, lastName);

  const redirectTo =
    (await redirectToCookie.parse(request.headers.get("Cookie"))) ??
    DEFAULT_SUCCESS_REDIRECT;

  // Sign in
  await authenticator.authenticate(FormStrategy.name, request, {
    context: { formData },
    failureRedirect: DEFAULT_FAILURE_REDIRECT,
    successRedirect: redirectTo
  });

  return json({ status: "success", submission } as const);
};

export function SignUpForm() {
  const signUpFetcher = useFetcher<typeof action>();

  const [form, fields] = useForm({
    constraint: getFieldsetConstraint(SignUpFormSchema),
    id: "form-login-form",
    lastSubmission: signUpFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: SignUpFormSchema });
    },
    shouldRevalidate: "onBlur"
  });

  return (
    <Card className="w-3/4">
      <CardHeader>
        <CardTitle className="text-crl-deep-purple">Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <signUpFetcher.Form
          className="mb-8 flex flex-col sm:mb-4"
          method="post"
          {...form.props}
        >
          <Field
            errors={fields.firstName.errors}
            inputProps={conform.input(fields.firstName)}
            labelProps={{
              children: "First Name",
              htmlFor: fields.firstName.id
            }}
          />
          <Field
            errors={fields.lastName.errors}
            inputProps={conform.input(fields.lastName)}
            labelProps={{ children: "Last Name", htmlFor: fields.lastName.id }}
          />
          <Field
            errors={fields.username.errors}
            inputProps={conform.input(fields.username)}
            labelProps={{ children: "Username", htmlFor: fields.username.id }}
          />
          <Field
            errors={fields.password.errors}
            inputProps={conform.input(fields.password, { type: "password" })}
            labelProps={{ children: "Password", htmlFor: fields.password.id }}
          />
          <Field
            errors={fields.confirmPassword.errors}
            inputProps={conform.input(fields.confirmPassword, {
              type: "password"
            })}
            labelProps={{
              children: "Confirm Password",
              htmlFor: fields.confirmPassword.id
            }}
          />
          <ErrorList errors={form.errors} id={form.errorId} />
          <SubmitButton
            className="bg-crl-dark-blue px-6 py-2"
            state={signUpFetcher.state}
            type="submit"
          >
            Sign up
          </SubmitButton>
          <div className="mt-2 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link className="text-crl-electric-purple" to="/login">
              Log in
            </Link>
          </div>
        </signUpFetcher.Form>
      </CardContent>
    </Card>
  );
}
