package ba.unsa.etf.sprint_retro.repository;

import ba.unsa.etf.sprint_retro.models.Reaction;
import ba.unsa.etf.sprint_retro.models.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    Report findBySprint(Integer sprint);

    @Query(value = "select distinct r.sprint from report r", nativeQuery = true)
    ArrayList<Integer> getAllSprints();
}
