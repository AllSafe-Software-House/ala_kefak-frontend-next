import Heading from '../UIItems/Heading';

const Badges = ({ user }) => {
  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading text={"Badges"} actions={[`${user.badges.length} Badges`]} />
      <div className="w-full grid grid-cols-1 gap-4">
        {user.badges.map((badge) => (
          <div
            className="flex justify-start items-center gap-4"
            key={badge.id}
            badge={badge}
          >
            <img src={badge?.image} alt="badge" className="w-10 h-10" />
            <div className="flex flex-col">
              <h3 className="text-sm md:text-base font-medium">{badge.title}</h3>
              <p className="text-xs md:text-sm">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges