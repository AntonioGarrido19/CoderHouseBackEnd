import { Router } from "express";
import { productsMongo } from "../dao/managers/products/ProductsMongo.js";
import { cartsModel } from "../db/models/carts-model.js";
//import { jwtValidation } from '../middlewares/jwt.middleware.js';

const router = Router();

//router.use(jwtValidation)

router.get("/products", async (req, res) => {
  try {
    const products = await productsMongo.findAll(req.query);
    const payloadArray = products.info.payload;
    const payloadArrayMap = payloadArray.map((e) => ({
      _id: e._id,
      title: e.title,
      description: e.description,
      price: e.price,
      thumbnail: e.thumbnail,
      code: e.code,
      stock: e.stock,
    }));

    console.log('Payload Array:', payloadArray);
    //const username = req.user.username;
    //console.log('username', username);
   
    res.render("home", { payloadArrayMap}); //username
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/product-view/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productsMongo.findById(id);
        console.log(product);
        if (!product) {
            return res.status(400).json({ message: 'Invalid ID' });
        } else {
            res.render("productView", product)
            };
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    
    const cart = await cartsModel.findById(cid).populate("products.id").lean()
    console.log(cart);
    res.render("cart", { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar el carrito" });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
      if (err) {
          console.error('Error destroying session:', err);
      }
      // Redirect the user to the login page
      res.redirect('/api/views/login');
  });
});


export default router;
