import User from "../models/User.js";

export const addSupplier = async (req, res) => {
  try {
    const { supplierName, supplierEmail, supplierPhoneNumber, user } = req.body;
    const existingUser = await User.findById(user._id);

    if (existingUser) {
      const isSupplierNameExists = existingUser.suppliers.some(
        (supplier) => supplier.supplierName === supplierName
      );

      const isSupplierEmailExists = existingUser.suppliers.some(
        (supplier) => supplier.supplierEmail === supplierEmail
      );

      const isSupplierPhoneNumberExists = existingUser.suppliers.some(
        (supplier) => supplier.supplierPhoneNumber === supplierPhoneNumber
      );

      if (
        isSupplierNameExists ||
        isSupplierEmailExists ||
        isSupplierPhoneNumberExists
      ) {
        return res.status(400).json({ message: "Supplier already exists." });
      }
      const newSupplier = {
        supplierName: supplierName,
        supplierEmail: supplierEmail,
        supplierPhoneNumber: supplierPhoneNumber,
        products: [],
      };
      existingUser.suppliers.push(newSupplier);
      await existingUser.save();
      const userWithoutPassword = {
        ...existingUser.toObject(),
        password: undefined,
      };
      return res.status(200).json({ user: userWithoutPassword });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeSupplier = async (req, res) => {
  try {
    const { id, user } = req.body;

    const existingUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { suppliers: { _id: id } } },
      { new: true }
    ); 

    if (existingUser) {
      const userWithoutPassword = {
        ...existingUser.toObject(),
        password: undefined,
      };
      return res.status(200).json({ user: userWithoutPassword });
    } else {
      res
        .status(500)
        .json({ message: "Errore durante la rimozione del fornitore" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Errore durante la rimozione del fornitore" });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { supplierName, supplierEmail, supplierPhoneNumber, user, id } =
      req.body;
    const existingUser = await User.findById(user._id);

    if (existingUser) {
      const supplierToUpdate = existingUser.suppliers.id(id);

      if (!supplierToUpdate) {
        return res.status(404).json({ message: "Supplier not found." });
      }

      // Update the desired fields of the supplier document
      supplierToUpdate.supplierName = supplierName;
      supplierToUpdate.supplierEmail = supplierEmail;
      supplierToUpdate.supplierPhoneNumber = supplierPhoneNumber;

      await existingUser.save();
      const userWithoutPassword = {
        ...existingUser.toObject(),
        password: undefined,
      };
      return res.status(200).json({ user: userWithoutPassword });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
