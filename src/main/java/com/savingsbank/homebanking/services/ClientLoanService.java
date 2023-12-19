package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.ClientLoan;

public interface ClientLoanService {
    void saveClientLoan(ClientLoan clientLoan);

    ClientLoan findById (Long id);

    Boolean existsById (Long id);
}
