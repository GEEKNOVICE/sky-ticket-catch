import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card hover:shadow-elevated transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <p className="text-3xl font-display font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};
