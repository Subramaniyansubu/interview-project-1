"use client";

import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useCreateTurtleMutation } from "@/services/api";
import { useDispatch } from "@/lib/redux";
import { fetchTurtles } from "@/lib/slices/turtles-slice";

export function CreateTurtle() {
  const dispatch = useDispatch();
  const [createTurtle, { isLoading }] = useCreateTurtleMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name") as string;

    try {
      const res = await createTurtle({ name });
      if (res.error) {
        return alert(res.error);
      }
      dispatch(fetchTurtles());
      form.set("name", "");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form
      data-testid="create-turtle-form"
      className="flex w-full items-end justify-between gap-2"
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col items-start gap-2">
        <label id="name" className="text-sm text-gray-500">
          Kaplumbağa İsmi:
        </label>
        <Input placeholder="Mikalanjelo" id="name" name="name" />
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-lg border border-blue-500/50 bg-blue-500/20 p-2 text-blue-700 transition-colors hover:bg-blue-500/30"
      >
        {isLoading ? "Oluşturuluyor..." : "Oluştur"}
      </button>
    </form>
  );
}
