const Cart = require("../models/cart.model")
const Product = require("../models/product.model")

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }]
      })
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      )

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 })
      }
    }

    await cart.save()

    res.status(200).json({ message: "Product added to cart", cart })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const getMyCart = async (req, res) => {
  try {
    const userId = req.user.id

    const cart = await Cart.findOne({ user: userId })
    .populate("items.product")

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        items: [],
        subtotal: 0
      })
    }
    let subtotal = 0

    const items = cart.items.map((item) => {
      const itemTotal = item.product.price * item.quantity
      subtotal += itemTotal

      return {
        product: item.product,
        quantity: item.quantity,
        itemTotal
      }
    })

    res.status(200).json(
      items,
      subtotal)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity } = req.body

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" })
    }

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(200).json({ items: [] })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    )

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" })
    }

    // quantity == 0 → remove item
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()

    res.status(200).json({
      message: "Cart updated",
      cart
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeItem = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.params

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(200).json({ items: [] })
    }

    const initialLength = cart.items.length

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    )

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Product not in cart" })
    }

    await cart.save()

    res.status(200).json({
      message: "Item removed from cart",
      cart
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addToCart,
  getMyCart,
  updateQuantity,
  removeItem
}

