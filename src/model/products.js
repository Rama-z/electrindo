let temp = [];

module.exports = {
  getProduct: () => {
    return new Promise((resolve) => {
      return resolve(temp);
    });
  },
  createProduct: (body) => {
    return new Promise((resolve) => {
      temp.push({
        id: body.id,
        name: body.name,
        brand: body.brand,
        price: body.price,
      });
      return resolve(temp);
    });
  },
  deleteProduct: (id) => {
    return new Promise((resolve) => {
      console.log(id);
      let result = temp.filter((item) => item.id !== id);
      temp = result;
      return resolve(result);
    });
  },
};
