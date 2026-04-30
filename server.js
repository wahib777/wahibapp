import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const r = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "أنت مساعد ذكي شامل. أجب بشكل احترافي: " + req.body.message
                        }]
                    }]
                })
            }
        );

        const data = await r.json();

        res.json({
            reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "خطأ"
        });

    } catch {
        res.json({ reply: "خطأ في الاتصال" });
    }
});

app.listen(3000, () => console.log("Server running"));
