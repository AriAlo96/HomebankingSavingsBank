package com.savingsbank.homebanking.dtos;

public record LoanApplicationDTO(String loanId, double amount, int payments, String destinationAccount) {
}
