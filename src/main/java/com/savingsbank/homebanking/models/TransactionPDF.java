package com.savingsbank.homebanking.models;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.savingsbank.homebanking.dtos.TransactionDTO;

import java.io.IOException;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;


public class TransactionPDF {
    private LocalDateTime localDateTime;
    private Account account;
    private List<Transaction> listTransactions;
    private static final String LOGO_PATH = "C:/Users/harme/OneDrive/Escritorio/MindHub/homebankingSavingsBank/src/main/resources/static/web/assets/images/Logo.png";

    DecimalFormat currencyFormatter = (DecimalFormat) NumberFormat.getCurrencyInstance(Locale.US);
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    private Image getLogoImage() throws IOException, BadElementException {
        return Image.getInstance(LOGO_PATH);
    }

    public TransactionPDF(List<Transaction> listTransactions, Account account) {
        this.listTransactions = listTransactions;
        this.account = account;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

        cell.setPhrase(new Phrase("Date", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Transaction Type", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Description", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Amount", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (Transaction transaction : listTransactions) {
            table.addCell(createCell(transaction.getDate().format(dateFormatter)));
            table.addCell(createCell(String.valueOf(transaction.getType())));
            table.addCell(createCell(transaction.getDescription()));
            table.addCell(createCell(currencyFormatter.format(transaction.getAmount())));
        }

        PdfPCell emptyRowCell1 = new PdfPCell(new Phrase(""));
        emptyRowCell1.setColspan(2);
        emptyRowCell1.setBorder(Rectangle.NO_BORDER);
        table.addCell(emptyRowCell1);

        PdfPCell totalLabelCell = new PdfPCell(new Phrase("Total Balance (US$)",FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12)));
        totalLabelCell.setBorder(Rectangle.NO_BORDER);
        totalLabelCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        totalLabelCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(totalLabelCell);

        PdfPCell totalAmountCell = new PdfPCell(new Phrase(currencyFormatter.format(account.getBalance()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.BOLD)));
        totalAmountCell.setBorder(Rectangle.NO_BORDER);
        totalAmountCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        totalAmountCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(totalAmountCell);
    }

    private PdfPCell createCell(String content) {
        PdfPCell cell = new PdfPCell(new Phrase(content));

        // Establecer el padding para todas las celdas
        cell.setPadding(5);

        // Configurar la alineación del texto en el centro
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

        return cell;
    }
    public void usePDFExport(OutputStream outputStream) throws DocumentException, IOException {
        Document doc = new Document(PageSize.A4);
        PdfWriter.getInstance(doc, outputStream);
        doc.open();

        // Estilos de fuentes
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        Font detailsFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        Image logoImage = getLogoImage();
        logoImage.scaleAbsolute(200f, 150f);
        doc.add(logoImage);

        // Título
        Paragraph title = new Paragraph("Transactions list", titleFont);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        title.setSpacingAfter(10);
        doc.add(title);

        Paragraph accountInfo = new Paragraph("Account information", headerFont);
        accountInfo.setAlignment(Paragraph.ALIGN_LEFT);
        doc.add(accountInfo);

        doc.add(new Paragraph("Account number: " + account.getNumber(), detailsFont));
        doc.add(new Paragraph("Balance: " + account.getBalance(), detailsFont));

        String creationDate = account.getCreationDate().format(dateFormatter);
        doc.add(new Paragraph("Creation Date: " + creationDate, detailsFont));


        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setSpacingBefore(10);

        // Encabezado de la tabla
        writeTableHeader(table);

        // Contenido de la tabla
        writeTableData(table);

        doc.add(table);
        doc.close();
    }
}
