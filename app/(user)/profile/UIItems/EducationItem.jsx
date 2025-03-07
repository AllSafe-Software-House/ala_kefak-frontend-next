const EducationItem = ({ item }) => {
  return (
    <div dir="ltr" className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${item.university} | ${item.departement}`}</h1>
      <p className="text-xs md:text-sm">{`${item.from_date} - ${item.to_date}`}</p>
      <p className="text-sm md:text-base line-clamp-4">{item.description}</p>
    </div>
  );
};

export default EducationItem;
