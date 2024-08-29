import ComponentTestHelper from '../helpers/ComponentTestHelper';
import FireBaseConnector from '../../connectors/FireBaseConnector';
import { getStringField } from '../helpers/ModelFaker';
import { initializeApp } from 'firebase/app';
import { faker } from '@faker-js/faker';
import { getDatabase, onValue, ref } from 'firebase/database';

jest.mock('firebase/app', () => ({
  ...jest.requireActual('firebase/app'),
  initializeApp: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  ...jest.requireActual('firebase/database'),
  getDatabase: jest.fn(),
  ref: jest.fn(),
  onValue: jest.fn(),
}));

describe('FireBaseConnector', () => {
  ComponentTestHelper.prepare();

  test('getNotification()', () => {
    const fakeEndPoint = faker.internet.url();
    process.env.REACT_APP_FIREBASE_END_POINT = fakeEndPoint;

    const fakeId = getStringField('id');
    const callBack = jest.fn();

    const fakeApp = { app: getStringField('fakeApp') };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    initializeApp.mockReturnValue(fakeApp);

    const fakeDB = { db: getStringField('fakeDB') };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getDatabase.mockReturnValue(fakeDB);

    const fakeRef = { ref: getStringField('fakeRef') };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ref.mockReturnValue(fakeRef);

    FireBaseConnector.getNotification(fakeId, callBack);

    expect(initializeApp).toHaveBeenCalledTimes(1);
    expect(initializeApp).toHaveBeenLastCalledWith({
      projectId: 'noti-sound',
      databaseURL: fakeEndPoint,
    });

    expect(getDatabase).toHaveBeenCalledTimes(1);
    expect(getDatabase).toHaveBeenLastCalledWith(fakeApp);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(fakeDB, `notifications/${fakeId}`);

    expect(onValue).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenLastCalledWith(fakeRef, expect.any(Function));

    const fakeData = { data: getStringField('fakeData') };
    const fakeSnapshot = {
      val: jest.fn().mockReturnValue(fakeData),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onValue.mock.calls[0][1](fakeSnapshot);
    expect(fakeSnapshot.val).toHaveBeenCalledTimes(1);
    expect(fakeSnapshot.val).toHaveBeenLastCalledWith();

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(callBack).toHaveBeenLastCalledWith(fakeData);
  });
});
