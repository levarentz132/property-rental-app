import { faker } from "@faker-js/faker";
import { Property } from "src/domain/models";

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
    picture: "https://picsum.photos/200/300",
  };
}

export default function () {
  const randomPropertiesTotalData = faker.number.int({ min: 10, max: 20 });
  const randomFeaturedPropertiesTotalData = faker.number.int({
    min: 2,
    max: 7,
  });
  const data: FakeBackendData = { properties: [], featured: [] };
  for (let i = 0; i < randomPropertiesTotalData; i++) {
    data.properties.push(createRandomProperty(i - 1));
  }
  for (let i = 0; i < randomFeaturedPropertiesTotalData; i++) {
    data.featured.push(createRandomProperty(i - 1));
  }
  return data;
}
