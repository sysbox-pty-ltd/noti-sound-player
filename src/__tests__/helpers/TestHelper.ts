import { faker } from '@faker-js/faker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectify = (model: any) => {
  return JSON.parse(JSON.stringify(model));
};

// prepareEnv
const prepareEnv = (newEnv = {}) => {
  const oldEnv = { ...process.env };
  beforeEach(() => {
    process.env = {
      ...oldEnv,
      ...newEnv,
    };
  });

  afterAll(() => {
    process.env = oldEnv;
  });
};

const getFakeParams = () => {
  return {
    fakeAppToken: faker.string.uuid(),
    fakeUrlPath: faker.string.uuid(),
    fakeUrl: faker.internet.url(),
    fakeId: faker.string.uuid(),
    fakeParams: {
      fakeParams: faker.string.uuid(),
    },
    fakeConfig: {
      headers: {
        fakeConfig: faker.string.uuid(),
      },
    },
    fakeResp: {
      fakeResp: faker.string.uuid(),
    },
  };
};

const TestHelper = {
  getFakeParams,
  prepareEnv,
  objectify,
};

export default TestHelper;
