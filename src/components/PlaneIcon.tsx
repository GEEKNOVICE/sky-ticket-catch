import { cn } from "@/lib/utils";

interface PlaneIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const PlaneIcon = ({ className, size = "md" }: PlaneIconProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 14.5L13.5 11.5V6.5C13.5 5.67 12.83 5 12 5C11.17 5 10.5 5.67 10.5 6.5V11.5L2.5 14.5V16.5L10.5 14V18.5L8 20V21.5L12 20L16 21.5V20L13.5 18.5V14L21.5 16.5V14.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
