import express from "express";
import { pool } from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

// 📍 **** สร้าง API เพื่อใช้ในการเพิ่มข้อมูลหนังเรื่องใหม่ไปที่ Database ตรงนี้ ****

app.post("/movies", async (req, res) =>{
//1)Access ข้อมูลใน body จาก request ด้วย req.body
	const newMovie = {
...req.body,

	}
// 2) เขียน query เพื่อ  insert ข้อมูลโพสด้วย Pool
try {
await pool.query(
'insert into movies ( title, description, genres, year,poster, rating) values ($1, $2, $3, $4, $5, $6)',
[
	
	newMovie.title,
	newMovie.description,
	newMovie.genres,
	newMovie.year,
	newMovie.poster,
	newMovie.rating	
]

)
// 30 Return response กลับไปยัง client ว่าได้ทำการเพิ่มข้อมูลเรียบร้อยแล้ว

return res.status(201).json({message:"Movie has been created."})

}catch (error) {
	return res.status(404).json({message:"error.message"})

}})



app.listen(port, () => {
	console.log(`🚀 Server is running at ${port}`);
});
