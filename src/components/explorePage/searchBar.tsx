"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";

type SearchBarFormValues = {
  searchQuery: string;
};

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("searchQuery") || "";

  const form = useForm<SearchBarFormValues>({
    defaultValues: { searchQuery: searchValue },
  });

  const watchedSearchQuery = form.watch("searchQuery");

  const onSubmit = (values: SearchBarFormValues) => {
    const searchQuery = values.searchQuery.trim();
    if (!searchQuery) return;
    // Reset to page 1 whenever a new search is performed
    router.push(
      `/explore?searchQuery=${encodeURIComponent(searchQuery)}&page=1`
    );
  };

  const handleClear = () => {
    form.setValue("searchQuery", "");
    form.setFocus("searchQuery");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search your favorite shows..."
                      className="pl-10 pr-10"
                      {...field}
                    />
                    {watchedSearchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-muted"
                        onClick={handleClear}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
    </Form>
  );
}
