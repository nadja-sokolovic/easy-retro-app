package ba.unsa.etf.sprint_retro.controllers;

import ba.unsa.etf.sprint_retro.requests.ReportRequest;
import ba.unsa.etf.sprint_retro.responses.ReportResponse;
import ba.unsa.etf.sprint_retro.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ba.unsa.etf.sprint_retro.responses.GenericResponse;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/report")
@CrossOrigin("http://localhost:3000")
public class ReportController {
    @Autowired
    ReportService reportService;

    @GetMapping("/{sprint}")
    public ResponseEntity<GenericResponse<ReportResponse>> getReportBySprint(@PathVariable Integer sprint) {
        return new ResponseEntity<>(new GenericResponse<>(reportService.findReportBySprint(sprint)), HttpStatus.OK);
    }

    @GetMapping("/sprints")
    public ResponseEntity<GenericResponse<ArrayList<Integer>>> getAllSprintsThatHaveReports() {
        return new ResponseEntity<>(new GenericResponse<>(reportService.findAllSprints()), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<GenericResponse<ReportResponse>> createReport(@RequestBody ReportRequest reportRequest) {
        return new ResponseEntity<>(new GenericResponse<>(reportService.createReportForSprint(reportRequest)), HttpStatus.CREATED);
    }

    @PutMapping("/{sprint}")
    public ResponseEntity<GenericResponse<ReportResponse>> updateReport(@RequestBody ReportRequest reportRequest, @PathVariable Integer sprint) {
        return new ResponseEntity<>(new GenericResponse<>(reportService.updateReportForSprint(reportRequest, sprint)), HttpStatus.OK);
    }
}
