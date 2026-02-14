import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function ScrollProgress() {
  const { scrollProgress } = useScrollPosition();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
