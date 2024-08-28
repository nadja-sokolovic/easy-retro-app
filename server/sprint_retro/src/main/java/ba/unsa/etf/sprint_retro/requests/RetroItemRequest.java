package ba.unsa.etf.sprint_retro.requests;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RetroItemRequest {
    private int itemId;

    @NotNull(message = "Type can not be empty")
    private String type;

    @NotNull(message = "Text can not be empty")
    private String text;

    private String description;

    private Integer sprint;

    private Integer boardId;
}
