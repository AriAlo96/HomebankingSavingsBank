package com.savingsbank.homebanking.controllers;

import com.savingsbank.homebanking.models.Card;
import com.savingsbank.homebanking.models.CardColor;
import com.savingsbank.homebanking.models.CardType;
import com.savingsbank.homebanking.models.Client;
import com.savingsbank.homebanking.services.CardService;
import com.savingsbank.homebanking.services.ClientService;
import com.savingsbank.homebanking.utils.CardUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api")
public class CardController {
    @Autowired
    private CardService cardService;
    @Autowired
    private ClientService clientService;

    @PostMapping("/clients/current/cards")
    public ResponseEntity<Object> createCard(Authentication authentication,
                                             @RequestParam CardType type,
                                             @RequestParam CardColor color) {
        Client client = clientService.findClientByEmail(authentication.getName());
        if (client == null) {
            return new ResponseEntity<>("The client was not found",
                    HttpStatus.FORBIDDEN);
        }
        if (type == null) {
            return new ResponseEntity<>("Card type is required",
                    HttpStatus.FORBIDDEN);
        }
        if (color == null) {
            return new ResponseEntity<>("Card type is required",
                    HttpStatus.FORBIDDEN);
        }
        if (cardService.existsCardByTypeAndColorAndClientAndActive(type,
                color,
                client, true)) {
            return new ResponseEntity<>("You already have the same card",
                    HttpStatus.FORBIDDEN);
        }
        LocalDate fromDate = LocalDate.now();
        LocalDate thruDate = fromDate.plusYears(5);
        String cardNumber = checkCardNumber();
        int cvv = CardUtils.generateCvv();
        Boolean active = true;
        Card newCard = new Card((client.getFirstName().toUpperCase() + " " + client.getLastName().toUpperCase()),
                type,
                color,
                cardNumber,
                cvv,
                thruDate,
                fromDate, active);
        cardService.saveCard(newCard);
        client.addCard(newCard);
        clientService.saveClient(client);
        return new ResponseEntity<>("Card created successfully",
                HttpStatus.CREATED);
    }

    @PatchMapping("/clients/current/cards")
    public ResponseEntity<Object> deleteCard(Authentication authentication, @RequestParam String id) {
        Client client = clientService.findClientByEmail(authentication.getName());
        Card card = cardService.findById(id);
        if (client == null) {
            return new ResponseEntity<>("Client not found",
                    HttpStatus.FORBIDDEN);
        }
        if (card == null) {
            return new ResponseEntity<>("The card doesn't exist",
                    HttpStatus.FORBIDDEN);
        }
        if (!card.getActive()) {
            return new ResponseEntity<>("The card is inactive",
                    HttpStatus.FORBIDDEN);
        }
        if (!card.getClient().equals(client)) {
            return new ResponseEntity<>("The card doesn't belong to the authenticated client",
                    HttpStatus.FORBIDDEN);
        }
        card.setActive(false);
        cardService.saveCard(card);
        return new ResponseEntity<>("Card deleted successfully", HttpStatus.CREATED);
    }

    public String checkCardNumber(){
        String generatedNumber;
        do{
            generatedNumber = CardUtils.generateNumber();
        }while(cardService.existsCardByNumber(generatedNumber));
        return generatedNumber;
    }
}
