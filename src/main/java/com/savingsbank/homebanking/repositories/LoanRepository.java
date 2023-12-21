package com.savingsbank.homebanking.repositories;

import com.savingsbank.homebanking.models.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface LoanRepository extends JpaRepository<Loan,String> {
    Optional<Loan> findById (String id);
    boolean existsByName (String name);
}
