export const Header = () => {
  return (
    <header className="fixed top-0 z-[999] flex h-16 w-full items-center justify-between bg-white px-8 shadow-md">
      <div className="flex items-center justify-center gap-2 font-bold">
        <img
          src="/cat-medication.png"
          className="h-auto max-h-10"
          alt="FIP CatCare"
        />
        <h1 className="text-xl">FIP CatCare</h1>
      </div>
    </header>
  );
};
