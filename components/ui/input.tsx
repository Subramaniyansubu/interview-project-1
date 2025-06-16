export function Input(props: React.ComponentProps<"input">) {
  return (
    <input
      className="w-full resize-none rounded-lg border border-green-500/50 bg-green-500/20 p-2 text-base text-green-700 outline-none placeholder:text-green-700/60"
      {...props}
    />
  );
}
