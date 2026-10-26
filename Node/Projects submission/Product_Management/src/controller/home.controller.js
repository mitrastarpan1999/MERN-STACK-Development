const product = require("../models/product.model");

class homeController {
  async home(req, res) {
    const search = req.query.search;
    const colors = req.query.colors;
    const sizes = req.query.sizes;
    const brand = req.query.brand;
    const category = req.query.category;

    console.log(colors);
    console.log(req.query.sort);
    console.log(category);

    const query = { isDeleted: false };
    const sort = {};
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (req.query.sort === "price_asc") {
      sort.price = 1;
    } else if (req.query.sort === "price_desc") {
      sort.price = -1;
    } else if (req.query.sort === "newest") {
      sort.createdAt = -1;
    } else if (req.query.sort === "oldest") {
      sort.createdAt = 1;
    } else if (req.query.sort === "name_asc") {
      sort.name = 1;
    } else if (req.query.sort === "name_desc") {
      sort.name = -1;
    }

    const selectedColors = []
      .concat(colors || [])
      .map((color) => color.trim().toUpperCase());

    if (selectedColors.length > 0) {
      query.colors = {
        $in: selectedColors,
      };
    }

    const selectedSizes = [].concat(sizes || []);

    if (selectedSizes.length > 0) {
      query.sizes = {
        $in: selectedSizes,
      };
    }

    const selectedBrand = [].concat(brand || []);

    if (selectedBrand.length > 0) {
      query.brand = {
        $in: selectedBrand.map((brand) => new RegExp(`^${brand}`, "i")),
      };
    }

    if (category) {
      query.category = {
        $in: category,
      };
    }

    const savedProduct = await product.find(query).sort(sort);
    if (savedProduct.length === 0) {
      return res.render("home", {
        title: "Homepage",
        data: savedProduct,
        message: "There is no product",
      });
    }
    return res.render("home", {
      title: "Homepage",
      data: savedProduct,
      message: "",
    });
  }
}

module.exports = new homeController();
