export const PAGE_SIZE = 10;
/** 分页 */
export function Page(size, pagination) {
  this.pagination = pagination;
  this.size = size;
}

export const input_verify = {
  TYPE_NUMERIC: 1,
  TYPE_LOWER_LETTER: 2,
  TYPE_UPPER_LETTER: 4,
  TYPE_UNDER_LINE: 16,
  TYPE_CHINESE_CHAR: 32,
  TYPE_CHINESE_PRINT_CHAR: 64,
  TYPE_SPECIAL_CHAR: 256
};
input_verify.TYPE_LETTER = input_verify.TYPE_LOWER_LETTER | input_verify.TYPE_UPPER_LETTER;
input_verify.TYPE_NONSPECIAL_CHAR = input_verify.TYPE_NUMERIC | input_verify.TYPE_LETTER |
  input_verify.TYPE_UNDER_LINE;

