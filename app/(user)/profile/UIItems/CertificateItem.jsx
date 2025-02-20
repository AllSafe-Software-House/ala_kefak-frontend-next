const CertificateItem = ({ certificate }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{certificate.organization}</h1>
      <h1 className="text-base md:text-xl font-medium">{certificate.title}</h1>
      <p className="text-sm md:text-base line-clamp-4">{certificate.date}</p>
    </div>
  );
};

export default CertificateItem