const authMiddleware = (store) => (next) => (action) => {
    const statusCode = action?.payload?.status;
  
    if (action.payload && (statusCode === 403 || statusCode === 401)) {
      window.open(`/login`, "_self");
    }
  
    return next(action);
  };
  
  export default authMiddleware;
  