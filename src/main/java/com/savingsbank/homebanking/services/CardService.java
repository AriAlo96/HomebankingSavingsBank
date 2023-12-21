package com.savingsbank.homebanking.services;

import com.savingsbank.homebanking.models.Card;
import com.savingsbank.homebanking.models.CardColor;
import com.savingsbank.homebanking.models.CardType;
import com.savingsbank.homebanking.models.Client;

import java.util.List;

public interface CardService {
    boolean existsCardByTypeAndColorAndClientAndActive (CardType type, CardColor color, Client client , boolean active);
    void saveCard (Card card);
    boolean existsCardByNumber (String number);
    Card findById (String id);
    List<Card> findAll();
}

