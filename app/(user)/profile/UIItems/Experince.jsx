const Experince = ({ experience }) => {
  return (
    <div dir="ltr" className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${experience.name} | ${experience.company}`}</h1>
      <p className="text-xs md:text-sm">{`${experience.from_date} - ${experience.to_date}`}</p>
      <p className="text-sm md:text-base line-clamp-4">{experience.description}</p>
    </div>
  );
};

export default Experince