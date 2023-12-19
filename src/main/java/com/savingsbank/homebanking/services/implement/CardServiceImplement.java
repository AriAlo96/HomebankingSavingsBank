package com.savingsbank.homebanking.services.implement;

import com.savingsbank.homebanking.models.Card;
import com.savingsbank.homebanking.models.CardColor;
import com.savingsbank.homebanking.models.CardType;
import com.savingsbank.homebanking.models.Client;
import com.savingsbank.homebanking.repositories.CardRepository;
import com.savingsbank.homebanking.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CardServiceImplement implements CardService {
    @Autowired
    CardRepository cardRepository;

    @Override
    public boolean existsCardByTypeAndColorAndClientAndActive(CardType type,
                                                              CardColor color,
                                                              Client client , boolean active) {
        return cardRepository.existsByTypeAndColorAndClientAndActive(type,color,client,active);
    }

    @Override
    public void saveCard(Card card) {
        cardRepository.save(card);
    }

    @Override
    public boolean existsCardByNumber(String number) {
        return cardRepository.existsByNumber(number);
    }

    @Override
    public Card findById(Long id) {
        return cardRepository.findById(id).orElse(null);
    }

    @Override
    public List<Card> findAll() {
        return cardRepository.findAll();
    }


}
