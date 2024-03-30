import { UserCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const data = [
  {
    name: "Olivia I.",
    text: "StyleGPT transformed my design sketches into stunning realities. A true game-changer for creative professionals.",
    date: "Mar 27, 2024",
  },
  {
    name: "Chris H.",
    text: "Our kitchen renovation vision came to life with this app. Visualizing different styles made decision making a breeze.",
    date: "Mar 27, 2024",
  },
  {
    name: "Muhammad K.",
    text: "Showing properties in various styles has set my real estate offerings apart. This app is a vision-selling powerhouse.",
    date: "Mar 27, 2024",
  },
  {
    name: "George P.",
    text: "With just a few clicks, my average room was transformed into something you'd see in a design magazine.",
    date: "Mar 27, 2024",
  },
  {
    name: "Noah A.",
    text: "I never thought I could see my dream home before it became a reality. This app made it possible.",
    date: "Mar 27, 2024",
  },
  {
    name: "Mark R.",
    text: "Seeing my living room in my dream style was magical.",
    date: "Mar 27, 2024",
  },
];

const Testimonials = () => {
  return (
    <div className="flex items-center justify-center w-full pt-16 pb-24 md:pt-16 md:pb">
      <div className="flex flex-col items-center justify-center w-full max-w-[1100px] px-10 mx-auto lg:px-10 lg:flex-col md:px-5">
        <div className="flex flex-col items-center max-w-[612px]">
          <h2 className="text-5xl font-semibold text-center md:text-3xl">
            +1500 User Designed Their Dream Spaces with Our App
          </h2>
          <p className="mt-4 mb-8 text-lg text-center md:text-base">
            Explore testimonials from users who've brought their dream spaces to life with our platform. Their stories
            reflect the ease, creativity, and satisfaction our AI-driven designs deliver.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 lg:gap-4 md:grid-cols-1">
          {data.map((i, idx) => (
            <div key={i.name} className={`flex flex-col p-3 border-2 rounded-lg`}>
              <div className="flex items-center">
                <UserCircleIcon width={30} height={30} className="text-gray-500 mr-2" />
                <h6>{i.name}</h6>
              </div>
              <div className="flex items-center gap-[2px] mt-2 mb-4">
                <StarIcon width={20} height={20} color="#facc15" />
                <StarIcon width={20} height={20} color="#facc15" />
                <StarIcon width={20} height={20} color="#facc15" />
                <StarIcon width={20} height={20} color="#facc15" />
                <StarIcon width={20} height={20} color="#facc15" />
              </div>

              <p>{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
