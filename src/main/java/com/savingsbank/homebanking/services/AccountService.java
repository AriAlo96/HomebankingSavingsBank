package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.Account;

import java.util.List;

public interface AccountService {
    List<Account> findAllAccounts();
    Account findAccountById(Long id);
    void saveAccount(Account account);
    boolean existsAccountByNumber (String number);
    Account findAccountByNumber (String number);
    Account findById (Long id);
    boolean existsByActive (boolean active);
}
