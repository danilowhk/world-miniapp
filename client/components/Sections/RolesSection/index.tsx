import { ArrowLeft } from 'lucide-react';

const roleplays = [
  {
    id: 1,
    name: 'Ordering flowers',
    href: '/chat/conversation',
    level: 'Basic',
    imageSrc: 'https://plus.unsplash.com/premium_photo-1677005708723-c0dabb815e4b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'At the dry cleaning',
    href: '/chat/conversation',
    level: 'Basic',
    imageSrc: 'https://simply.co.th/wp-content/uploads/2020/09/sadas1.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 3,
    name: 'At the post office',
    href: '/chat/conversation',
    level: 'Basic',
    imageSrc: 'https://media.npr.org/assets/img/2011/08/18/2011.08.18-postoffice-a46bc2dbbcd3d41e4cd579e4e03f571f4501f5f1.jpg?s=1100&c=85&f=webp',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 4,
    name: 'Lunchtime',
    href: '/chat/conversation',
    level: 'Basic',
    imageSrc: 'https://assets.epicurious.com/photos/5702bb00397c848d670c219d/16:9/w_2240,c_limit/lunch%20break.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 5,
    name: 'Business meeting',
    href: '/chat/conversation',
    level: 'Advanced',
    imageSrc: 'https://www.parkregisbirmingham.co.uk/wp-content/uploads/2016/10/business-meeting-birmingham.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 6,
    name: 'Ordering birthday cake',
    href: '/chat/conversation',
    level: 'Basic',
    imageSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/fb/ca/e5/the-mandarin-cake-shop.jpg?w=1400&h=800&s=1  ',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 7,
    name: 'Asking for directions',
    href: '/chat/conversation',
    level: 'Basic',
    imageSrc: 'https://mojarradi.com/wp-content/uploads/2019/01/Asking-Directions.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
]

export default function RolesSection() {
  return (
    <div className="flex flex-col justify-between relative isolate overflow-hidden bg-white h-full px-6 py-4 text-center shadow-2xl">
      <h2 className="sr-only">Roleplays</h2>

      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex justify-start items-center text-gray-900 px-4 py-2 font-medium hover:text-gray-400 text-4xl"
      >
        <ArrowLeft size={16} className="inline-block mr-2" />
        Roleplays
      </button>

      <div className="grid grid-cols-2 gap-y-4 gap-x-4 max-h-[92vh] overflow-y-auto mt-4">
        {roleplays.map((roleplay) => (
          <div
            key={roleplay.id}
            className="group relative flex flex-col overflow-hidden rounded-lg bg-white"
          >
            <div className="relative bg-gray-900 h-96 w-full">
              <div className="aspect-h-6 aspect-w-2 opacity-75 group-hover:opacity-90 h-96">
                <a href={roleplay.href}>
                  <img
                    alt={roleplay.imageAlt}
                    src={roleplay.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </a>
              </div>

              {/* Title in the top-left corner */}
              <div className="absolute top-2 left-2 w-full px-2 py-1 text-left">
                <h3 className="text-sm font-medium text-white tracking-tight text-xl">
                  <a href={roleplay.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {roleplay.name}
                  </a>
                </h3>
              </div>

              {/* Level in the bottom-left corner */}
              <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 rounded-full px-3 py-1">
                <p className="text-lg font-semibold text-gray-700">{roleplay.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}