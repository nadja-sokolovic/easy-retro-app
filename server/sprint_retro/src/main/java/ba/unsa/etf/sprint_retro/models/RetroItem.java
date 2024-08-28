package ba.unsa.etf.sprint_retro.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "retro_item")
public class RetroItem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private int itemId;

    @Column(name = "type")
    private String type;

    @Column(name = "text")
    private String text;

    @Column(name = "description")
    private String description;

    @Column(name = "sprint")
    private Integer sprint;

    @Column(name = "board_id")
    private Integer boardId;

}
