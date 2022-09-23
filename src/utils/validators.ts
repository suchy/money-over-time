import _isDate from 'lodash/isDate';
import _isFinite from 'lodash/isFinite';
import _isString from 'lodash/isString';
import _startsWith from 'lodash/startsWith';

export const isString = (value: unknown) => _isString(value);

export const isNumber = (value: unknown) => _isFinite(value);

export const isDate = (value: unknown) => _isDate(value);

export const startsWith = (value: unknown, target: string) =>
  typeof value === 'string' && _startsWith(value, target);

export const isColor = (value: string) => /^#?([0-9a-f]{3}){1,2}$/i.test(value);
