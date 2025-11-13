import Left from "./Left";
import Right from "./Right";

const Dashboard = () => {
  return (
    <section className="px-2 flex gap-8 pt-11 dark:bg-black h-full dark:text-white bg-white">
      <Left className="hidden sm:visible sm:flex w-[15%] h-fit" />
      <Right />
    </section>
  );
};

export default Dashboard;
