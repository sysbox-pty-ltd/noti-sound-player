import { faker } from '@faker-js/faker';
import MathHelper from '../../helpers/MathHelper';

export const getPaginatedResult = <T>({
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

export const getStringField = (name: string, prefix: string = '') => {
  const prefixStr = `${prefix}`.trim() === '' ? '' : `${prefix}-`;
  return `${prefixStr}${name}-${faker.string.uuid()}`;
};

export default {};
