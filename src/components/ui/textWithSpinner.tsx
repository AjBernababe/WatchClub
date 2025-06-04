import { Spinner } from "./spinner";

export function TextWithSpinner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <Spinner />
    </div>
  );
}
