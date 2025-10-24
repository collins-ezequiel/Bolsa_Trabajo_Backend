const offerService = require('../services/offersService');

// Crear oferta (EMPRESA)
const createOffer = async (req, res) => {
  try {
    const nuevaOferta = await offerService.createOffer(req.body, req.user.id);
    res.status(201).json(nuevaOferta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Todas las ofertas (cualquier usuario autenticado)
const getAllOffers = async (req, res) => {
  try {
    const ofertas = await offerService.getAllOffers();
    res.json(ofertas);
  } catch (error) {
    console.error("Error obteniendo ofertas:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener oferta por ID
const getOfferById = async (req, res) => {
  try {
    const oferta = await offerService.getOfferById(req.params.id);
    if (!oferta) return res.status(404).json({ error: 'No encontrada' });
    res.json(oferta);
  } catch (error) {
    console.error("Error obteniendo oferta:", error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar oferta
const updateOffer = async (req, res) => {
  try {
    const ofertaActualizada = await offerService.updateOffer(req.params.id, req.body);
    res.json(ofertaActualizada);
  } catch (error) {
    console.error("Error actualizando oferta:", error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar oferta
const deleteOffer = async (req, res) => {
  try {
    await offerService.deleteOffer(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error eliminando oferta:", error);
    res.status(500).json({ error: error.message });
  }
};

const getMyOffers = async (req, res) => {
  try {
    console.log("req.user:", req.user); // para ver si llega el token
    const offers = await prisma.ofertaslaborales.findMany({
      where: { empresa_id: req.user.id },
      include: { postulaciones: true, usuarios: true }
    });
    res.json(offers);
  } catch (err) {
    console.error("Error en getMyOffers:", err); // 🔥 esto sí se verá en Render
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  getMyOffers
};
