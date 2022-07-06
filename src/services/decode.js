const decodeEntity = (inputStr) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = inputStr;
  return textarea.value;
};

export default decodeEntity;
