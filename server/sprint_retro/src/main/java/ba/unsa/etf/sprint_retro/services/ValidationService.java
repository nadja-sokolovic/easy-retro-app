package ba.unsa.etf.sprint_retro.services;

import ba.unsa.etf.sprint_retro.exceptions.ErrorDetails;
import ba.unsa.etf.sprint_retro.exceptions.WrongFormatException;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ValidationService {
    public <T, U> U handleInvalidRequest (Set<ConstraintViolation<T>> violations) {
        List<ErrorDetails> currentWarningList = new ArrayList<>();
        for (ConstraintViolation<?> violation : violations) {
            currentWarningList.add(new ErrorDetails(violation.getMessage()));
        }

        throw new WrongFormatException(currentWarningList);
    }
}
