package com.savingsbank.homebanking.models;


import jakarta.persistence.*;

@Entity
public class ClientLoan {
    @Id
    @GeneratedValue( strategy = GenerationType.UUID)
    private Long id;
    private double amount;
    private int payments;
    private Double currentAmount;
    private int currentPayments;
    @ManyToOne(fetch = FetchType.EAGER)
    private Client client;
    @ManyToOne(fetch = FetchType.EAGER)
    private Loan loan;

    public ClientLoan() {
    }

    public ClientLoan(double amount, int payments, Double currentAmount, int currentPayments) {
        this.amount = amount;
        this.payments = payments;
        this.currentAmount = currentAmount;
        this.currentPayments = currentPayments;
    }

    public Long getId() {
        return id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getPayments() {
        return payments;
    }

    public void setPayments(int payments) {
        this.payments = payments;
    }

    public Double getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Double currentAmount) {
        this.currentAmount = currentAmount;
    }

    public int getCurrentPayments() {
        return currentPayments;
    }

    public void setCurrentPayments(int currentPayments) {
        this.currentPayments = currentPayments;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }

    @Override
    public String toString() {
        return "ClientLoan{" +
                "id=" + id +
                ", amount=" + amount +
                ", payments=" + payments +
                '}';
    }
}
