import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
// Update the import path if necessary, or create the file if missing
import { TyreModel } from "./models/TyreInputSchema";
import { TyreMcModel } from "./models/TyreInMcSchema";
// import { tyreDemoData } from "./src/data/tyreDemoData";

dotenv.config();
const app = express();
app.use("/api/auth", authRoutes);

app.use(
  cors({
    origin: ["https://tyre-reco.vercel.app", "http://localhost:5173"], // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies / authentication
  })
);
app.use(express.json());
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// MC Create Tyre
app.post("/mc-tyres", async (req, res) => {
  try {
    const tyre = new TyreMcModel(req.body);
    await tyre.save();
    res.json({ message: "Tyre data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tyre data" });
  }
});

// MTC Create Tyre
app.post("/tyres", async (req, res) => {
  try {
    const tyre = new TyreModel(req.body);
    await tyre.save();
    res.json({ message: "Tyre data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tyre data" });
  }
});

// app.post("/insert-demo", async (req, res) => {
//   try {
//     // पहले पुराने data को हटा देते हैं (optional)
//     await TyreMcModel.deleteMany({});

//     // फिर demo data insert करते हैं
//     await TyreMcModel.insertMany(tyreDemoData);

//     res
//       .status(201)
//       .json({ message: "Demo data inserted successfully", data: tyreDemoData });
//   } catch (error) {
//     console.error("Error inserting demo data:", error);
//     res.status(500).json({ message: "Error inserting data", error });
//   }
// });

// Mc Get Tyres
app.get("/mc-tyreData", async (req, res) => {
  try {
    const tyres = await TyreMcModel.find();
    res.json(tyres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tyre data" });
  }
});

// Mtc Get Tyres
app.get("/tyreData", async (req, res) => {
  try {
    const tyres = await TyreModel.find();
    res.json(tyres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tyre data" });
  }
});

//Mtc Edit tyre
// app.put("/tyres/:id", async (req, res) => {
//   const updated = await TyreModel.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   console.log(req.params.id);

//   res.json(updated);
// });

//Mtc edit page data fetch
app.get("/mtctyres/:id", async (req, res) => {
  const tyre = await TyreModel.findById(req.params.id);
  res.json(tyre);
});

//Mtc Update Tyre by ID
app.put("/mtctyres/:id", async (req, res) => {
  try {
    const updated = await TyreModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Tyre not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

//mtc Delete tyre
app.delete("/mtctyres/:id", async (req, res) => {
  await TyreModel.findByIdAndDelete(req.params.id);
  // console.log(req.params.id);

  res.json({ message: "Deleted Successfully" });
});

//Mc edit page data fetch
app.get("/mctyres/:id", async (req, res) => {
  const tyre = await TyreMcModel.findById(req.params.id);
  res.json(tyre);
});

//Mc Update Tyre by ID
app.put("/mctyres/:id", async (req, res) => {
  try {
    const updated = await TyreMcModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Tyre not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

//mc Delete tyre
app.delete("/mctyres/:id", async (req, res) => {
  await TyreMcModel.findByIdAndDelete(req.params.id);
  // console.log(req.params.id);

  res.json({ message: "Deleted Successfully" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
