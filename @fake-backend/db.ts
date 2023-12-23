import { faker } from "@faker-js/faker";
import type { Property } from "src/domain/models";

const categories = ["Apartment", "House", "Office", "Land", "Condo", "Other"];

interface FakeBackendData {
  properties: Property[];
  featured: Property[];
}

function createRandomProperty(id: number): Property {
  return {
    id: id.toString(),
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
  const randomPropertiesTotalData = faker.number.int({ min: 10, max: 20 });
  const randomFeaturedPropertiesTotalData = faker.number.int({
    min: 2,
    max: 7,
  });
  const data: FakeBackendData = { properties: [], featured: [] };
  for (let i = 0; i < randomPropertiesTotalData; i += 1) {
    data.properties.push(createRandomProperty(i + 1));
  }
  for (let i = 0; i < randomFeaturedPropertiesTotalData; i += 1) {
    data.featured.push(createRandomProperty(i + 1));
  }
  return data;
};

export default generateMockData;
