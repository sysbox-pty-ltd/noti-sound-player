import iBaseType from '../../types/iBaseType';
import { faker } from '@faker-js/faker';
import MathHelper from '../../helper/MathHelper';

type iExtraBase = { CreatedBy?: iUser; UpdatedBy?: iUser } & iConfigParams;
export type iExtra = iConfigParams & iExtraBase;

export const getPaginatedResult = <T extends iBaseType>({
  data,
  from,
  to,
  total,
  pages,
  currentPage,
  perPage,
}: {
  data: T[];
  from?: 1;
  to?: number;
  total?: number;
  pages?: number;
  currentPage?: number;
  perPage?: number;
}) => {
  return {
    data,
    from: from || 1,
    to: to || MathHelper.sub(data.length, 1),
    total: total || data.length,
    pages: pages || 1,
    currentPage: currentPage || 1,
    perPage: perPage || 10,
  };
};

export const getFakeError = (extra = {}) => {
  const prefix = 'getFakeError';
  return {
    message: getStringField('message', prefix),
    ...extra,
  };
};

export const getFakeBaseType = (extra: iExtraBase = {}): iBaseType => {
  return {
    id: faker.string.uuid(),
    isActive: true,
    createdAt: faker.date.past().toISOString(),
    createdById: faker.string.uuid(),
    updatedAt: faker.date.past().toISOString(),
    updatedById: faker.string.uuid(),
    ...extra,
  };
};

export const getStringField = (name: string, prefix: string = '') => {
  const prefixStr = `${prefix}`.trim() === '' ? '' : `${prefix}-`;
  return `${prefixStr}${name}-${faker.string.uuid()}`;
};

export default {};
