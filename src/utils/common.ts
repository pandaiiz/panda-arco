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

export const pictureSrcHandle = (obj: any, key: string) => {
  obj[key] =
    obj[key]?.length > 0
      ? [
          {
            uid: obj[key][0]?.uid,
            name: obj[key][0]?.name,
            url: obj[key][0]?.response?.src || obj[key][0]?.url,
          },
        ]
      : [];
};

export const filterNumbers = (str: string) => {
  return str.replace(/\d/g, '');
};
export const filterLetters = (str: string) => {
  return str.replace(/[a-zA-Z]/g, '');
};
