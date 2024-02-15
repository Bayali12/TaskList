import { User } from '../types';

const images = Object.values(
  import.meta.glob('/src/assets/avatars/*', {
    eager: true,
    as: 'url',
  }),
);

const users: Array<User> = [
  {
    id: 1,
    firstName: 'Иван',
    lastName: 'Петров',
    avatar: images[0],
  },
  {
    id: 2,
    firstName: 'Александр',
    lastName: 'Смирнов',
    avatar: images[1],
  },
  {
    id: 3,
    firstName: 'Екатерина',
    lastName: 'Иванова',
    avatar: images[2],
  },
  {
    id: 4,
    firstName: 'Дмитрий',
    lastName: 'Соколов',
    avatar: images[3],
  },
  {
    id: 5,
    firstName: 'Ольга',
    lastName: 'Кузнецова',
    avatar: images[4],
  },
];

export default users;
