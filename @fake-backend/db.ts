import { faker } from "@faker-js/faker";
import type { Property, UserData } from "src/domain/models";

const categories = ["Apartment", "House", "Office", "Land", "Condo", "Other"];

interface FakeBackendData {
  properties: Property[];
  featured: Property[];
  users: UserData[];
}

function createRandomUser(id: string): UserData {
  return {
    id,
    realName: faker.person.firstName(),
    username: faker.internet.userName(),
    userRole: faker.person.jobTitle(),
    profilePicture: faker.image.avatar(),
    bookmarks: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(
      () => faker.string.uuid(),
    ),
  };
}

function createRandomProperty(id: number, users: UserData[]): Property {
  const randomUser = faker.number.int({ min: 0, max: users.length - 1 });
  return {
    id: id.toString(),
    owner_id: users[randomUser].id,
    address: faker.location.streetAddress({ useFullAddress: true }),
    category:
      categories[
        faker.number.int({
          min: 0,
          max: categories.length - 1,
        })
      ],
    value: faker.number.int({ min: 750, max: 5000 }),
    bathrooms: faker.number.int({ min: 1, max: 5 }),
    beds: faker.number.int({ min: 1, max: 5 }),
    kitchens: faker.number.int({ min: 1, max: 5 }),
    size: faker.number.int({ min: 100, max: 2000 }),
    picture: faker.image.urlLoremFlickr({ category: "building" }),
    reviews: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(
      () => ({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        userRole: faker.person.jobTitle(),
        comment: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 1, max: 5 }),
        picture: faker.image.avatar(),
      }),
    ),
  };
}

const generateMockData = () => {
  const mockedTotalUsers = 5;
  const randomPropertiesTotalData = faker.number.int({ min: 10, max: 20 });
  const randomFeaturedPropertiesTotalData = faker.number.int({
    min: 2,
    max: 7,
  });
  const data: FakeBackendData = { properties: [], featured: [], users: [] };
  for (let i = 0; i < mockedTotalUsers; i += 1) {
    data.users.push(createRandomUser((i + 1).toString()));
  }
  for (let i = 0; i < randomPropertiesTotalData; i += 1) {
    data.properties.push(createRandomProperty(i + 1, data.users));
  }
  for (let i = 0; i < randomFeaturedPropertiesTotalData; i += 1) {
    data.featured.push(createRandomProperty(i + 1, data.users));
  }
  return data;
};

export default generateMockData;
