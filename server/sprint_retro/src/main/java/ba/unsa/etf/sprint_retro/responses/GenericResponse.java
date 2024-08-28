package ba.unsa.etf.sprint_retro.responses;

import ba.unsa.etf.sprint_retro.exceptions.ErrorDetails;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericResponse<T> {
    private T response;
    private List<ErrorDetails> errorDetails;

    public GenericResponse(T response) {
        this.response = response;
    }

    public GenericResponse(List<ErrorDetails> errorDetails) {
        this.errorDetails = errorDetails;
    }
}
