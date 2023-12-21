package com.savingsbank.homebanking.dtos;

import com.savingsbank.homebanking.models.Transaction;
import com.savingsbank.homebanking.models.TransactionType;

import java.time.LocalDateTime;

public class TransactionDTO {
    private String id;
    private TransactionType type;

    private double amount;

    private String description;

    private LocalDateTime date;

    private double currentBalance;

    private  boolean active;

    public TransactionDTO() {
    }

    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.type = transaction.getType();
        this.amount = transaction.getAmount();
        this.description = transaction.getDescription();
        this.date = transaction.getDate();
        this.currentBalance = transaction.getCurrentBalance();
        this.active = transaction.getActive();
    }

    public String getId() {
        return id;
    }

    public TransactionType getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }
    public boolean getActive() {
        return active;
    }
}

