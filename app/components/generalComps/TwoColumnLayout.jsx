const TwoColumnLayout = ({ leftContent, rightContent }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[70%_30%] justify-between gap-4 mb-8">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {leftContent}
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {rightContent}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
