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
public class ReactionsCountResponse implements Serializable {
    private Integer likeCount;
    private Integer dislikeCount;
}
