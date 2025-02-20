import Heading from '../UIItems/Heading';

const Complete = ({ user }) => {
  return (
    <div className="w-full rounded-2xl bg-white  p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading text={"Complete Your Profile"} actions={[]} />
      <div className="mt-4">
        <progress
          className="w-full h-3 rounded-full mt-2"
          value={user.profileCompletion.stepsCompleted}
          max={user.profileCompletion.totalSteps}
        ></progress>
        <p>{`${user.profileCompletion.stepsCompleted}/${user.profileCompletion.totalSteps} Steps`}</p>
      </div>
    </div>
  );
};

export default Complete