interface IUrlConfig {
  baseUrl: string;
  limit?: number;
}

const mockApiURL: IUrlConfig = {
  baseUrl: "https://5fc9346b2af77700165ae514.mockapi.io/products",
  limit: 12, // Eteration tarafından belirlendi.
};

const BaseURL: IUrlConfig = mockApiURL;

export default BaseURL;
