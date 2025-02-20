const Experince = ({ experience }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${experience.jobTitle} | ${experience.companyName}`}</h1>
      <p className="text-xs md:text-sm">{`${experience.startDate} - ${experience.endDate}`}</p>
      <p className="text-sm md:text-base line-clamp-4">{experience.description}</p>
    </div>
  );
};

export default Experince