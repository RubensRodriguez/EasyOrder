import User from "../models/User.js";

export const addProduct = async (req, res) => {
  try {
    const {
      id: supplierId,
      productName,
      productPrice,
      productCategory,
      productMeasure,
      productDescription,
      user,
    } = req.body;
    const existingUser = await User.findById(user._id);

    if (existingUser) {
      const existingSupplier = existingUser.suppliers.id(supplierId);
      if (existingSupplier) {
        const newProduct = {
          productName: productName,
          productPrice: productPrice,
          productCategory: productCategory,
          productMeasure: productMeasure,
          productDescription: productDescription,
        };
        existingSupplier.products.push(newProduct);
        await existingUser.save();
        const userWithoutPassword = {
          ...existingUser.toObject(),
          password: undefined,
        };
        return res.status(200).json({ user: userWithoutPassword });
      }
    }
    res.status(404).json({ error: "Supplier not found" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
  } catch (err) {}
};

export const removeProduct = async (req, res) => {
  try {
    const { id, user, productId } = req.body;
    const existingUser = await User.findById(user._id);
    if (existingUser) {
      const existingSupplier = existingUser.suppliers.id(supplierId);
      if (existingSupplier) {
        const existingProduct = existingSupplier.products.id(productId);
        if (existingProduct) {
          await existingProduct.remove();
          const userWithoutPassword = {
            ...existingUser.toObject(),
            password: undefined,
          };
          return res.status(200).json({ user: userWithoutPassword });
        }
      }
    }
    res.status(404).json({ error: "Product not found" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProdut = async (req, res) => {
  try {
    const { productId, id, user, updatedProduct } = req.body;
    const existingUser = await User.findById(user._id);
    if (existingUser) {
      const existingSupplier = existingUser.suppliers.id(id);
      if (existingSupplier) {
        const existingProduct = existingSupplier.products.id(productId);
        if (existingProduct) {
          existingProduct.set(updatedProduct);
          await existingUser.save();
          const userWithoutPassword = {
            ...existingUser.toObject(),
            password: undefined,
          };
          return res.status(200).json({ user: userWithoutPassword });
        }
      }
    }
    res.status(404).json({ error: "Product not found"})
  } catch (err) {
    res.status(500).json(err);
  }
};
