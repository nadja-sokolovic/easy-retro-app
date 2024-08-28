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
@Table(name = "reaction")
public class Reaction implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reaction_id")
    private int reactionId;

    @Column(name = "type")
    private String type;

    @Column(name = "item_id")
    private Integer itemId;

    public Reaction(String type, Integer itemId) {
        this.type = type;
        this.itemId = itemId;
    }
}
