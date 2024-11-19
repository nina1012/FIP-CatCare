import { BellIcon, BriefcaseMedical, LineChart } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      heading: 'Track Daily Progress',
      desciption:
        "Easily log your cat's weight, medication doses and treatment notes to monitor progress every day",
      icon: <LineChart />,
    },
    {
      heading: 'Comprehensive Health Records',
      desciption:
        "Keep a detailed history of your cat's FIP treatment, ensuring that all essential data is stored in one place",
      icon: <BriefcaseMedical />,
    },
    {
      heading: 'Reminders and Alerts',
      desciption:
        "Set medication reminders and get notifications to stay on top of your cat's treatment schedule",
      icon: <BellIcon />,
    },
  ];
  return (
    <section
      id="features"
      className="grid grid-cols-1 gap-10 rounded-md lg:grid-cols-3"
    >
      {features.map((feature) => (
        <div
          className="flex w-full flex-col items-center gap-3 rounded-md bg-slate-50 p-4 text-center md:items-start md:text-left"
          key={feature.heading}
        >
          <span className="text-5xl text-primary">{feature.icon}</span>
          <h5 className="font-semibold">{feature.heading}</h5>
          <p>{feature.desciption}</p>
        </div>
      ))}
    </section>
  );
};
