const parseEnv = () => {
  const processEnv = process.env;
  const filterResult = Object.entries(processEnv).filter((value) => value[0].indexOf('RSS_') === 0);
  const stringResult = filterResult.map((value) => `${value[0]}=${value[1]}`).join('; ');
  console.log(stringResult);
};

parseEnv();
