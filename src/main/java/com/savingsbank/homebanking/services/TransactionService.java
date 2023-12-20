package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.Client;
import com.savingsbank.homebanking.models.Transaction;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionService {
    void saveTransaction(Transaction transaction);
    List<Transaction> searchByDate (Client client, String accountNumber, LocalDateTime startDate, LocalDateTime endingDate);
}
