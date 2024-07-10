const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;
const streamifier = require("streamifier");

app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const image = req.body.img;
  try {
    if (image) {
      const imageUrl = `${image}`;
      const imageBuffer = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      res.set("Content-Type", "image/jpeg");
      streamifier.createReadStream(imageBuffer.data).pipe(res);
    } else {
      res.status(400).json({ message: "Image URL is required" });
    }
  } catch (error) {
    console.log(error);
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
