const EducationItem = ({ item }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${item.institution} | ${item.fieldOfStudy}`}</h1>
      <p className="text-xs md:text-sm">{`${item.startDate} - ${item.endDate}`}</p>
      <p className="text-sm md:text-base line-clamp-4">{item.degree}</p>
    </div>
  );
};

export default EducationItem;
