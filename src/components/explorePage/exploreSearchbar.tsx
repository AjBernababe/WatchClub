"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

type ExploreSearchbarProps = {
  handleTMDBSearch: (searchQuery: string) => void;
};

export function ExploreSearchbar({ handleTMDBSearch }: ExploreSearchbarProps) {
  const form = useForm();

  const onSubmit = async (data: any) => {
    const searchQuery: string = data.searchQuery || "";

    (document.activeElement as HTMLElement)?.blur();

    await handleTMDBSearch(searchQuery);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search for Movies or TV Shows..."
                  {...field}
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
