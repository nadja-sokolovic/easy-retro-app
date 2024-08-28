package ba.unsa.etf.sprint_retro.exceptions;

import lombok.Data;

import java.util.List;

@Data
public class ResourceNotFoundException extends RuntimeException {
    private List<ErrorDetails> messages;
    public ResourceNotFoundException(String message) {
        super(message);
    }
    public ResourceNotFoundException(List<ErrorDetails> errorDetails) {
        this.messages = errorDetails;
    }
}
