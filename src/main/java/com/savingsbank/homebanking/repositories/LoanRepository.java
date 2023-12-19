package com.savingsbank.homebanking.repositories;

import com.savingsbank.homebanking.models.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface LoanRepository extends JpaRepository<Loan,Long> {
    Loan findById (long id);
    boolean existsByName (String name);
}
