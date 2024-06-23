const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.get("/", async (req, res) => {
  const image = req.query.url;
  try {
    const _nc_ht = req.query._nc_ht;
    const _nc_cat = req.query._nc_cat;
    const _nc_ohc = req.query._nc_ohc;
    const edm = req.query.edm;
    const ccb = req.query.ccb;
    const oh = req.query.oh;
    const oe = req.query.oe;
    const _nc_sid = req.query._nc_sid;

    if (image) {
      const imageUrl = `${image}?_nc_ht=${_nc_ht}&_nc_cat=${_nc_cat}&_nc_ohc=${_nc_ohc}&edm=${edm}&ccb=${ccb}&oh=${oh}&oe=${oe}&_nc_sid=${_nc_sid}`;
      const imageBuffer = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      res.set("Content-Type", "image/jpeg");
      streamifier.createReadStream(imageBuffer.data).pipe(res);
    } else {
      res.status(400).json({ message: "Image URL is required" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/image/", async (req, res) => {
  const image = req.query.img;
  try {
    if (image) {
      const imageBuffer = await axios.get(image, {
        responseType: "arraybuffer",
      });

      res.set("content-type", "image/jpeg");
      res.send(imageBuffer.data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
