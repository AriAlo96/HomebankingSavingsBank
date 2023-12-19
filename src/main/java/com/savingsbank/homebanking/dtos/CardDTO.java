package com.savingsbank.homebanking.dtos;

import com.savingsbank.homebanking.models.Card;
import com.savingsbank.homebanking.models.CardColor;
import com.savingsbank.homebanking.models.CardType;

import java.time.LocalDate;

public class CardDTO {
    private Long id;
    private String cardHolder;

    private CardType type;

    private CardColor color;

    private String number;

    private int cvv;

    private LocalDate thruDate;

    private LocalDate fromDate;

    private Boolean active;

    private Boolean expired;

    public CardDTO (Card card){
        this.id = card.getId();
        this.cardHolder = card.getCardHolder();
        this.type = card.getType();
        this.color = card.getColor();
        this.number = card.getNumber();
        this.cvv = card.getCvv();
        this.thruDate = card.getThruDate();
        this.fromDate = card.getFromDate();
        this.active = card.getActive();
    }

    public Long getId() {
        return id;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public CardType getType() {
        return type;
    }

    public CardColor getColor() {
        return color;
    }

    public String getNumber() {
        return number;
    }

    public int getCvv() {
        return cvv;
    }

    public LocalDate getThruDate() {
        return thruDate;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public Boolean getActive() {return active;}



    public Boolean getExpired() {
        return expired;
    }
}
