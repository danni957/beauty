import { SiteContent } from '../types';

export const defaultContent: SiteContent = {
  phone: '+447511693329',
  instagram: 'beautytrappamperbus',
  email: 'Danielletheo84@gmail.com',
  depositText: '£100 Deposit Secures Your Party Date!',

  hero: {
    badge: '👑 The UK’s Premier Mobile Kids Spa Experience',
    titleLine1: 'The',
    titleHighlight: 'Beauty Trap',
    titleLine2: 'Pamper Bus',
    subtitle: 'Luxury Kids & Teens Spa Parties On Wheels',
    description: 'We bring the sparkle to your doorstep across London, Essex, Surrey & Home Counties with Plouise makeup stations, Hollywood vanity mirrors, velvet spa pedicures, pink silk robes, karaoke and red carpet entrances!',
    videoUrl: '/pamper_bus_video.mp4'
  },

  packages: {
    scriptTitle: 'Choose Your Luxury',
    mainTitle: 'Children’s Pamper Packages',
    subtitle: 'Full bus hire, luxury treatments, sparkle and fun for your guests!',
    items: [
      {
        id: 'pkg-bronze',
        name: 'Bronze Package',
        treatmentsCount: '2 Treatments Included',
        icon: 'fas fa-gem text-amber-600',
        borderClass: 'border-amber-600',
        features: [
          '2 Luxury Treatments per child',
          'Pink Silk Robes & Spa Headbands to wear',
          'Pink Lemonade on arrival in champagne flutes',
          'Pink Carpet Arrival & Hollywood Mirrors',
          'Karaoke, Music & Luxury Plouise Stations',
          'Candy Floss to enjoy during party'
        ],
        pricing: [
          { guests: '6 Guests', price: '£375' },
          { guests: '8 Guests', price: '£450' },
          { guests: '10 Guests', price: '£500' },
          { guests: '12 Guests', price: '£575' }
        ]
      },
      {
        id: 'pkg-silver',
        name: 'Silver Package',
        treatmentsCount: '3 Treatments Included',
        popular: true,
        icon: 'fas fa-crown text-pink-500',
        borderClass: 'border-pink-500',
        features: [
          '3 Luxury Treatments per child',
          'Pink Silk Robes & Spa Headbands to wear',
          'Pink Lemonade on arrival in champagne flutes',
          'Pink Carpet Arrival & Hollywood Mirrors',
          'Karaoke, Music & Luxury Plouise Stations',
          'Candy Floss to enjoy during party'
        ],
        pricing: [
          { guests: '6 Guests', price: '£475' },
          { guests: '8 Guests', price: '£500' },
          { guests: '10 Guests', price: '£550' },
          { guests: '12 Guests', price: '£625' }
        ]
      },
      {
        id: 'pkg-gold',
        name: 'Gold Package',
        treatmentsCount: '4 Treatments Included',
        icon: 'fas fa-star text-yellow-500',
        borderClass: 'border-yellow-500',
        features: [
          '4 Luxury Treatments per child',
          'Pink Silk Robes & Spa Headbands to wear',
          'Pink Lemonade on arrival in champagne flutes',
          'Pink Carpet Arrival & Hollywood Mirrors',
          'Karaoke, Music & Luxury Plouise Stations',
          'Candy Floss to enjoy during party'
        ],
        pricing: [
          { guests: '6 Guests', price: '£625' },
          { guests: '8 Guests', price: '£675' },
          { guests: '10 Guests', price: '£700' },
          { guests: '12 Guests', price: '£750' }
        ]
      }
    ],
    partyIncludes: [
      'Pink Silk Robes & Spa Headbands',
      'Pink Carpet Arrival',
      'Pink Lemonade in Champagne Flutes',
      'Candy Floss',
      'Full Karaoke & Sound System',
      'Plouise Glam Makeup Stations',
      'Hollywood Light Vanity Mirrors',
      'Luxury Velvet Foot Spa Stations'
    ],
    treatmentCategories: [
      {
        title: 'Nails',
        icon: 'fas fa-hand-sparkles text-pink-500',
        items: ['Manicure', 'Pedicure', 'Nail Painting']
      },
      {
        title: 'Make-Up & Glam',
        icon: 'fas fa-magic text-bt-gold',
        items: ['Make-Up', 'Mini Makeovers', 'Festival Make-Up', 'Face Gems', 'Party Lashes']
      },
      {
        title: 'Hair',
        icon: 'fas fa-cut text-purple-400',
        items: ['Hair Braiding', 'Hair Tinsel', 'Hair Curling', 'Hair Straightening']
      },
      {
        title: 'Spa Treatments',
        icon: 'fas fa-spa text-emerald-400',
        items: ['Face Mask', 'Hand Massage', 'Foot Massage']
      }
    ],
    extraTreatments13Plus: [
      'Brow Wax & Tint',
      'LVL Lash Lift',
      'Strip or Cluster Lashes',
      'Full Glam Make-Up',
      'Hair Toning / Straightening'
    ]
  },

    addons: [
    {
      id: 'custom-robes',
      name: 'Personalised Name Embroidered Silk Robes',
      price: 10.50,
      perGuest: true,
      desc: 'Keepsake luxury pink silk robes with each child’s name to take home',
      icon: '🎀'
    },
    {
      id: 'deluxe-tiara',
      name: 'Birthday Girl Deluxe 24k Gold Tiara & Silk Sash',
      price: 20,
      desc: 'Royal crowning ceremony for the birthday VIP princess',
      icon: '👑'
    }
  ],

    timeSlots: [
    '🌅 Morning Slot (11:00 AM)',
    '☀️ Afternoon Slot (2:00 PM)',
    '🌆 Evening VIP Slot (5:00 PM)'
  ],

  faqs: [
    {
      id: 'faq-1',
      question: "How much space is needed to park the Beauty Trap pamper bus?",
      answer: "The bus requires approximately 2.5 to 3 standard car lengths of parking space on a flat, solid surface (such as outside your house on the road or a wide private driveway). Please ensure there is clear access with no low hanging trees or severe obstacles."
    },
    {
      id: 'faq-2',
      question: "Do you need to plug into our household electricity or water?",
      answer: "No, not at all! The Beauty Trap Pamper Bus is completely self-contained. We have our own onboard power generators, luxury warm water tanks, heating, and air-conditioning systems."
    },
    {
      id: 'faq-3',
      question: "What age groups do you cater for?",
      answer: "We specialize in children's parties for ages 4 to 16+, plus teenager glam parties, Hen Parties, and adult private functions. All treatments are tailored to be age-appropriate and skin-safe."
    },
    {
      id: 'faq-4',
      question: "How does the £100 deposit work?",
      answer: "A £100 deposit secures your preferred date and time slot. Once paid, your booking is locked into our master party calendar. The remaining balance is paid on the day of the party."
    },
    {
      id: 'faq-5',
      question: "Can parents stay inside the bus during the party?",
      answer: "Parents are always welcome to take photos, watch the red carpet entrance, and take a tour! However, our fully trained, insured, and DBS-checked team takes complete care of the pampering, so parents can comfortably relax in their home while the party is in full swing."
    },
    {
      id: 'faq-6',
      question: "What happens if it rains on the party day?",
      answer: "The party goes on in complete luxury! The bus interior is fully enclosed, heated in winter, air-conditioned in summer, and features a covered entrance so bad weather never spoils the fun."
    }
  ],

  instagramReels: [
    {
      id: 'reel-1',
      thumbnail: '/new_images/photo_6.jpeg',
      videoUrl: '/pamper_bus_video.mp4',
      caption: 'Full bus glam transformation! Hollywood mirrors, Plouise makeup stations & velvet pedicures ✨',
      likes: '1,420',
      comments: '86',
      tag: '#PlouiseGlam'
    },
    {
      id: 'reel-2',
      thumbnail: '/new_images/photo_1.jpeg',
      caption: 'Birthday girl VIP red carpet entrance! Nothing beats that priceless smile 💖',
      likes: '984',
      comments: '54',
      tag: '#RedCarpetVIP'
    },
    {
      id: 'reel-3',
      thumbnail: '/new_images/photo_4.jpeg',
      videoUrl: '/pamper_bus_video.mp4',
      caption: 'Plouise festival makeup, face gems and party lashes for the ultimate glow-up! 💄',
      likes: '1,890',
      comments: '112',
      tag: '#FestivalMakeup'
    },
    {
      id: 'reel-4',
      thumbnail: '/new_images/photo_3.jpeg',
      caption: 'Pink velvet spa pedicures & foot soaks with best friends inside the trap! 💅',
      likes: '1,150',
      comments: '63',
      tag: '#SpaPedicures'
    }
  ],

  coverage: {
    title: 'We Come To You! We Cover It All!',
    subtitle: 'From private driveways to curbside VIP parties across the South East & London.',
    areas: ['London', 'Essex', 'Surrey', 'Hertfordshire', 'Bedfordshire', 'Oxfordshire'],
    radiusInfo: 'We cover within 45 to 90 minutes travel radius. For locations slightly further, get in touch and we will be delighted to check availability!',
    mapImage: '/new_images/photo_10.jpeg'
  },

  testimonials: {
    scriptTitle: 'In Real Life',
    mainTitle: '5-Star Reviews & Experiences',
    items: [
      {
        id: 'rev-1',
        initials: 'AY',
        package: 'Gold Package (10 Guests)',
        rating: 5,
        text: 'Had my daughter’s 9th birthday on the Beauty Trap pamper bus and honestly it was the best experience ever! The bus is stunning, music pumping, Plouise makeup stations... all the girls felt like true VIPs! Danielle was amazing with the kids.',
        badge: 'Top Rated Parent Review'
      },
      {
        id: 'rev-2',
        initials: 'SK',
        package: 'Silver Package (8 Guests)',
        rating: 5,
        text: 'Booked for an 11th birthday and couldn’t be happier. The girls loved the foot spas, nails, hair tinsel and face glitter. Stress-free for the parents as Danielle and team entertained them the whole 2 hours. 10/10 recommend!',
        badge: 'Verified Customer'
      },
      {
        id: 'rev-3',
        initials: 'ES',
        package: 'Bronze Package (6 Guests)',
        rating: 5,
        text: 'The best party my daughter has ever had! The attention to detail inside the bus is incredible, from the pink silk robes to the candy floss and non-alcoholic champagne. Worth every penny.',
        badge: 'Verified Customer'
      },
      {
        id: 'rev-4',
        initials: 'MJ',
        package: 'Silver Package (12 Guests)',
        rating: 5,
        text: 'Absolutely blown away by the service and the luxury bus interior. Danielle made my daughter feel like an absolute princess on her 10th birthday. Best party investment ever!',
        badge: 'Verified Customer'
      },
      {
        id: 'rev-5',
        initials: 'LP',
        package: 'Gold Package (8 Guests)',
        rating: 5,
        text: 'Incredible setup, professional glam team and punctual arrival. The girls danced, sang karaoke and got full Plouise glam makeovers. Thank you Danielle for an unforgettable day!',
        badge: 'Verified Customer'
      }
    ]
  },

  gallery: {
    scriptTitle: 'Inside The Trap',
    mainTitle: 'Real Photos & Experiences',
    subtitle: 'Step inside our luxury pink and gold pamper paradise with real Plouise makeup stations, Hollywood mirrors, velvet seating and karaoke!',
    items: [
      { id: 'img-1', src: '/new_images/photo_1.jpeg', category: 'makeup', caption: 'Plouise Makeup & Face Gems Station' },
      { id: 'img-2', src: '/new_images/photo_2.jpeg', category: 'bus', caption: 'Luxury Velvet Interior Seating' },
      { id: 'img-3', src: '/new_images/photo_3.jpeg', category: 'nails', caption: 'Pink Pedicure & Foot Spa Sinks' },
      { id: 'img-4', src: '/new_images/photo_4.jpeg', category: 'makeup', caption: 'Mini Makeovers & Glitter Glam' },
      { id: 'img-5', src: '/new_images/photo_5.jpeg', category: 'bus', caption: 'Pamper Bus Hollywood Vanity' },
      { id: 'img-6', src: '/new_images/photo_6.jpeg', category: 'bus', caption: 'Pamper Bus Robes & Setup' },
      { id: 'img-7', src: '/new_images/photo_7.jpeg', category: 'bus', caption: 'Beauty Trap Pamper Bus Exterior' },
      { id: 'img-8', src: '/new_images/photo_8.jpeg', category: 'bus', caption: 'Hollywood Mirrors & Lights' },
      { id: 'img-9', src: '/new_images/photo_9.jpeg', category: 'bus', caption: 'Making Beds & Party Space' },
      { id: 'img-10', src: '/new_images/photo_10.jpeg', category: 'bus', caption: 'We Cover It All Map & Flyer' },
      { id: 'img-11', src: '/new_images/photo_11.jpeg', category: 'hair', caption: 'Hair Tinsel & Braiding Station' },
      { id: 'img-12', src: '/new_images/photo_12.jpeg', category: 'makeup', caption: 'Face Glitter & Gems Studio' },
      { id: 'img-13', src: '/new_images/photo_13.jpeg', category: 'nails', caption: 'Luxury Nail Polish Selection' },
      { id: 'img-14', src: '/new_images/photo_14.jpeg', category: 'bus', caption: 'Candy Floss & Drinks Station' },
      { id: 'img-15', src: '/new_images/photo_15.jpeg', category: 'hair', caption: 'Hair Styling & Curling Setup' },
      { id: 'img-16', src: '/new_images/photo_16.jpeg', category: 'bus', caption: 'VIP Party Arrival Setup' }
    ]
  }
};

export const defaultSiteContent = defaultContent;

