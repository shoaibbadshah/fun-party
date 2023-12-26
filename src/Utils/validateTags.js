const validateTag = word => {
  const format = /[ !#@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\n]/;
  if (word.startsWith('#') && !format.test(word.substr(1))) {
    return true;
  }
  return false;
};
export default validateTag;
