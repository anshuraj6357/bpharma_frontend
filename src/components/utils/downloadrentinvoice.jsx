import jsPDF from "jspdf";
import companyLogo from "../../assets/logo.png";
import companyStamp from "../../assets/company-stamp.png";
import directorSignature from "../../assets/director-anshu-sign.png";

/* ---------- SAFE VALUE ---------- */
const safe = (val) => (val === undefined || val === null || val === "" ? "-" : String(val));

export default function downloadPaymentInvoice({
    paymentId,
    tenantName,
    email,
    branchName,
    roomNumber,
    amountpaid,
    walletused,
    totalAmount,
    mode,
    paymentStatus,
    razorpay_payment_id,
    razorpay_order_id,
    paymentInMonth,
    createdAt,
}) {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString("en-IN") : "-";
    const formattedTime = createdAt ? new Date(createdAt).toLocaleTimeString("en-IN") : "-";

    /* ---------- WATERMARK ---------- */
    doc.setFontSize(80);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#cccccc");
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.text("ROOMGI", pageWidth / 2, pageHeight / 2 + 20, {
        align: "center",
        angle: 45,
    });
    doc.setGState(new doc.GState({ opacity: 1 }));

    /* ---------- LOGO ---------- */
    doc.addImage(companyLogo, "PNG", pageWidth / 2 - 20, 10, 40, 18);

    /* ---------- HEADER ---------- */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor("#111827");
    doc.text("Payment Invoice", pageWidth / 2, 36, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#6b7280");
    doc.text("Roomgi Pvt. Ltd. | support@roomgi.com", pageWidth / 2, 42, { align: "center" });

    doc.setDrawColor("#e5e7eb");
    doc.line(margin, 46, pageWidth - margin, 46);

    /* ---------- TENANT DETAILS ---------- */
    let y = 50;
    const sectionHeight = 42;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, sectionHeight, 3, 3, "F");

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.setTextColor("#111827");
    doc.text("Tenant & Property Details", margin + 5, y + 8);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text("Tenant:", margin + 5, y + 18);
    doc.text(safe(tenantName), margin + 50, y + 18);

    doc.text("Email:", margin + 5, y + 26);
    doc.text(safe(email), margin + 50, y + 26);

    doc.text("Branch:", margin + 5, y + 34);
    doc.text(`${safe(branchName)} | Room ${safe(roomNumber)}`, margin + 50, y + 34);

    /* ---------- PAYMENT SUMMARY ---------- */
    y += sectionHeight + 6;
    const paymentHeight = 44;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, paymentHeight, 3, 3, "F");

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Payment Summary", margin + 5, y + 8);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text("Amount Paid:", margin + 5, y + 18);
    doc.text(`INR ${safe(amountpaid)}`, pageWidth - margin - 5, y + 18, { align: "right" });

    doc.text("Wallet Used:", margin + 5, y + 26);
    doc.text(`INR ${safe(walletused)}`, pageWidth - margin - 5, y + 26, { align: "right" });

    doc.text("Total Amount:", margin + 5, y + 34);
    doc.text(`INR ${safe(totalAmount)}`, pageWidth - margin - 5, y + 34, { align: "right" });

    /* ---------- TRANSACTION DETAILS ---------- */
    y += paymentHeight + 6;
    const txnHeight = 44;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, txnHeight, 3, 3, "F");

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Transaction Details", margin + 5, y + 8);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    doc.text("Payment Mode:", margin + 5, y + 18);
    doc.text(safe(mode).toUpperCase(), margin + 45, y + 18);

    doc.text("Payment Status:", margin + 5, y + 26);
    doc.text(safe(paymentStatus).toUpperCase(), margin + 45, y + 26);

    doc.text("Payment Month:", margin + 5, y + 34);
    doc.text(safe(paymentInMonth), margin + 45, y + 34);

    /* ---------- IDS ---------- */
    y += txnHeight + 6;
    doc.setFontSize(9);
    doc.setTextColor("#111827");
    doc.text(`Razorpay Payment ID: ${safe(razorpay_payment_id)}`, margin + 5, y);
    doc.text(`Razorpay Order ID: ${safe(razorpay_order_id)}`, margin + 5, y + 6);

    /* ---------- COMPANY STAMP ---------- */
    doc.addImage(companyStamp, "PNG", margin + 5, 230, 35, 35);

    /* ---------- DIRECTOR SIGNATURE ---------- */
    doc.addImage(directorSignature, "PNG", pageWidth - 65, 240, 50, 20);
    doc.setFontSize(9);
    doc.setTextColor("#111827");
    doc.text("Authorized Signature", pageWidth - 58, 274);

    /* ---------- FOOTER ---------- */
    doc.setDrawColor("#e5e7eb");
    doc.line(margin, 270, pageWidth - margin, 270);

    doc.setFontSize(9);
    doc.setTextColor("#6b7280");
    doc.text(`Generated on ${formattedDate} at ${formattedTime}`, margin, 276);

    doc.text("This is a system-generated invoice. No signature required.", pageWidth - margin, 276, { align: "right" });

    /* ---------- SAVE ---------- */
    doc.save(`Payment-Invoice-${safe(paymentId)}.pdf`);
}
