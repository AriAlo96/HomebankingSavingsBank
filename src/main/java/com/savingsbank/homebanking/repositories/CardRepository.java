package com.savingsbank.homebanking.repositories;

import com.savingsbank.homebanking.models.Card;
import com.savingsbank.homebanking.models.CardColor;
import com.savingsbank.homebanking.models.CardType;
import com.savingsbank.homebanking.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CardRepository extends JpaRepository<Card, String> {
    boolean existsByNumber (String number);
    boolean existsByTypeAndColorAndClientAndActive (CardType type , CardColor color, Client client, boolean active);

}

