const CertificateItem = ({ certificate }) => {
  return (
    <div dir="ltr" className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${certificate.name} | ${certificate.provider}`}</h1>
      <p className="text-xs md:text-sm">{`${certificate.from_date} - ${certificate.to_date}`}</p>
      <p className="text-sm md:text-base line-clamp-4">{certificate.description}</p>
      <a href={certificate.link} target="_blank" rel="noopener noreferrer"></a>
    </div>
  );
};

export default CertificateItem