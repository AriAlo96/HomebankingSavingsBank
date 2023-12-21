package com.savingsbank.homebanking.dtos;

import com.savingsbank.homebanking.models.Loan;

import java.util.List;

public class LoanDTO {
    private String id;
    private String name;
    private Double maxAmount;
    private List<Integer> payments;
    private Double interestPercentage;

    public LoanDTO(Loan loan) {
        this.id = loan.getId();
        this.name = loan.getName();
        this.maxAmount = loan.getMaxAmount();
        this.payments =  loan.getPayments();
        this.interestPercentage = loan.getInterestPercentage();

    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getMaxAmount() {
        return maxAmount;
    }

    public List<Integer> getPayments() {
        return payments;
    }

    public Double getInterestPercentage() {
        return interestPercentage;
    }
}
