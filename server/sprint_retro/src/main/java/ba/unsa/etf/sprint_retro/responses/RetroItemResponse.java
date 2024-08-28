package ba.unsa.etf.sprint_retro.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RetroItemResponse implements Serializable {
    private Integer itemId;
    private String type;
    private String text;
    private String description;
    private Integer sprint;
    private Integer boardId;
    private ReactionsCountResponse reactions;
}
