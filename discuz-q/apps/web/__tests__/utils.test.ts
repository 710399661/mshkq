import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatCompactNumber,
  formatFileSize,
  formatPercent,
  truncate,
} from '@discuzq/utils';

describe('formatNumber', () => {
  it('should format number with default decimals', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('should format number with specified decimals', () => {
    expect(formatNumber(1000.5, 2)).toBe('1,000.50');
    expect(formatNumber(1234.567, 2)).toBe('1,234.57');
  });
});

describe('formatCompactNumber', () => {
  it('should format small numbers as-is', () => {
    expect(formatCompactNumber(0)).toBe('0');
    expect(formatCompactNumber(999)).toBe('999');
  });

  it('should format thousands with k suffix', () => {
    expect(formatCompactNumber(1000)).toBe('1.0k');
    expect(formatCompactNumber(1500)).toBe('1.5k');
    expect(formatCompactNumber(9999)).toBe('10.0k');
  });

  it('should format ten-thousands with w suffix', () => {
    expect(formatCompactNumber(10000)).toBe('1.0w');
    expect(formatCompactNumber(15000)).toBe('1.5w');
    expect(formatCompactNumber(123456)).toBe('12.3w');
  });
});

describe('formatFileSize', () => {
  it('should return 0 B for 0 bytes', () => {
    expect(formatFileSize(0)).toBe('0 B');
  });

  it('should format bytes', () => {
    expect(formatFileSize(500)).toBe('500 B');
  });

  it('should format KB', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('should format MB', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(1572864)).toBe('1.5 MB');
  });

  it('should format GB', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
  });
});

describe('formatPercent', () => {
  it('should format percentage with default decimals', () => {
    expect(formatPercent(0.5)).toBe('50.0%');
    expect(formatPercent(1)).toBe('100.0%');
    expect(formatPercent(0.123)).toBe('12.3%');
  });

  it('should format percentage with specified decimals', () => {
    expect(formatPercent(0.5, 2)).toBe('50.00%');
    expect(formatPercent(0.1234, 2)).toBe('12.34%');
  });
});

describe('truncate', () => {
  it('should return original text if shorter than maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('should truncate text with default suffix', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
    expect(truncate('Hello World', 5)).toBe('He...');
  });

  it('should truncate text with custom suffix', () => {
    expect(truncate('Hello World', 8, '---')).toBe('Hello---');
  });
});
