import React from "react";
import {
  Search,
  Users,
  Briefcase,
  Globe,
  Monitor,
  ShoppingBag,
  Star,
  Zap,
  Users as UsersIcon,
} from "lucide-react";

const Careerpage = () => {
  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-orange-500 text-white p-8 flex">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">Hello, you!</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Start your job search here"
              className="w-full p-2 pr-10 rounded-full text-gray-800"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>
        <div className="w-1/2 bg-gray-200">
          {/* Placeholder for the image */}
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <div className="flex">
          <div className="w-1/3">
            <img
              src="/path-to-image.jpg"
              alt="Talabat employee"
              className="rounded-lg"
            />
          </div>
          <div className="w-2/3 pl-8">
            <p className="mb-4">
              Since we kicked things off in Kuwait back in 2004, talabat has
              been MENA's leading platform for everyday deliveries. Powered by
              local technology and knowledge, we deliver convenient and reliable
              solutions that simplify everyday life.
            </p>
            <p className="mb-4">
              Our local roots run deep, spanning eight markets in the region and
              provide tens of thousands of riders with solid earnings every
              single day. We get what the communities we serve really need. We
              cater to over 65,000 partners and create a positive impact by
              generating growth and opportunities for our communities.
            </p>
            <p>
              Here at talabat, we're all about keeping it real and making a
              difference. Our 5,000-strong talabaty are on an awesome mission to
              spread positive vibes. We genuinely love giving back and that's
              why we've teamed up with 35+ charities & NGOs in the region to
              make it happen.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 p-8">
        <h3 className="text-2xl font-bold mb-4">
          The things that set us apart
        </h3>
        <div className="flex justify-between">
          {[
            { icon: Users, value: "5,300+", label: "Employees" },
            { icon: Globe, value: "84+", label: "Nationalities" },
            { icon: Briefcase, value: "8", label: "Countries" },
            { icon: Monitor, value: "400+", label: "Employees in Tech" },
            { icon: ShoppingBag, value: "120+", label: "talabat mart stores" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-orange-500 text-white p-4 rounded-lg"
            >
              <stat.icon className="mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-4">Our values</h2>
        <p className="mb-4">
          Our values? They're like our North Star. Our moral GPS. They're the
          principles we live by at talabat.
        </p>
        <div className="flex justify-between">
          {[
            {
              icon: Star,
              title: "Experience first",
              description:
                "We put our customers, partners and colleagues at the heart of everything we do.",
            },
            {
              icon: Zap,
              title: "Make it happen",
              description:
                "We commit, raise the bar and quickly recover from our mistakes.",
            },
            {
              icon: UsersIcon,
              title: "Together we grow",
              description:
                "We appreciate diversity, value feedback and give each other support.",
            },
          ].map((value, index) => (
            <div key={index} className="text-center w-1/3 px-4">
              <value.icon className="mx-auto mb-2 text-orange-500" size={24} />
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teams Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-4">Discover Our Teams</h2>
        <p className="mb-4">
          Love delivering exceptional experiences to users? Or maybe you're a
          People & Culture enthusiast? Join our regional diverse community.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: "Tech",
              description:
                "Do you love finding new ways to shorten feedback loops, co-create and make an impact? We believe that the assumption behind the Speed vs. Quality mindset is flawed. For us, quality enables speed.",
            },
            {
              title: "Product",
              description:
                "Are you a continuous learner? In Product, you'd be part of a dynamic team embodying diverse qualities, including passionate crafters, enablers, effective communicators and critical thinkers. ",
            },
            {
              title: "Data",
              description:
                "Want to collaborate with and conduct in-depth analyses and answer complex problems? You'd communicate insights enabling the business to make more informed, data-driven decisions.",
            },
            {
              title: "People & Culture",
              description:
                "Want to form part of a team that is committed to creating an inclusive, collaborative and empowering workplace? You'd be part of a team that enables individuals to flourish in the organization. ",
            },
            {
              title: "Marketing",
              description:
                "Our marketing strategies aim to captivate and engage diverse audience. From grabbing attention through brand positioning & awareness tactics, to fostering meaningful brand partnerships.",
            },
            {
              title: "Financial & Legal",
              description:
                "The financial umbrella consists of 3 various functions: Finance, Legal and Fintech. If you are interested to support the organization, govern risk and comply with regulations this is the team for you.",
            },
            { title: "Quick Commerce", description: "" },
            { title: "Strategy & Innovation", description: "" },
            { title: "Comms, Public Affairs & CSR", description: "" },
          ].map((team, index) => (
            <div
              key={index}
              className="bg-orange-500 text-white p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2">{team.title}</h3>
              <p className="mb-4">{team.description}</p>
              <button className="bg-white text-orange-500 px-4 py-2 rounded-full">
                Apply here
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Careerpage;
