import {
  BookOpen,
  Heart,
  Lightbulb,
  Rocket,
  Brain,
  Globe
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    name: "Romance",
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-500/10"
  },
  {
    name: "Self-Help",
    icon: Lightbulb,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10"
  },
  {
    name: "Sci-Fi",
    icon: Rocket,
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    name: "Psychology",
    icon: Brain,
    color: "text-teal-400",
    bg: "bg-teal-500/10"
  },
  {
    name: "Travel",
    icon: Globe,
    color: "text-green-400",
    bg: "bg-green-500/10"
  }
];

export default function ExploreCategories() {
  return (
    <section className="bg-slate-950 text-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">
            Explore Categories
          </h2>
          <p className="mt-4 text-slate-400">
            Discover your next favorite book across diverse genres and topics
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                className="
                  group
                  h-32
                  rounded-2xl
                  bg-slate-900/60
                  border border-slate-800
                  backdrop-blur
                  flex flex-col items-center justify-center
                  transition
                  hover:border-teal-500/40
                  hover:-translate-y-1
                "
              >
                <div
                  className={`
                    w-12 h-12 rounded-xl
                    flex items-center justify-center
                    ${cat.bg}
                    transition
                    group-hover:scale-110
                  `}
                >
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                </div>

                <span className="mt-4 text-sm font-medium">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* View More */}
        <div className="mt-14 text-center">
          <button className="
            inline-flex items-center gap-2
            text-sm text-slate-300
            hover:text-teal-400
            transition
          ">
            View More Categories
            <span className="text-lg">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
