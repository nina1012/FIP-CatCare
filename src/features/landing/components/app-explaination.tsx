export const AppExplaination = () => {
  return (
    <section className="">
      <h2 className="my-8 text-center text-3xl font-semibold">
        How Our App Helps You and Your Cat
      </h2>
      <div className="flex items-center justify-evenly">
        <div className="w-1/2 text-xl text-gray-700">
          <p>
            <strong>FIP CatCare App</strong> is designed to make managing FIP
            treatment and monitoring your cat&apos;s progress easier and
            stress-free. With powerful tracking tools and reminders, it helps
            you stay on top of your cat&apos;s health journey.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            src="./src/features/landing/assets/p.png"
            alt="Phone app"
            className="overflow-hidden rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};
