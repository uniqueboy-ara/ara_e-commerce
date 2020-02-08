export const AppRoutes = {
  Home: "",
  products: "products",
  Login: "login",
  UserProfile: "user-profile",
  Admin: {
    Panel: "admin",
    UsersList: "users",
    productCategories: "categories",
    AddCategory: "categories/new",
    productTags: "Tags",
    products: "products",
    AddProduct: "products/new",
    EditProduct: "products/:id"
  },
  Error: {
    ErrorPage: "404",
    AllOthers: "**"
  }
};

export const ServerAddress = 'http://localhost:3000/'
export const ServerRoutes = {
  Login: ServerAddress + "api/login",
  Users: {
    GENERAL_ROUTE: ServerAddress + "api/users/"
  },
  AdminPanelMenu: {
    ServerAddress: ServerAddress + "api/admin",
    File: {
      POST: ServerAddress + 'api/admin/upload',
      DELETE: ServerAddress + 'api/admin/upload'
    }
  },
  Categories: {
    GENERAL_ROUTE: ServerAddress + "api/categories"
  },
  Products: {
    GENERAL_ROUTE: ServerAddress + "api/products"
  },
  ShoppingCard: {
    GENERAL_ROUTE: ServerAddress + "api/shoppingCard"
  },
  Images: {
    Categories: ServerAddress + "img/cat",
    Products: ServerAddress + "img/prod"
  }
};
