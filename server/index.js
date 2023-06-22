/* IMPORTO TUTTI I MODULI UTILI*/

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { registerUser, loginUser } from "./controllers/user.js";
import User from "./models/User.js";
import { addSupplier, removeSupplier, updateSupplier } from "./controllers/supplier.js"
import { addProduct } from "./controllers/product.js"

/* La prima costante contiene il path del modulo corrente e la seconda il path della directory corrente, questo può essere utile per lavorare in modo più ordinato con le directories */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Carica tutte le variabili dell'environment dal file .env che creeremo */
dotenv.config();

/* La costante "app" rappresenta il nostro http server */
const app = express();

/* Configura il middleware "express.json" che formatta tutte le richieste fatte al server come json e le rende disponibili nell'oggetto "req.body" */
app.use(express.json());

/* Mette helmet a disposizione del nostro http server "app" fornendo una libreria di moduli di sicurezza da alcune vulnerabilità */
app.use(helmet());

/* Imposta l'http header "cross-origin" che permette al browser che manda richiesta di poter caricare tutte le risorse che noi carichiamo da altri domini */
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* Crea dei logs per ogni richiesta e risposta del server, "common" è uno stile pre-configurato di formattazione del log */
app.use(morgan("common"));

/* bodyParser formatterà sia i body delle richieste in formato json che in formato url rendendole accessibili dall'oggetto "req.body" in un formato molto più conveniente */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* attivando il CORS Cross-Origin Resource Sharing potrò ricevere richieste da dei domini diversi dal dominio che ospista il mio node server */
app.use(cors());

/* se viene fatta una richiesta per un file statico il middleware "express.static" lo riconosce e poi controlla se l'asset è presente nella directory specificata, se è presente risponde con l'immagine richiesta */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */

/* crea la funzione upload dal modulo multer che permette di salvare richieste http di upload immagini e imposta la destinazione e poi il nome del file */

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

/* SETUP MONGOOSE */

/* connette al server mongodb che abbiamo creato e utilizza la porta impostata nel file .env o la porta 6001
gli argument passati a mongoose.connect sono uno per utilizzare un urlparser migliore e un motore di monitoraggio migliore*/

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("${err} did not connect"));

/* ROUTES */

/** definiamo le route della nostra app */

app.post("/api/register", registerUser);

app.post("/api/login", loginUser);

app.post("/api/supplier/add", addSupplier)

app.post("/api/supplier/remove", removeSupplier);

app.post("/api/product/add", addProduct)

app.post("/api/supplier/modify", updateSupplier);