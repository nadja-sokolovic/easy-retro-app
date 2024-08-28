package ba.unsa.etf.sprint_retro.requests;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReportRequest implements Serializable {
    private int reportId;
    @NotNull(message = "Board id can not be empty")
    private Integer boardId;
    @NotNull(message = "Text can not be empty")
    private String text;
    @NotNull(message = "Sprint can not be empty")
    private Integer sprint;
}
