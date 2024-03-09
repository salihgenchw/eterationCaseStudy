import BaseURL from "./BaseUrl";

class Endpoints {
  static GET_PRODUCTS = `${BaseURL.baseUrl}`;
  static DEFAULT_PAGINATION_LIMIT = BaseURL.limit;
}


export default Endpoints;