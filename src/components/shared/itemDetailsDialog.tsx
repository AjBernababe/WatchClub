"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TMDBItem } from "@/lib/tmdb";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type ItemDetailsDialogProps = {
  item: TMDBItem;
  children: React.ReactNode;
};

export function ItemDetailsDialog({ item, children }: ItemDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <VisuallyHidden>
          <DialogTitle>{item.title}</DialogTitle>
        </VisuallyHidden>

        <Image
          src={item.backdropImage}
          alt={item.title}
          width={800}
          height={450}
        />
      </DialogContent>
    </Dialog>
  );
}
