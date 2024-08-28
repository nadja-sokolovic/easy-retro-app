package ba.unsa.etf.sprint_retro.exceptions;


import lombok.Data;

import java.util.List;

@Data
public class WrongFormatException extends RuntimeException{
    private List<ErrorDetails> messages;

    public WrongFormatException(String message) {
        super(message);
    }
    public WrongFormatException(List<ErrorDetails> errorDetails) {
        this.messages = errorDetails;
    }
}