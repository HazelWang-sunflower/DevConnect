import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function Register() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
        Sign up to DevConnect
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
          })}
        ></form>
      </Form>
    </div>
  );
}
