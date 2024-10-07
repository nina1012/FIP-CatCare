export const SuccessStories = () => {
  const cats = [
    {
      img: './src/features/landing/assets/cat3.jpeg',
      description:
        "Whiskers's journey was tough, but with consistent tracking and treatment, he's now thriving. His family never missed a dose thanks to the reminders in the app.",
      name: 'Whiskers',
    },
    {
      img: './src/features/landing/assets/cat1.jpeg',
      description:
        'Luna showed tremendous courage throughout the treatment. The app helped her family keep track of her health logs, ensuring every step was carefully monitored.',
      name: 'Luna',
    },
    {
      img: './src/features/landing/assets/cat2.jpeg',
      description:
        "Gary's recovery was made easier with the app's comprehensive health records. His weight and medication were closely monitored, making his treatment smoother.",
      name: 'Gary',
    },
  ];
  return (
    <section className="my-8">
      <div className="">
        <h2 className="mb-6 text-center text-4xl font-bold">
          Success Stories: Triumph Over FIP
        </h2>
        <p className="mx-auto max-w-3xl text-center text-lg text-gray-700">
          The greatest highlight of our journey is seeing these brave cats
          conquer FIP successfully! Their stories of resilience and recovery
          inspire us every day. These little fighters remind us that with the
          right care and dedication, recovery is possible—and we&apos;re here to
          help every step of the way. 🐾💖
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 justify-center gap-4 md:grid-cols-3">
        {cats.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col overflow-hidden rounded-md bg-white p-4 shadow-md"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="size-full overflow-hidden rounded-md object-cover object-center"
            />
            <div className="mt-2 text-center text-gray-700">
              <h6 className="text-lg font-semibold">{cat.name}</h6>
              <p>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
