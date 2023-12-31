package com.savingsbank.homebanking.services.implement;

import com.savingsbank.homebanking.models.Client;
import com.savingsbank.homebanking.repositories.ClientRepository;
import com.savingsbank.homebanking.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImplement implements ClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> findAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client findClientById(String id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public Client findClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    @Override
    public void saveClient(Client client) {
        clientRepository.save(client);
    }

    @Override
    public boolean existsClientByEmail(String email) {
        return clientRepository.existsClientByEmail(email);
    }
}
