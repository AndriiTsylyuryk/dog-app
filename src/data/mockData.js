export const ACTIVITIES = [
  {
    id: 1,
    title: 'Friday walk with dogs',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    price: '$25',
    date: 'Friday, 10:00',
    rating: 4.8,
    description: 'Join us for a relaxed morning walk with your dog at the riverside park. Suitable for all breeds.',
    location: 'Riverside Park, Recife',
  },
  {
    id: 2,
    title: 'Walking at Marry house',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    price: '$18',
    date: 'Saturday, 09:00',
    rating: 4.5,
    description: 'Private yard walk in a safe, fenced area. Great for puppies and small dogs.',
    location: 'Olinda, Brazil',
  },
  {
    id: 3,
    title: 'Dog party at Nancy house',
    imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400',
    price: '$30',
    date: 'Mar 05, 14:00',
    rating: 4.9,
    description: 'A fun birthday party for dogs! Treats, games, and new friends guaranteed.',
    location: 'Recife, Brazil',
  },
];

export const CHATS = [
  { id: 1, name: 'Haley James',   avatarUrl: 'https://i.pravatar.cc/100?img=1',  lastMessage: 'Stand up for what you believe in', time: '14:32', unread: 2 },
  { id: 2, name: 'Nathan Scott',  avatarUrl: 'https://i.pravatar.cc/100?img=3',  lastMessage: 'One day you\'re seventeen and planning...', time: '12:10', unread: 0 },
  { id: 3, name: 'Brooke Davis',  avatarUrl: 'https://i.pravatar.cc/100?img=5',  lastMessage: 'I am who I am. No excuses.', time: '11:05', unread: 3 },
  { id: 4, name: 'Jamie Scott',   avatarUrl: 'https://i.pravatar.cc/100?img=8',  lastMessage: 'Some people are a little different.', time: 'Yesterday', unread: 0 },
  { id: 5, name: 'Marvin McFadden', avatarUrl: 'https://i.pravatar.cc/100?img=12', lastMessage: 'Last night in the NBA...', time: 'Yesterday', unread: 0 },
];

export const PARKS = [
  { id: 1, name: 'East side dog park',   isFree: true,  smallBreeds: true,  description: 'This dog park is suitable for small breeds. Open 24/7 with water stations.' },
  { id: 2, name: 'Central Dog Garden',   isFree: false, smallBreeds: false, description: 'Large open field for all dogs. Entry $2 per dog per day.' },
  { id: 3, name: 'Riverside Paw Zone',   isFree: true,  smallBreeds: false, description: 'Shaded area near the river. Perfect for hot summer days.' },
  { id: 4, name: 'Nancy\'s Dog Retreat', isFree: false, smallBreeds: true,  description: 'Private fenced area with obstacle courses and agility equipment.' },
];
