import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Navbar from "./Navbar";
const plantsPerPage = 10;
const plants = [
  {
    id: 1,
    name: "Thyme",
    scientific_name: "Thymus vulgaris",
    common_names: ["Thyme"],
    regions: ["Lebanon", "Syria", "Jordan", "Palestine"],
    care: {
      water: "Moderate watering, does not tolerate overwatering",
      sunlight: "Needs full sunlight",
      soil: "Grows in dry, well-drained soil",
    },
    description:
      "Thyme is a fragrant herb used in cooking and medicine. It has tiny green leaves and is known for its strong flavor. Thyme is often used in Mediterranean cuisine.",
  },
  {
    id: 2,
    name: "Mint",
    scientific_name: "Mentha",
    common_names: ["Mint"],
    regions: ["Egypt", "Syria", "Lebanon", "Iraq"],
    care: {
      water: "Regular watering to keep the soil moist",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in moist, well-drained soil",
    },
    description:
      "Mint is a popular herb with a refreshing flavor. It's commonly used in drinks, salads, and desserts. Mint has a distinctive aroma and is often grown in gardens for its culinary and medicinal uses.",
  },
  {
    id: 3,
    name: "Basil",
    scientific_name: "Ocimum basilicum",
    common_names: ["Basil"],
    regions: ["Syria", "Lebanon", "Iraq", "Yemen"],
    care: {
      water: "Moderate watering, prefers regular watering",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in fertile, well-drained soil",
    },
    description:
      "Basil is a key herb in many cuisines, particularly Italian. It has a sweet, slightly peppery flavor and is often used in pesto, salads, and as a garnish.",
  },
  {
    id: 4,
    name: "Christ's Thorn Jujube",
    scientific_name: "Ziziphus spina-christi",
    common_names: ["Sidr"],
    regions: ["Yemen", "Saudi Arabia", "Oman", "UAE"],
    care: {
      water: "Moderate watering, drought tolerant",
      sunlight: "Needs full sunlight",
      soil: "Grows in sandy, dry soil",
    },
    description:
      "The Christ's Thorn Jujube is a hardy tree known for its medicinal properties. It produces small, edible fruits and is often used in traditional medicine.",
  },
  {
    id: 5,
    name: "Date Palm",
    scientific_name: "Phoenix dactylifera",
    common_names: ["Date Palm"],
    regions: ["Saudi Arabia", "Iraq", "UAE", "Kuwait"],
    care: {
      water: "Moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained soil",
    },
    description:
      "Date palms are iconic trees in desert regions. They produce sweet, edible dates and are highly valued for their fruit. The trees are also used in landscaping and as a source of shade.",
  },
  {
    id: 6,
    name: "Rosemary",
    scientific_name: "Salvia rosmarinus",
    common_names: ["Rosemary"],
    regions: ["Lebanon", "Syria", "Turkey", "Cyprus"],
    care: {
      water: "Low to moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, slightly acidic soil",
    },
    description:
      "Rosemary is an aromatic herb used in cooking and for its medicinal properties. It has needle-like leaves and a distinctive pine-like flavor. It's popular in Mediterranean dishes.",
  },
  {
    id: 7,
    name: "Lavender",
    scientific_name: "Lavandula",
    common_names: ["Lavender"],
    regions: ["Morocco", "Tunisia", "Egypt"],
    care: {
      water: "Low watering, drought tolerant",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Lavender is known for its fragrant purple flowers and is often used in perfumes and aromatherapy. It has a calming scent and is also used in cooking and herbal remedies.",
  },
  {
    id: 8,
    name: "Oregano",
    scientific_name: "Origanum vulgare",
    common_names: ["Oregano"],
    regions: ["Turkey", "Greece", "Lebanon"],
    care: {
      water: "Moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained soil",
    },
    description:
      "Oregano is a popular herb in Mediterranean cuisine. It has a robust flavor and is often used in pizza, pasta sauces, and grilled meats. It's also valued for its medicinal properties.",
  },
  {
    id: 9,
    name: "Parsley",
    scientific_name: "Petroselinum crispum",
    common_names: ["Parsley"],
    regions: ["Egypt", "Lebanon", "Syria", "Jordan"],
    care: {
      water: "Regular watering to keep the soil moist",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in rich, well-drained soil",
    },
    description:
      "Parsley is a versatile herb used in a wide range of dishes. It has a fresh, mild flavor and is often used as a garnish or in salads. It also has health benefits and is rich in vitamins.",
  },
  {
    id: 10,
    name: "Sage",
    scientific_name: "Salvia officinalis",
    common_names: ["Sage"],
    regions: ["Turkey", "Lebanon", "Syria"],
    care: {
      water: "Moderate watering, prefers dry conditions",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Sage is an herb with a strong, earthy flavor. It is often used in stuffing, sausages, and as a seasoning for meats. It also has medicinal uses and is known for its anti-inflammatory properties.",
  },
  {
    id: 11,
    name: "Coriander",
    scientific_name: "Coriandrum sativum",
    common_names: ["Coriander"],
    regions: ["Egypt", "Morocco", "Lebanon"],
    care: {
      water: "Regular watering to keep the soil moist",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Coriander is a herb with a distinct flavor that is used in various cuisines. Its leaves (cilantro) and seeds (coriander) are both used in cooking. It's known for its fresh, citrusy taste.",
  },
  {
    id: 12,
    name: "Aloe Vera",
    scientific_name: "Aloe vera",
    common_names: ["Aloe Vera"],
    regions: ["Egypt", "Saudi Arabia", "Yemen"],
    care: {
      water: "Low watering, drought tolerant",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Aloe Vera is known for its soothing gel used in skin care and medicinal products. It has thick, fleshy leaves and is commonly used to treat burns and moisturize the skin.",
  },
  {
    id: 13,
    name: "Marjoram",
    scientific_name: "Origanum majorana",
    common_names: ["Marjoram"],
    regions: ["Lebanon", "Syria", "Turkey"],
    care: {
      water: "Moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Marjoram is a sweet, aromatic herb used in a variety of dishes. It has a milder flavor compared to oregano and is often used in soups, stews, and sauces.",
  },
  {
    id: 14,
    name: "Spearmint",
    scientific_name: "Mentha spicata",
    common_names: ["Spearmint"],
    regions: ["Egypt", "Lebanon", "Syria"],
    care: {
      water: "Regular watering to keep the soil moist",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Spearmint is a type of mint with a sweet, refreshing taste. It's used in various dishes, teas, and as a garnish. It has a milder flavor compared to peppermint.",
  },
  {
    id: 15,
    name: "Dill",
    scientific_name: "Anethum graveolens",
    common_names: ["Dill"],
    regions: ["Lebanon", "Syria", "Jordan"],
    care: {
      water: "Moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Dill is an herb with feathery leaves and a distinctive flavor. It's commonly used in pickles, salads, and as a seasoning for fish and meats.",
  },
  {
    id: 16,
    name: "Tarragon",
    scientific_name: "Artemisia dracunculus",
    common_names: ["Tarragon"],
    regions: ["Lebanon", "Syria", "Turkey"],
    care: {
      water: "Moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Tarragon is an herb with a distinctive anise-like flavor. It's often used in French cuisine and pairs well with chicken, fish, and sauces.",
  },
  {
    id: 17,
    name: "Chili Pepper",
    scientific_name: "Capsicum annuum",
    common_names: ["Chili Pepper"],
    regions: ["Egypt", "Lebanon", "Syria"],
    care: {
      water: "Moderate watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Chili peppers add heat to dishes and are used in a variety of cuisines. They have a spicy flavor and can range from mild to very hot.",
  },
  {
    id: 18,
    name: "Fennel",
    scientific_name: "Foeniculum vulgare",
    common_names: ["Fennel"],
    regions: ["Egypt", "Lebanon", "Syria"],
    care: {
      water: "Regular watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, sandy soil",
    },
    description:
      "Fennel has a licorice-like flavor and is used in cooking and salads. Its bulb, fronds, and seeds are all edible and have various culinary uses.",
  },
  {
    id: 19,
    name: "Cucumber",
    scientific_name: "Cucumis sativus",
    common_names: ["Cucumber"],
    regions: ["Egypt", "Lebanon", "Jordan"],
    care: {
      water: "Regular watering to keep the soil moist",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Cucumbers are refreshing and crisp vegetables often used in salads and sandwiches. They have high water content and are known for their cooling effect.",
  },
  {
    id: 20,
    name: "Arugula",
    scientific_name: "Eruca sativa",
    common_names: ["Arugula"],
    regions: ["Lebanon", "Syria", "Turkey"],
    care: {
      water: "Regular watering",
      sunlight: "Needs partial to full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Arugula is a leafy green with a peppery flavor. It’s commonly used in salads and as a garnish, and it’s rich in vitamins and minerals.",
  },
  {
    id: 21,
    name: "Radish",
    scientific_name: "Raphanus sativus",
    common_names: ["Radish"],
    regions: ["Egypt", "Lebanon", "Syria"],
    care: {
      water: "Regular watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, loose soil",
    },
    description:
      "Radishes are crunchy root vegetables with a peppery taste. They are often used in salads and have a quick growing cycle.",
  },
  {
    id: 22,
    name: "Chard",
    scientific_name: "Beta vulgaris",
    common_names: ["Swiss Chard"],
    regions: ["Lebanon", "Syria", "Turkey"],
    care: {
      water: "Regular watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Chard is a leafy green vegetable with vibrant stalks. It has a mild, slightly earthy flavor and is used in a variety of dishes, including soups and sautés.",
  },
  {
    id: 23,
    name: "Beetroot",
    scientific_name: "Beta vulgaris",
    common_names: ["Beetroot"],
    regions: ["Egypt", "Lebanon", "Syria"],
    care: {
      water: "Regular watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Beetroots are root vegetables known for their deep red color. They have a sweet, earthy flavor and can be used in salads, soups, and as a side dish.",
  },
  {
    id: 24,
    name: "Kale",
    scientific_name: "Brassica oleracea",
    common_names: ["Kale"],
    regions: ["Lebanon", "Syria", "Turkey"],
    care: {
      water: "Regular watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Kale is a nutrient-dense leafy green with a slightly bitter taste. It’s often used in salads, smoothies, and cooked dishes for its health benefits.",
  },
  {
    id: 25,
    name: "Celery",
    scientific_name: "Apium graveolens",
    common_names: ["Celery"],
    regions: ["Lebanon", "Syria", "Egypt"],
    care: {
      water: "Regular watering to keep the soil moist",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Celery is a crunchy vegetable used in salads, soups, and as a snack. It has a mild, slightly peppery flavor and is high in fiber.",
  },
  {
    id: 26,
    name: "Zucchini",
    scientific_name: "Cucurbita pepo",
    common_names: ["Zucchini"],
    regions: ["Egypt", "Lebanon", "Jordan"],
    care: {
      water: "Regular watering",
      sunlight: "Needs full sunlight",
      soil: "Grows in well-drained, fertile soil",
    },
    description:
      "Zucchini is a versatile squash with a mild flavor. It’s used in a variety of dishes, including stir-fries, baked goods, and as a side vegetable.",
  },
];
const Plantsdoc = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    const results = plants.filter(
      (plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "all" || plant.regions.includes(filter)) // Adjust the filter condition to use the correct property
    );
    setFilteredPlants(results);
    setCurrentPage(1);
  }, [searchTerm, filter, plants]);

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = filteredPlants.slice(
    indexOfFirstPlant,
    indexOfLastPlant
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="ابحث عن نبات..."
              className="w-full py-2 px-4 pr-10 rounded-full border-2 border-[#7ed958] focus:outline-none focus:border-[#86E85D]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-[#7ed958] absolute right-3 top-2" />
          </div>
          <div className="relative w-full md:w-1/3">
            <select
              className="w-full py-2 px-4 pr-10 rounded-full border-2 border-[#7ed958] focus:outline-none focus:border-[#86E85D] appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">جميع الأماكن</option>
              <option value="داخلي">داخلي</option>
              <option value="خارجي">خارجي</option>
            </select>
            <FunnelIcon className="h-6 w-6 text-[#7ed958] absolute right-3 top-2 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <img
                src={plant.imageUrl || "default-image-url.jpg"} // تأكد من وجود خاصية imageUrl أو استخدام صورة افتراضية
                alt={plant.name}
                className="w-full h-32 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2 text-[#519335]">
                {plant.name}
              </h2>
              <p className="mb-2 text-gray-700">
                <strong className="text-[#519335]">العناية:</strong>{" "}
                {plant.care.water}, {plant.care.sunlight}, {plant.care.soil}
              </p>
              <p className="text-gray-700">
                <strong className="text-[#519335]">الوصف:</strong>{" "}
                {plant.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 p-2 rounded-full bg-[#98E379] text-white disabled:opacity-50"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            {Array.from({
              length: Math.ceil(filteredPlants.length / plantsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-[#7ed958] text-white"
                    : "bg-[#98E379] text-[#519335]"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredPlants.length / plantsPerPage)
              }
              className="ml-2 p-2 rounded-full bg-[#98E379] text-white disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Plantsdoc;
