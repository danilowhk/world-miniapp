import { ArrowLeft } from "lucide-react";

const roleplays = [
  {
    id: 1,
    name: "Ordering flowers",
    href: "/chat/conversation",
    level: "Basics",
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1677005708723-c0dabb815e4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "At the dry cleaning",
    href: "/chat/conversation",
    level: "Basics",
    imageSrc: "https://simply.co.th/wp-content/uploads/2020/09/sadas1.jpg",
  },
  {
    id: 3,
    name: "At the post office",
    href: "/chat/conversation",
    level: "Basics",
    imageSrc:
      "https://media.npr.org/assets/img/2011/08/18/2011.08.18-postoffice-a46bc2dbbcd3d41e4cd579e4e03f571f4501f5f1.jpg?s=1100&c=85&f=webp",
  },
  {
    id: 4,
    name: "Lunchtime",
    href: "/chat/conversation",
    level: "Basics",
    imageSrc:
      "https://assets.epicurious.com/photos/5702bb00397c848d670c219d/16:9/w_2240,c_limit/lunch%20break.jpg",
  },
  {
    id: 5,
    name: "Business meeting",
    href: "/chat/conversation",
    level: "Advanced",
    imageSrc:
      "https://www.parkregisbirmingham.co.uk/wp-content/uploads/2016/10/business-meeting-birmingham.jpg",
  },
  {
    id: 6,
    name: "Ordering birthday cake",
    href: "/chat/conversation",
    level: "Basics",
    imageSrc:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/fb/ca/e5/the-mandarin-cake-shop.jpg?w=1400&h=800&s=1",
  },
  {
    id: 7,
    name: "Asking for directions",
    href: "/chat/conversation",
    level: "Basics",
    imageSrc:
      "https://mojarradi.com/wp-content/uploads/2019/01/Asking-Directions.jpg",
  },
];

export default function RolesSection() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header - Fixed at top */}
      <div className="flex items-center px-4 py-3 bg-white">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-black"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold ml-4">Roleplays</h1>
      </div>

      {/* Grid - Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4">
          {roleplays.map((roleplay) => (
            <a
              key={roleplay.id}
              href={roleplay.href}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden"
            >
              {/* Background image */}
              <img
                src={roleplay.imageSrc}
                alt={roleplay.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Title */}
                <h2 className="text-white text-3xl font-semibold leading-tight">
                  {roleplay.name}
                </h2>

                {/* Level badge */}
                <div className="self-start">
                  <span className="inline-block bg-white/90 text-black px-4 py-2 rounded-full text-sm">
                    {roleplay.level}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="flex justify-around items-center py-4 border-t bg-white">
        <button className="p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </button>
        <button className="p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <button className="p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
