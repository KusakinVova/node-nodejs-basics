const getArgs = (args) => {
  const res = {};
  const [execute, file, ...rest] = args;
  rest.forEach((value, index, array) => {
    if (value.charAt(0) === '-') {
      if (index == array.length - 1) {
        res[value.substring(2)] = true;
      } else if (array[index + 1].charAt(0) !== '--') {
        res[value.substring(2)] = array[index + 1];
      } else {
        res[value.substring(2)] = true;
      }
    }
  });
  return res;
};

const parseArgs = () => {
  const args = getArgs(process.argv);

  const resultString = Object.entries(args)
    .map(([key, value]) => `${key} is ${value}`)
    .join(', ');

  console.log(resultString);
};

parseArgs();
