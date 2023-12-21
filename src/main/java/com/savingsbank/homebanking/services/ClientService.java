package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.Client;

import java.util.List;

public interface ClientService {
    List<Client> findAllClients();
    Client findClientById (String id);
    Client findClientByEmail (String email);
    void saveClient (Client client);
    boolean existsClientByEmail(String email);
}
