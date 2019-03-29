const getScrollbarWidth = element => {
  return element.offsetWidth - element.clientWidth;
};

export default getScrollbarWidth;
