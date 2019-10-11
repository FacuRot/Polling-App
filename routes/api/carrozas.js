const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Carroza = require("../../models/Carroza");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   POST api/carrozas
// @desc    crear carroza
// @access  private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Ingrese un nombre para la carroza")
        .not()
        .isEmpty(),
      check("curso", "Ingrese el curso al que pertenece la carroza")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, curso } = req.body;

      const user = await User.findById(req.user.id);

      if (!user.isAdmin) {
        return res.status(401).json({
          errors: [{ msg: "No tienes autorizacion para hacer esto" }]
        });
      }

      let carroza = await Carroza.findOne({ name });
      if (carroza) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Ya existe una carroza con ese nombre" }] });
      }

      carroza = new Carroza({
        name,
        curso
      });

      await carroza.save();

      res.status(200).send("Success");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/carrozas
// @desc    obtener todas las carrozas
// @access  private
router.get("/", auth, async (req, res) => {
  try {
    const carrozas = await Carroza.find().select("-votos");

    res.status(200).json(carrozas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/carrozas/votar
// @desc    añadir un voto a un carroza
// @access  private
router.post("/votar", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (user.voto) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No puedes votar mas de una vez" }] });
    }

    const current = new Date();
    const sabado = new Date("2019-10-19T20:00:00");
    const domingo = new Date("2019-10-20T18:00:00");
    if (current < sabado || current > domingo) {
      return res.status(400).json({
        errors: [
          {
            msg:
              "La votación estara disponible desde el sabado 19 a las 20hs hasta el domingo 20 a las 18hs"
          }
        ]
      });
    }

    let carroza = await Carroza.updateOne(
      { _id: req.body.id },
      { $inc: { votos: 1 } }
    );

    if (!carroza) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No se encontró la carroza" }] });
    }

    user.voto = true;
    await user.save();

    res.status(200).send("Success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/carrozas/votos
// @desc    obtener el total de los votos
// @access  private
router.get("/votos", auth, async (req, res) => {
  try {
    const carrozas = await Carroza.find();

    let votos = 0;
    carrozas.forEach(carroza => {
      votos += carroza.votos;
    });

    res.status(200).json(votos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/carrozas/resultados
// @desc    obtener la lista de carrozas con los resultados
// @access  private
router.get("/resultados", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ errors: [{ msg: "No tienes permiso para hacer esto" }] });
    }

    const carrozas = await Carroza.find().sort({ votos: -1 });
    return res.status(200).json(carrozas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
