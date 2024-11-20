/* eslint-disable tailwindcss/no-custom-classname */
import { Link } from 'react-router-dom';

export const SuccessStories = () => {
  const cats = [
    {
      img: '/landing-assets/cat3.jpeg',
      description:
        "Whiskers's journey was tough, but with consistent tracking and treatment, he's now thriving. His family never missed a dose thanks to the reminders in the app.",
      name: 'Whiskers',
    },
    {
      img: '/landing-assets/cat1.jpeg',
      description:
        'Luna showed tremendous courage throughout the treatment. The app helped her family keep track of her health logs, ensuring every step was carefully monitored.',
      name: 'Luna',
    },
    {
      img: '/landing-assets/cat2.jpeg',
      description:
        "Gary's recovery was made easier with the app's comprehensive health records. His weight and medication were closely monitored, making his treatment smoother.",
      name: 'Gary',
    },
  ];
  return (
    <section className="my-8">
      <div className="">
        <h2 className="mb-6 text-center text-4xl font-bold">
          Success Stories: Triumph Over FIP 🌟
        </h2>
        <p className="mx-auto max-w-3xl text-center text-gray-700">
          The greatest highlight of our journey is seeing these brave cats
          conquer FIP successfully! Their stories of resilience and recovery
          inspire us every day. These little fighters remind us that with the
          right care and dedication, recovery is possible—and we&apos;re here to
          help every step of the way. 🐾💖
        </p>
      </div>
      <div className="container my-8 flex flex-wrap justify-center gap-4 [&>*]:w-full [&>*]:md:w-2/5 [&>*]:lg:w-[30%]">
        {cats.map((cat) => (
          <div
            key={cat.name}
            className="grid grid-rows-[250px,auto] overflow-hidden rounded-lg bg-white p-4 shadow-lg"
          >
            <div className="">
              <img
                src={cat.img}
                alt={cat.name}
                className="size-full overflow-hidden rounded-lg object-cover"
              />
            </div>
            <div className="mt-2 py-4 text-center">
              <h6 className="text-lg font-semibold">{cat.name}</h6>
              <blockquote>{cat.description}</blockquote>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8 flex items-center justify-center p-5 text-gray-700">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 font-bold"
        >
          <img
            src="/landing-assets/cat-medication.png"
            className="h-auto max-h-16"
            alt="FIP CatCare"
          />
          <h1 className="text-4xl">FIP CatCare</h1>
        </Link>
      </div>
    </section>
  );
};
