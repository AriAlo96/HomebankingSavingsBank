package com.savingsbank.homebanking.repositories;

import com.savingsbank.homebanking.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client,String> {
    Client findByEmail (String Email);
    boolean existsClientByEmail(String Email);
}
