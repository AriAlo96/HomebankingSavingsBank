package com.savingsbank.homebanking.dtos;

import com.savingsbank.homebanking.models.ClientLoan;

public class ClientLoanDTO {
    private String id;
    private String loanId;
    private String loanName;
    private double loanAmount;
    private int loanPayments;
    private  Double currentAmount;
    private int currentPayments;
    public ClientLoanDTO() {
    }

    public ClientLoanDTO(ClientLoan clientLoan) {
        this.id = clientLoan.getId();
        this.loanId = clientLoan.getLoan().getId();
        this.loanName = clientLoan.getLoan().getName();
        this.loanAmount = clientLoan.getAmount();
        this.loanPayments = clientLoan.getPayments();
        this.currentAmount = clientLoan.getCurrentAmount();
        this.currentPayments = clientLoan.getCurrentPayments();
    }

    public String getId() {
        return id;
    }
    public String getLoanId() {
        return loanId;
    }

    public String getLoanName() {
        return loanName;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public int getLoanPayments() {
        return loanPayments;
    }

    public Double getCurrentAmount() {
        return currentAmount;
    }

    public int getCurrentPayments() {
        return currentPayments;
    }
}
