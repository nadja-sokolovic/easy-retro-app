package ba.unsa.etf.sprint_retro.repository;

import ba.unsa.etf.sprint_retro.models.RetroItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface RetroItemRepository extends JpaRepository<RetroItem, Integer> {
    @Query(value = "select * from retro_item ri where ri.type IN(:categories)", nativeQuery = true)
    ArrayList<RetroItem> getRetroItems(ArrayList<String> categories);

    @Query(value = "select distinct ri.sprint from retro_item ri where ri.sprint is not null", nativeQuery = true)
    ArrayList<Integer> getAllSprints();
}
