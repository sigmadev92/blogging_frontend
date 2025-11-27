import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { User } from "../types/user";
import { User2Icon } from "lucide-react";
import UserProfileBox from "../components/ui/UserProfileBox";
import { usersURL } from "../constants/urls/backend";
const Authors = () => {
  const [authors, setAuthors] = useState<User[]>([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${usersURL}/authors`);
        if (!response.ok) {
          toast.error(`Request Failed ${response.status}`);
          return;
        }
        const data: { authors: User[] } = await response.json();
        setAuthors(data.authors);
      } catch (error) {
        console.log(error);
        toast.error("Client Request Failed in Error");
      }
    };
    fetchAuthors();
  }, []);
  return (
    <section className="pt-11 theme h-full">
      <div className="px-4 h-[98%] center">
        {authors.length > 0 ? (
          <ul className="flex gap-4 list-none">
            {authors.map((author, idx) => (
              <UserProfileBox user={author} key={idx} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <User2Icon size={50} />
            <p className="text-4xl text-red-400">No Authors found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Authors;
