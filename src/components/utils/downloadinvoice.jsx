// BookingInvoice.js
import jsPDF from "jspdf";
import companyLogo from "../../assets/logo.png";

export const downloadInvoice = ({ branchName, roomNumber, amount, bookingId }) => {
  const doc = new jsPDF();
  const PRIMARY = "#2563eb";
  const TEXT = "#111827";
  const MUTED = "#6b7280";
  const LINE = "#e5e7eb";
  const pageWidth = doc.internal.pageSize.getWidth();
  const formattedAmount = amount.toLocaleString("en-IN");
  const formattedDate = new Date().toLocaleDateString("en-IN");

  // Logo top-center
  const logoWidth = 40;
  const logoHeight = 20;
  const logoX = (pageWidth - logoWidth) / 2;
  doc.addImage(companyLogo, "PNG", logoX, 15, logoWidth, logoHeight);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(PRIMARY);
  doc.text(" Booking Invoice", pageWidth / 2, 45, { align: "center" });

  // Company Info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(MUTED);
  doc.text("Roomgi Pvt. Ltd.", pageWidth / 2, 52, { align: "center" });
  doc.text("support@roomgi.com", pageWidth / 2, 58, { align: "center" });

  // Divider
  doc.setDrawColor(LINE);
  doc.setLineWidth(0.5);
  doc.line(20, 63, pageWidth - 20, 63);

  // Booking Details
  const bookingBoxY = 68;
  doc.setFillColor(243, 244, 246);
  doc.rect(20, bookingBoxY, pageWidth - 40, 50, "F");

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.setTextColor(TEXT);
  doc.text("Booking Details", 25, bookingBoxY + 10);

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text("PG Name:", 25, bookingBoxY + 22);
  doc.text(branchName, 65, bookingBoxY + 22);
  doc.text("Room Number:", 25, bookingBoxY + 32);
  doc.text(roomNumber, 65, bookingBoxY + 32);
  doc.text("Booking ID:", 25, bookingBoxY + 42);
  doc.text(bookingId, 65, bookingBoxY + 42);

  // Divider line
  doc.setDrawColor(LINE);
  doc.setLineWidth(0.5);
  doc.line(20, bookingBoxY + 55, pageWidth - 20, bookingBoxY + 55);

  // Payment Summary
  const paymentBoxY = bookingBoxY + 60;
  doc.setFillColor(254, 243, 199);
  doc.rect(20, paymentBoxY, pageWidth - 40, 55, "F");

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.setTextColor(TEXT);
  doc.text("Payment Summary", 25, paymentBoxY + 10);

  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text("Room Charges:", 25, paymentBoxY + 22);
  doc.setTextColor(PRIMARY);
  doc.text(`INR ${formattedAmount}`, pageWidth - 30, paymentBoxY + 22, { align: "right" });

  doc.setDrawColor(LINE);
  doc.setLineWidth(0.5);
  doc.line(20, paymentBoxY + 28, pageWidth - 20, paymentBoxY + 28);

  doc.setFontSize(13);
  doc.setFont(undefined, "bold");
  doc.setTextColor(PRIMARY);
  doc.text("Total Paid:", 25, paymentBoxY + 40);
  doc.text(`INR ${formattedAmount}`, pageWidth - 30, paymentBoxY + 40, { align: "right" });

  // Footer / Signature
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.setTextColor(TEXT);
  doc.text("Authorized Signature: ___________________", pageWidth - 80, paymentBoxY + 70);
  doc.setTextColor(MUTED);
  doc.text("This is a system-generated invoice.", 20, paymentBoxY + 85);
  doc.text("Thank you for choosing Roomgi. We wish you a pleasant stay!", 20, paymentBoxY + 92);

  doc.save(`Invoice-${bookingId}.pdf`);
};
