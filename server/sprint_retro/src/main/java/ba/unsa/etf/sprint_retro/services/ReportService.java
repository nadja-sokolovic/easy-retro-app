package ba.unsa.etf.sprint_retro.services;

import ba.unsa.etf.sprint_retro.classes.CustomMapper;
import ba.unsa.etf.sprint_retro.exceptions.ResourceNotFoundException;
import ba.unsa.etf.sprint_retro.models.Report;
import ba.unsa.etf.sprint_retro.repository.ReportRepository;
import ba.unsa.etf.sprint_retro.requests.ReportRequest;
import ba.unsa.etf.sprint_retro.responses.ReportResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Set;

@Service
public class ReportService {
    private final CustomMapper mapper = new CustomMapper();
    final private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Autowired
    private ValidationService validationService;

    public ReportResponse findReportBySprint(Integer sprint) {
        Report report = reportRepository.findBySprint(sprint);
        if(report == null) report = new Report();
        return mapper.mapReportToReportResponse(report);
    }

    public ArrayList<Integer> findAllSprints() {
        return reportRepository.getAllSprints();
    }

    public ReportResponse createReportForSprint(ReportRequest reportRequest) {
        Set<ConstraintViolation<ReportRequest>> violations = validator.validate(reportRequest);
        if (violations.isEmpty()) {
            Report report = mapper.mapReportRequestToReport(reportRequest);
            Report response = reportRepository.save(report);
            return mapper.mapReportToReportResponse(response);
        }
        return validationService.handleInvalidRequest(violations);
    }

    public ReportResponse updateReportForSprint(ReportRequest reportRequest, Integer sprint) {
        Report report = reportRepository.findBySprint(sprint);
        if (report == null) {
            throw new ResourceNotFoundException("Ne postoji izvjestaj za ovaj sprint.");
        }
        Set<ConstraintViolation<ReportRequest>> violations = validator.validate(reportRequest);
        if (violations.isEmpty()) {
            report.setText(reportRequest.getText());

            report = reportRepository.save(report);
            return mapper.mapReportToReportResponse(report);
        }
        return validationService.handleInvalidRequest(violations);
    }
}
