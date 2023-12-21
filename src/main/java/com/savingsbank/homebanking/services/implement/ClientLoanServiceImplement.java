package com.savingsbank.homebanking.services.implement;

import com.savingsbank.homebanking.models.ClientLoan;
import com.savingsbank.homebanking.repositories.ClientLoanRepository;
import com.savingsbank.homebanking.services.ClientLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientLoanServiceImplement implements ClientLoanService {
    @Autowired
    ClientLoanRepository clientLoanRepository;
    @Override
    public void saveClientLoan(ClientLoan clientLoan) {
        clientLoanRepository.save(clientLoan);
    }

    @Override
    public ClientLoan findById(String id) {
        return clientLoanRepository.findById(id).orElse(null);
    }

    @Override
    public Boolean existsById(String id) {
        return clientLoanRepository.existsById(id);
    }
}

