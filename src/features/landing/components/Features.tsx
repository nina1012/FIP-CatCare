import { BellIcon, BriefcaseMedical, LineChart } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      heading: 'Track Daily Progress',
      desciption:
        "Easily log your cat's weight, medication doses, and treatment notes to monitor progress every day",
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
      className="container mt-10 grid grid-cols-1 gap-10 md:grid-cols-3"
    >
      {features.map((feature) => (
        <div className="flex flex-col gap-3" key={feature.heading}>
          <span className="text-5xl text-primary">{feature.icon}</span>
          <h5 className="font-semibold">{feature.heading}</h5>
          <p>{feature.desciption}</p>
        </div>
      ))}
    </section>
  );
};
