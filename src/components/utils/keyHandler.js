const keyHandler = (event, action) => {
  switch (event.key) {
    case ' ':
    case 'Enter':
      action();
      break;
    default:
      break;
  }
};

export default keyHandler;
