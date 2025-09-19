import type { NextApiRequest, NextApiResponse } from "next";

// ฟังก์ชันจำลองการสร้าง QR ของ BCEL
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount } = req.body;

  const merchantId = "669123456789"; // ใส่ Merchant ID ของคุณ
  const merchantName = "My Shop";
  const city = "Vientiane";
  const currency = "418"; // LAK

  // สร้าง QR string สำหรับ BCEL (แบบตัวอย่าง)
  const qrString = `00020101021126640014A0052662846625770108${merchantId}5303${currency}54${amount.toFixed(
    2
  )}59${merchantName}60${city}6304B13F`;

  res.status(200).json({ qr: qrString });
}
