package ba.unsa.etf.sprint_retro.repository;

import ba.unsa.etf.sprint_retro.models.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
    @Query(value = "select * from reaction r where r.item_id = :itemId", nativeQuery = true)
    ArrayList<Reaction> getAllReactionsForRetroItem(Integer itemId);
}
