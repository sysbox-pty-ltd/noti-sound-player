import React, { act } from 'react';
import * as _ from 'lodash';
import { faker } from '@faker-js/faker';
import { cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let componentCalledParams: { [key: string]: any[] } = {};

// eslint-disable-next-line @typescript-eslint/ban-types
type iCallbackFnMap = { [key: string]: Function };
// eslint-disable-next-line @typescript-eslint/ban-types
let componentCallbacks: { [key: string]: iCallbackFnMap[] } = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fakeHookResponses: { [key: string]: any[] } = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const add = (key: string, params: any) => {
  if (!(key in componentCalledParams)) {
    componentCalledParams[key] = [];
  }
  componentCalledParams[key].push(params);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const addCallbacks = (key: string, fnMap: iCallbackFnMap) => {
  if (!(key in componentCallbacks)) {
    componentCallbacks[key] = [];
  }
  componentCallbacks[key].push(fnMap);
};

const get = (key: string) => {
  if (!(key in componentCalledParams)) {
    return null;
  }
  return componentCalledParams[key];
};

const getCallbacks = (key: string) => {
  if (!(key in componentCallbacks)) {
    return null;
  }
  return componentCallbacks[key];
};

const clear = (key: string) => {
  delete componentCalledParams[key];
  delete componentCallbacks[key];
};

const remove = (key: string) => {
  delete componentCalledParams[key];
  delete componentCallbacks[key];
};

const reset = () => {
  componentCallbacks = {};
  componentCalledParams = {};
  fakeHookResponses = {};
};

const mockComponent =
  (
    fakeComponentKey: string,
    testId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    childrenParams: any | (() => any) = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCallBacks?: (param: any) => iCallbackFnMap,
  ) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
  (params: any) => {
    add(fakeComponentKey, params);
    const callbacks = getCallBacks ? getCallBacks(params) : {};
    if (Object.keys(callbacks).length > 0) {
      addCallbacks(fakeComponentKey, callbacks);
    }
    if (typeof params === 'object' && 'children' in params) {
      return (
        <div data-testid={testId}>
          {typeof params.children === 'function'
            ? params.children(
                typeof childrenParams === 'function'
                  ? childrenParams()
                  : childrenParams,
              )
            : params.children}
        </div>
      );
    }
    return <div data-testid={`${testId}`} />;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setHookResponse = (fakeComponentKey: string, hookResponse: any) => {
  fakeHookResponses[fakeComponentKey] = hookResponse;
};

const getHookResponse = (fakeComponentKey: string) => {
  return fakeHookResponses[fakeComponentKey];
};

const clearHookResponse = (key: string) => {
  delete fakeHookResponses[key];
};

const mockHook =
  (fakeComponentKey: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any) => {
    // avoid to a huge change
    if (args.length === 1) {
      add(fakeComponentKey, args[0]);
    } else {
      add(fakeComponentKey, args);
    }

    return getHookResponse(fakeComponentKey);
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const repeatObj = (obj: any, times: number) => {
  return _.range(0, times).map(() => obj);
};

const getKeyAndTestId = (prefix: string) => {
  return {
    key: `${prefix}-key`,
    testId: `${prefix}-testId`,
    childrenParams: { fakeChild: faker.string.uuid() },
  };
};

const prepare = () => {
  const oldEnv = { ...process.env };
  beforeEach(() => {
    reset();
    cleanup();
    process.env = { ...oldEnv };
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = oldEnv;
  });
};

const getChildren = (): {
  childrenTestId: string;
  children: React.ReactNode;
} => {
  const childrenTestId = `children-${faker.string.uuid()}`;
  const children = <div data-testid={childrenTestId} />;
  return {
    children,
    childrenTestId,
  };
};

type iSelectFromSelector = {
  selector: HTMLElement;
  targetLabelText: string;
};
const selectFromSelector = async ({
  selector,
  targetLabelText,
}: iSelectFromSelector) => {
  const control = selector.querySelector('[class$="-control"]');
  if (!control) {
    return;
  }
  act(() => {
    userEvent.click(control);
  });
  const inputBox = control.querySelector('input');
  const optionsListId = inputBox?.getAttribute('aria-controls');

  await waitFor(() => {
    expect(document.querySelector(`[id=${optionsListId}]`)).toBeInTheDocument();
  });

  const listOptions = Array.from(
    document.querySelectorAll(`[id=${optionsListId}] [class$='-option']`) || [],
  ).filter((option) =>
    `${option?.textContent || ''}`.trim().includes(targetLabelText),
  );
  if (listOptions.length > 0) {
    act(() => {
      userEvent.click(listOptions[0]);
    });
    await waitFor(() => {
      expect(document.querySelectorAll(`[id=${optionsListId}]`).length).toBe(0);
    });
  }
};

const ComponentTestHelper = {
  add,
  remove,
  get,
  getCallbacks,
  clear,
  reset,
  mockComponent,
  mockHook,
  setHookResponse,
  getHookResponse,
  clearHookResponse,
  repeatObj,
  getKeyAndTestId,
  prepare,
  getChildren,
  selectFromSelector,
};

export default ComponentTestHelper;
