const BaseConst = {
  BASE_URL: process.env.NODE_ENV === 'development' ? window.baseUrl : window.baseUrl,
  BASE_URL_IMAGE: window.imageUrl
};
export default BaseConst
