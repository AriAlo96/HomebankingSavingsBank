package com.savingsbank.homebanking.repositories;

import com.savingsbank.homebanking.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByNumber (String number);
    Boolean existsByNumber (String number);
    boolean existsByActive (boolean active);
}
