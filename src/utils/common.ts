export const validateMessages = {
  required: (_, { label }) => `必须填写${label}`,
  string: {
    length: `字符数必须是 #{length}`,
    match: `不匹配正则 #{pattern}`,
  },
  number: {
    min: `最小值为 #{min}`,
    max: `最大值为 #{max}`,
  },
};

export const filterOption = (inputValue, option) =>
  option.props.children.indexOf(inputValue) >= 0;
