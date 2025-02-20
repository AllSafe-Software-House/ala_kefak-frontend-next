const GenHeading = ({ text,classNames="" }) => {
  return <h3 className={`text-2xl lg:text-3xl font-semibold mb-2  text-slate-800  ${classNames} `}>{text}</h3>;
};

export default GenHeading;
