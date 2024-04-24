const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;
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
