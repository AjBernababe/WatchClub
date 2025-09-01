"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

export default function TMDBSearchbar() {
  const form = useForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (values: any) => {
    console.log(values.searchString);

    inputRef.current?.blur();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
        <FormField
          control={form.control}
          name="searchString"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search for Movies or TV Shows..."
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    inputRef.current = e;
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </Form>
  );
}
