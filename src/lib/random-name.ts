import { adjectives, animals, colors, Config, uniqueNamesGenerator } from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

export const getRandomName = () => uniqueNamesGenerator(customConfig);
