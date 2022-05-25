import React from "react";

type Props = {
  title: string;
};

const CategoryCard: React.FC<Props> = ({ title }) => {
  return (
    <div className="text-white min-h-[90px] grid place-items-center bg-primary mb-2">
      <h1 className="text-xl uppercase text-center mx-2">{title}</h1>
    </div>
  );
};

export default CategoryCard;
