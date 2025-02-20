import fs from "fs";
import path from "path";

// تحديد مسار قاعدة البيانات
const filePath = path.join(process.cwd(), "db.json");

export async function POST(req) {
  const body = await req.json();
  const { email, verifyCode } = body;

  if (!email || !verifyCode) {
    return new Response(JSON.stringify({ message: "Email and verification code are required" }), {
      status: 400,
    });
  }

  // قراءة البيانات من db.json
  const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // البحث عن المستخدم
  const userIndex = db.users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const user = db.users[userIndex];

  // التحقق من الكود
  if (user.verifyCode !== verifyCode) {
    return new Response(JSON.stringify({ message: "Invalid verification code" }), {
      status: 401,
    });
  }

  // تحديث حالة التحقق
  db.users[userIndex].verified = true;

  // تحديث db.json
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

  return new Response(
    JSON.stringify({ message: "Account verified successfully", user: db.users[userIndex] }),
    { status: 200 }
  );
}
