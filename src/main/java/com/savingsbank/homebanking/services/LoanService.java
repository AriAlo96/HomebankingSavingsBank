package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.Loan;

import java.util.List;

public interface LoanService {
    List<Loan> findAllLoans ();
    Loan findLoanById (String id);
    void saveLoan (Loan loan);
    boolean existsByName (String name);
}
