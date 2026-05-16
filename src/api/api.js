// Завдання 4: dayjs (2 kB) замість moment (72 kB) — однаковий API, у 36 разів менший бандл.
// Жодної іншої важкої залежності (lodash, moment) у проєкті не виявлено.
import dayjs from 'dayjs';

const API_URL = 'https://dog.ceo/api';

const breedFromUrl = url => {
  const folder = (url.split('/breeds/')[1] ?? '').split('/')[0];
  return folder.replace(/-/g, ' ');
};

const folderToPath = folder => {
  const i = folder.indexOf('-');
  return i === -1 ? folder : `${folder.slice(0, i)}/${folder.slice(i + 1)}`;
};

const checkResponse = async res => {
  if (!res.ok) throw new Error(`Помилка мережі: ${res.status}`);
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message ?? 'Невідома помилка API');
  return json;
};

export const fetchDogFeed = async (count = 10) => {
  const res = await fetch(`${API_URL}/breeds/image/random/${count}`);
  const { message } = await checkResponse(res);
  return message.map((imageUrl, i) => ({
    id: String(i),
    imageUrl,
    title: breedFromUrl(imageUrl),
    breed: (imageUrl.split('/breeds/')[1] ?? '').split('/')[0],
    price: 'Free',
    // Завдання 4: dayjs форматує поточну дату — замість hardcoded рядка
    date: dayjs().format('ddd, HH:mm'),
    rating: null,
    description: `Explore photos and facts about the ${breedFromUrl(imageUrl)} breed.`,
    location: 'Dog parks near you',
  }));
};

export const fetchBreedImages = async (breedFolder, count = 6) => {
  const path = folderToPath(breedFolder);
  const res = await fetch(`${API_URL}/breed/${path}/images/random/${count}`);
  const { message } = await checkResponse(res);
  return message;
};

// Завдання 2 (нова функціональність): список усіх порід для Breed Explorer
// API повертає об'єкт { bulldog: ['english','french'], labrador: [] }
// Конвертуємо у плаский масив рядків: ['bulldog-english', 'bulldog-french', 'labrador', ...]
export const fetchAllBreeds = async () => {
  const res = await fetch(`${API_URL}/breeds/list/all`);
  const { message } = await checkResponse(res);
  const list = [];
  for (const [breed, subs] of Object.entries(message)) {
    if (subs.length === 0) {
      list.push(breed);
    } else {
      subs.forEach(sub => list.push(`${breed}-${sub}`));
    }
  }
  return list.sort();
};
