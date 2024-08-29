import React from 'react';
import * as _ from 'lodash';
import { faker } from '@faker-js/faker';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import LocalStorageService from '../../services/LocalStorageService';
import { getPaginatedResult, getStringField } from './ModelFaker';
import iBaseType from '../../types/iBaseType';
import userEvent from '@testing-library/user-event';
import { iConfigParams } from '../../services/AppService';

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
  beforeEach(() => {
    reset();
    cleanup();
  });

  afterEach(() => {
    jest.clearAllMocks();
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

const getPopupModal = async (popupModalTestId?: string) => {
  if (!popupModalTestId || `${popupModalTestId || ''}`.trim() === '') {
    await waitFor(() => {
      expect(
        screen.getAllByTestId(new RegExp('PopupModal', 'i')).length,
      ).toBeGreaterThan(0);
    });
  } else {
    await waitFor(() => {
      expect(screen.getByTestId(popupModalTestId)).toBeInTheDocument();
    });
  }

  const elements = screen.getAllByTestId(new RegExp('PopupModal', 'i'));
  return !popupModalTestId || `${popupModalTestId || ''}`.trim() === ''
    ? elements[0]
    : screen.getByTestId(popupModalTestId);
};

type iMockedFn = Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jest.MockedFn<any>,
  'getMockName' | 'mock' | 'mockClear' | 'mockRese'
>;
type iTestPopupDeleteBtn = {
  entityId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fakeDeactivateResp?: any;
  mockedDeactivateFn: iMockedFn;
  deleteBtn: HTMLElement;
  popupModalTestId?: string;
};

const testPopupDeleteBtn = async ({
  entityId,
  deleteBtn,
  fakeDeactivateResp,
  mockedDeactivateFn,
  popupModalTestId,
}: iTestPopupDeleteBtn) => {
  fireEvent.click(deleteBtn);

  const popupModal = await getPopupModal(popupModalTestId);
  const confirmStr = within(popupModal).getByTestId(
    `delete-confirm-str-delete-btn-${entityId}--text`,
  ).textContent;
  const confirmInputBox = within(popupModal).getByTestId(
    `delete-confirm-str-input-delete-btn-${entityId}-textField`,
  );
  fireEvent.change(confirmInputBox, {
    target: {
      value: confirmStr,
    },
  });
  mockedDeactivateFn.mockResolvedValue(fakeDeactivateResp || { success: true });
  const confirmBtn = screen.getByTestId(
    `delete-confirm-popup-deleteBtn-delete-btn-${entityId}`,
  );

  fireEvent.click(confirmBtn);
  await waitFor(() => {
    expect(mockedDeactivateFn).toHaveBeenCalledTimes(1);
    expect(mockedDeactivateFn).toHaveBeenCalledWith(entityId);
  });
};

type iTestPaginationDetail = {
  testId: string;
  fakeResp: { from: number; to: number; total: number };
  mockedGetAllFn: iMockedFn;
  expectedCalledTimes: number;
};
const testPaginationDetail = async ({
  testId,
  fakeResp,
  mockedGetAllFn,
  expectedCalledTimes,
}: iTestPaginationDetail) => {
  const tableWrapper = screen.getByTestId(testId);
  const paginationDetailsWrapper = within(tableWrapper).getByTestId(
    `dynamic-tbl-p-details-${testId}`,
  );
  expect(
    within(paginationDetailsWrapper).getByTestId(
      `from-dynamic-tbl-p-details-${testId}`,
    ),
  ).toHaveTextContent(`${fakeResp.from}`);
  expect(
    within(paginationDetailsWrapper).getByTestId(
      `to-dynamic-tbl-p-details-${testId}`,
    ),
  ).toHaveTextContent(`${fakeResp.to}`);
  expect(
    within(paginationDetailsWrapper).getByTestId(
      `total-dynamic-tbl-p-details-${testId}`,
    ),
  ).toHaveTextContent(`${fakeResp.total}`);

  const refreshBtn = within(paginationDetailsWrapper).getByTestId(
    `refresh-data-btn-dynamic-tbl-p-details-${testId}-icon`,
  );

  fireEvent.click(refreshBtn);
  await waitFor(() => {
    expect(mockedGetAllFn).toHaveBeenCalledTimes(expectedCalledTimes);
  });
  return {
    tableWrapper,
  };
};

export type iTestPopupCreateOrUpdateBtnTestFieldFn = (data: {
  popupModal: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => Promise<any>;
type iTestPopupCreateOrUpdateBtn = {
  mockedCreateOrUpdateFn: iMockedFn;
  createOrUpdatePopupBtn: HTMLElement;
  testFields: iTestPopupCreateOrUpdateBtnTestFieldFn;
  updatingEntity?: { id: string };
  popupModalTestId?: string;
  submitBtnText?: string;
  expectedFnCalledTimes?: number;
};
const testPopupCreateOrUpdateBtn = async ({
  mockedCreateOrUpdateFn,
  createOrUpdatePopupBtn,
  testFields,
  updatingEntity,
  popupModalTestId,
  submitBtnText = 'Save',
  expectedFnCalledTimes = 1,
}: iTestPopupCreateOrUpdateBtn) => {
  fireEvent.click(createOrUpdatePopupBtn);

  const popupModal = await getPopupModal(popupModalTestId);
  const expectedParamsByCreateFn = await testFields({ popupModal });
  fireEvent.click(within(popupModal).getByText(new RegExp(submitBtnText, 'i')));

  await waitFor(() => {
    expect(mockedCreateOrUpdateFn).toHaveBeenCalledTimes(expectedFnCalledTimes);
  });
  if (expectedFnCalledTimes > 0) {
    await waitFor(() => {
      expect(mockedCreateOrUpdateFn).toHaveBeenCalledTimes(
        expectedFnCalledTimes,
      );
      // update
      if (`${updatingEntity?.id || ''}`.trim() !== '') {
        expect(mockedCreateOrUpdateFn).toHaveBeenLastCalledWith(
          `${updatingEntity?.id || ''}`.trim(),
          expectedParamsByCreateFn,
        );
      } else {
        // create
        expect(mockedCreateOrUpdateFn).toHaveBeenLastCalledWith(
          expectedParamsByCreateFn,
        );
      }
    });
  }

  return {
    popupModal,
    expectedParamsByCreateFn,
  };
};

type iTestEntityDynamicTable<T> = {
  getAllFn: iMockedFn;
  testId: string;
  mockedResponseDataArr: T[];
  renderComponentFn: () => void;
  columnsKeys: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initGetAllFnCalledParams: any;
  initGetAllFnCalledTimes?: number;
  selectiveLocalKey?: string;
};
const testEntityDynamicTable = async <T extends iBaseType>({
  getAllFn,
  testId,
  mockedResponseDataArr,
  columnsKeys,
  renderComponentFn,
  initGetAllFnCalledParams,
  selectiveLocalKey,
  initGetAllFnCalledTimes = 1,
}: iTestEntityDynamicTable<T>) => {
  getAllFn.mockResolvedValue(
    getPaginatedResult({ data: mockedResponseDataArr }),
  );
  LocalStorageService.getItem = jest.fn().mockReturnValue(columnsKeys);
  renderComponentFn();
  await waitFor(() => {
    expect(getAllFn).toHaveBeenCalledTimes(initGetAllFnCalledTimes);
    expect(getAllFn).toHaveBeenLastCalledWith(initGetAllFnCalledParams);
  });

  if (`${selectiveLocalKey || ''}`.trim() !== '') {
    expect(LocalStorageService.getItem).toHaveBeenCalled();
    expect(LocalStorageService.getItem).toHaveBeenLastCalledWith(
      selectiveLocalKey,
    );
  }

  const fakeFirstData =
    mockedResponseDataArr.length > 0 ? mockedResponseDataArr[0] : null;
  return {
    fakeFirstData: fakeFirstData,
    dataRow: screen.getByTestId(
      `dynamic-tbl-${testId}--row-${fakeFirstData?.id || ''}`,
    ),
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

type iTestSearch = {
  getAllFn: iMockedFn;
  expectedOriginalCalledParams: iConfigParams;
  expectedFilterParams: (searchText: string) => iConfigParams;
  searchBox: HTMLElement;
  searchBtn: HTMLElement;
  initialGetAllFnCalledTimes?: number;
};
const testSearch = async ({
  getAllFn,
  searchBox,
  searchBtn,
  expectedFilterParams,
  expectedOriginalCalledParams,
  initialGetAllFnCalledTimes = 1,
}: iTestSearch) => {
  const fakeSearchText = getStringField('fakeSearchText');
  fireEvent.change(searchBox, {
    target: { value: fakeSearchText },
  });
  fireEvent.click(searchBtn);

  await waitFor(() => {
    expect(getAllFn).toHaveBeenCalledTimes(initialGetAllFnCalledTimes + 1);
    expect(getAllFn).toHaveBeenLastCalledWith(
      expectedFilterParams(fakeSearchText),
    );
  });

  fireEvent.change(searchBox, {
    target: { value: '' },
  });
  fireEvent.keyDown(searchBox, {
    key: 'Enter',
    code: 'Enter',
    charCode: 13,
  });
  await waitFor(() => {
    expect(getAllFn).toHaveBeenCalledTimes(initialGetAllFnCalledTimes + 2);
    expect(getAllFn).toHaveBeenLastCalledWith(expectedOriginalCalledParams);
  });
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
  testPopupDeleteBtn,
  testPaginationDetail,
  testPopupCreateOrUpdateBtn,
  testEntityDynamicTable,
  selectFromSelector,
  testSearch,
};

export default ComponentTestHelper;
