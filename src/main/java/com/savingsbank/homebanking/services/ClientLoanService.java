package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.ClientLoan;

public interface ClientLoanService {
    void saveClientLoan(ClientLoan clientLoan);

    ClientLoan findById (String id);

    Boolean existsById (String id);
}
