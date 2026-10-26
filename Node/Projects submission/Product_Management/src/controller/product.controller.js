const product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;
class productController {
  async createProduct(req, res) {
    try {
      const {
        name,
        description,
        price,
        discountPrice,
        category,
        brand,

        stock,
        sku,
      } = req.body;

      const sizes = (req.body.sizes || "")
        .split(",")
        .map((size) => size.trim().toUpperCase())
        .filter(Boolean);
      const colors = (req.body.colors || "")
        .split(",")
        .map((color) => color.trim().toUpperCase())
        .filter(Boolean);

      console.log(sizes);

      if (!name || !description || !price || !brand) {
        if (req.files) {
          const publicImageId = req.files.map((file) => file.filename);
          for (const id of publicImageId) {
            await cloudinary.uploader.destroy(id);
          }
        }

        return res.render("createProduct", {
          title: "Create Page",
          message: "All fields are required",
        });
      }

      const productData = new product({
        name,
        description,
        price,
        discountPrice,
        category,
        brand,
        sizes,
        colors,
        stock,
        sku,
      });

      if (req.files && req.files.length > 0) {
        productData.image = req.files.map((file) => file.path);
        productData.publicImageID = req.files.map((file) => file.filename);
      }

      const savedProduct = await productData.save();

      return res.redirect("/");

      //   console.log(req.files);
    } catch (error) {
      if (req.files) {
        const publicImageId = req.files.map((file) => file.filename);
        for (const id of publicImageId) {
          await cloudinary.uploader.destroy(id);
        }
      }
      console.log(error);
      return res.render("createProduct", {
        title: "Create Page",
        message: "Sorry, maybe you have selected more than five images.",
      });
    }
  }

  async createPage(req, res) {
    return res.render("createProduct", {
      title: "Create Page",
      message: "Please fill up the form.",
    });
  }

  async editPage(req, res) {
    try {
      const id = req.params.id;

      console.log("GET ID:", id);

      const findProduct = await product.findById(id);

      console.log("GET product:", findProduct);

      if (!findProduct) {
        return res.redirect("/");
      }

      return res.render("editProduct", {
        title: "Edit product",
        message: "",
        data: findProduct,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  }

  async update(req, res) {
    try {
      const {
        name,
        description,
        price,
        discountPrice,
        category,
        brand,

        stock,
        sku,
      } = req.body;

      const sizes = (req.body.sizes || "")
        .split(",")
        .map((size) => size.trim().toUpperCase())
        .filter(Boolean);
      const colors = (req.body.colors || "")
        .split(",")
        .map((color) => color.trim().toUpperCase())
        .filter(Boolean);
      const id = req.params.id;
      const findProduct = await product.findById(id);

      if (!findProduct) {
        if (req.files && req.files.length > 0) {
          const publicImageId = req.files.map((file) => file.filename);

          for (const imageId of publicImageId) {
            await cloudinary.uploader.destroy(imageId);
          }
        }

        return res.redirect("/");
      }

      if (req.files && req.files.length > 0) {
        const publicID = findProduct.publicImageID;

        for (const id of publicID) {
          await cloudinary.uploader.destroy(id);
        }
      }

      const updateProduct = {
        name,
        description,
        price,
        discountPrice,
        category,
        brand,
        sizes,
        colors,
        stock,
        sku,
      };

      if (req.files && req.files.length > 0) {
        updateProduct.image = req.files.map((file) => file.path);
        updateProduct.publicImageID = req.files.map((file) => file.filename);
      }

      const finalUpdate = await product.findByIdAndUpdate(id, updateProduct, {
        new: true,
        runValidators: true,
      });

      res.redirect("/");
    } catch (error) {
      if (req.files && req.files.length > 0) {
        const publicImageId = req.files.map((file) => file.filename);

        for (const imageId of publicImageId) {
          await cloudinary.uploader.destroy(imageId);
        }
      }
      console.log(error);
      return res.redirect("/");
    }
  }

  async recycleBin(req, res) {
    try {
      const search = req.query.search;
      const colors = req.query.colors;
      const sizes = req.query.sizes;
      const brand = req.query.brand;
      console.log(colors);
      console.log(req.query.sort);

      const query = { isDeleted: true };
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

      const getRecycledPorduct = await product.find(query).sort(sort);

      if (getRecycledPorduct.length === 0) {
        return res.render("recyclebin", {
          title: "Recycle Bin",
          data: getRecycledPorduct,
          message: "There is no product",
        });
      }

      return res.render("recyclebin", {
        title: "Recycle Bin",
        data: getRecycledPorduct,
        message: "",
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  }

  async softDelete(req, res) {
    try {
      const id = req.params.id;

      const updatedProduct = await product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { returnDocument: "after" },
      );
      return res.redirect("/recyclebin");
    } catch (error) {
      console.log(error);

      return res.redirect("/");
    }
  }

  async restore(req, res) {
    try {
      const id = req.params.id;

      const restoreProduct = await product.findByIdAndUpdate(
        id,
        { isDeleted: false },
        { returnDocument: "after" },
      );
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.redirect("/recyclebin");
    }
  }

  async hardDelete(req, res) {
    try {
      const id = req.params.id;

      const findProduct = await product.findById(id);

      if (!findProduct) {
        console.log("There is no product");

        return res.redirect("/recyclebin");
      }
      if (findProduct.publicImageID?.length > 0) {
        const publicID = findProduct.publicImageID;

        for (const id of publicID) {
          await cloudinary.uploader.destroy(id);
        }
      }

      await product.findByIdAndDelete(id);

      return res.redirect("/recyclebin");
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  }

  async productDetails(req, res) {
    try {
      const id = req.params.id;
      const findProduct = await product.findById(id);

      if (!findProduct) {
        console.log("There is no product");

        return res.redirect("/");
      }

      return res.render("productDetails", {
        title: "Product details",
        data: findProduct,
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  }
}

module.exports = new productController();
