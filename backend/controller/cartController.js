import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });
    return res
      .status(200)
      .json({ message: "Item added to cart successfully", cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let cartData = userData.cartData || {};

    return res.status(200).json({ cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    // 1. Fetch the user
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {};

    // 3. Logic to handle the update
    if (quantity > 0) {
      // Ensure the itemId object exists before setting the size
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    } else {
      // If quantity is 0 or less, remove the size entry
      if (cartData[itemId]) {
        delete cartData[itemId][size];

        // If no sizes are left for this item, remove the item entirely
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    // 4. Save the updated cart
    // Using findByIdAndUpdate with { cartData } or simply userData.save()
    // Note: Mongoose sometimes needs "markModified" for nested objects
    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
