package com.savingsbank.homebanking.dtos;

public record LoanApplicationDTO(long loanId, double amount, int payments, String destinationAccount) {
}
