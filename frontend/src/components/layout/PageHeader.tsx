
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">{title}</h1>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
};
