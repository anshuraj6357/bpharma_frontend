import jsPDF from "jspdf";
import companyLogo from "../../assets/logofinal.webp";
import companyStamp from "../../assets/company-stamp.png";
import directorSignature from "../../assets/director-anshu-sign.png";

/* ---------- SAFE VALUE ---------- */
const safe = (val) =>
    val === undefined || val === null || val === "" ? "-" : String(val);

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
    const margin = 18;
    let y = 22;

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString("en-IN")
        : "-";
    const formattedTime = createdAt
        ? new Date(createdAt).toLocaleTimeString("en-IN")
        : "-";

    /* ======================
       🔖 STAMP WATERMARK (DARKER)
    ====================== */
    if (doc.setGState) {
        doc.setGState(new doc.GState({ opacity: 0.14 }));
    }
    doc.addImage(
        companyStamp,
        "PNG",
        pageWidth / 2 - 48,
        pageHeight / 2 - 48,
        96,
        96
    );
    if (doc.setGState) {
        doc.setGState(new doc.GState({ opacity: 1 }));
    }

    /* ======================
       TEXT WATERMARK
    ====================== */
    doc.setFontSize(72);
    doc.setTextColor(230);
    doc.text("ROOMGI", pageWidth / 2, pageHeight / 2 + 58, {
        align: "center",
        angle: 45,
    });
    doc.setTextColor(0);

    /* ======================
       HEADER
    ====================== */
    doc.addImage(companyLogo, "PNG", margin, y - 6, 36, 16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("ROOMGI PRIVATE LIMITED", pageWidth / 2, y, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("PAYMENT RECEIPT", pageWidth / 2, y + 6, { align: "center" });

    doc.line(margin, y + 11, pageWidth - margin, y + 11);
    y += 22;

    /* ======================
       RECEIPT META
    ====================== */
    doc.setFontSize(9);
    doc.text(`Receipt No: ${safe(paymentId)}`, margin, y);
    doc.text(`Date: ${formattedDate}`, pageWidth - margin, y, { align: "right" });
    y += 6;
    doc.text(`Time: ${formattedTime}`, pageWidth - margin, y, { align: "right" });

    y += 12;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    /* ======================
       ROW HELPER
    ====================== */
    const row = (label, value) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, margin, y);
        doc.setFont("helvetica", "normal");
        doc.text(value, pageWidth - margin, y, { align: "right" });
        y += 8;
    };

    /* ======================
       TENANT DETAILS
    ====================== */
    row("Tenant Name", safe(tenantName));
    row("Email ID", safe(email));
    row("Branch / Room", `${safe(branchName)} - Room ${safe(roomNumber)}`);

    y += 6;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    /* ======================
       PAYMENT DETAILS
    ====================== */
    row("Payment Mode", safe(mode).toUpperCase());
    row("Payment Status", safe(paymentStatus).toUpperCase());
    row("Payment Month", safe(paymentInMonth));

    y += 6;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    /* ======================
       AMOUNT DETAILS
    ====================== */
    row("Amount Paid (INR)", `INR ${safe(amountpaid)}`);
    row("Wallet Used (INR)", `INR ${safe(walletused)}`);
    row("Total Amount (INR)", `INR ${safe(totalAmount)}`);

    y += 6;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    /* ======================
       TRANSACTION IDS
    ====================== */
    row("Razorpay Payment ID", safe(razorpay_payment_id));
    row("Razorpay Order ID", safe(razorpay_order_id));

    y += 22;

    /* ======================
       AUTHORIZATION
    ====================== */
    doc.addImage(directorSignature, "PNG", pageWidth - 72, y, 48, 18);

    doc.setFont("helvetica", "bold");
    doc.text("Anshu Raj", pageWidth - 48, y + 22);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signatory", pageWidth - 58, y + 28);

    y += 42;

    /* ======================
       FOOTER
    ====================== */
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
        "This is a system-generated receipt and does not require physical signature.",
        pageWidth / 2,
        y,
        { align: "center" }
    );

    /* ======================
       SAVE
    ====================== */
    doc.save(`Payment-Receipt-${safe(paymentId)}.pdf`);
}
