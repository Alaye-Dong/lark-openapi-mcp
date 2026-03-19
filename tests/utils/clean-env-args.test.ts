import { cleanEnvArgs, parseBooleanEnv, parseArrayEnv } from '../../src/utils/clean-env-args';

describe('cleanEnvArgs', () => {
  it('should remove undefined values from the object', () => {
    const input = {
      validKey: 'validValue',
      undefinedKey: undefined,
      anotherValidKey: 'anotherValue',
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({
      validKey: 'validValue',
      anotherValidKey: 'anotherValue',
    });
  });

  it('should remove empty string values', () => {
    const input = {
      validKey: 'validValue',
      emptyKey: '',
      anotherValidKey: 'anotherValue',
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({
      validKey: 'validValue',
      anotherValidKey: 'anotherValue',
    });
  });

  it('should handle an empty object', () => {
    const input = {};

    const result = cleanEnvArgs(input);

    expect(result).toEqual({});
  });

  it('should handle object with all undefined values', () => {
    const input = {
      key1: undefined,
      key2: undefined,
      key3: undefined,
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({});
  });

  it('should handle object with all valid values', () => {
    const input = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    });
  });

  it('should handle mixed undefined, empty strings, and valid values', () => {
    const input = {
      validKey: 'validValue',
      undefinedKey: undefined,
      emptyKey: '',
      anotherValidKey: 'anotherValue',
      nullishKey: undefined,
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({
      validKey: 'validValue',
      anotherValidKey: 'anotherValue',
    });
  });

  it('should preserve whitespace-only strings as they are truthy', () => {
    const input = {
      validKey: 'validValue',
      whitespaceKey: '   ',
      tabKey: '\t',
      newlineKey: '\n',
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({
      validKey: 'validValue',
      whitespaceKey: '   ',
      tabKey: '\t',
      newlineKey: '\n',
    });
  });

  it('should handle numeric strings', () => {
    const input = {
      zeroString: '0',
      numberString: '123',
      undefinedKey: undefined,
    };

    const result = cleanEnvArgs(input);

    expect(result).toEqual({
      zeroString: '0',
      numberString: '123',
    });
  });
});

describe('parseBooleanEnv', () => {
  it('should return true for "true"', () => {
    expect(parseBooleanEnv('true')).toBe(true);
  });

  it('should return true for "TRUE" (case-insensitive)', () => {
    expect(parseBooleanEnv('TRUE')).toBe(true);
  });

  it('should return true for "1"', () => {
    expect(parseBooleanEnv('1')).toBe(true);
  });

  it('should return true for "yes"', () => {
    expect(parseBooleanEnv('yes')).toBe(true);
  });

  it('should return true for "on"', () => {
    expect(parseBooleanEnv('on')).toBe(true);
  });

  it('should return false for "false"', () => {
    expect(parseBooleanEnv('false')).toBe(false);
  });

  it('should return false for "0"', () => {
    expect(parseBooleanEnv('0')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(parseBooleanEnv('')).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(parseBooleanEnv(undefined)).toBe(false);
  });

  it('should return false for random string', () => {
    expect(parseBooleanEnv('random')).toBe(false);
  });
});

describe('parseArrayEnv', () => {
  it('should parse comma-separated values', () => {
    expect(parseArrayEnv('a,b,c')).toEqual(['a', 'b', 'c']);
  });

  it('should parse space-separated values', () => {
    expect(parseArrayEnv('a b c')).toEqual(['a', 'b', 'c']);
  });

  it('should parse mixed comma and space separated values', () => {
    expect(parseArrayEnv('a, b c, d')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should trim whitespace from values', () => {
    expect(parseArrayEnv('  a  ,  b  ')).toEqual(['a', 'b']);
  });

  it('should filter out empty values', () => {
    expect(parseArrayEnv('a,,b, ,c')).toEqual(['a', 'b', 'c']);
  });

  it('should return undefined for empty string', () => {
    expect(parseArrayEnv('')).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    expect(parseArrayEnv(undefined)).toBeUndefined();
  });

  it('should return undefined for whitespace-only string', () => {
    expect(parseArrayEnv('   ')).toBeUndefined();
  });
});
