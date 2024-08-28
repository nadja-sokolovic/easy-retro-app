package ba.unsa.etf.sprint_retro.classes;

import ba.unsa.etf.sprint_retro.models.Reaction;
import ba.unsa.etf.sprint_retro.models.Report;
import ba.unsa.etf.sprint_retro.models.RetroItem;
import ba.unsa.etf.sprint_retro.requests.ReportRequest;
import ba.unsa.etf.sprint_retro.requests.RetroItemRequest;
import ba.unsa.etf.sprint_retro.responses.*;

import java.util.ArrayList;

public class CustomMapper {
    //Report
    public ReportResponse mapReportToReportResponse(Report report) {
        ReportResponse response = new ReportResponse();
        response.setReportId(report.getReportId());
        response.setText(report.getText());
        response.setSprint(report.getSprint());
        response.setBoardId(report.getBoardId());

        return response;
    }

    public Report mapReportRequestToReport(ReportRequest reportRequest) {
        Report report = new Report();
        report.setReportId(reportRequest.getReportId());
        report.setBoardId(reportRequest.getBoardId());
        report.setText(reportRequest.getText());
        report.setSprint(reportRequest.getSprint());

        return report;
    }

    //Retro Item
    public RetroItemResponse mapRetroItemToRetroItemResponse(RetroItem retroItem, ReactionsCountResponse reactions) {
        RetroItemResponse response = new RetroItemResponse();
        response.setItemId(retroItem.getItemId());
        response.setType(retroItem.getType());
        response.setText(retroItem.getText());
        response.setSprint(retroItem.getSprint());
        response.setBoardId(retroItem.getBoardId());
        response.setDescription(retroItem.getDescription());
        response.setReactions(reactions);

        return response;
    }

    public RetroItem mapRetroItemRequestToRetroItem(RetroItemRequest retroItemRequest) {
        RetroItem retroItem = new RetroItem();
        retroItem.setItemId(retroItemRequest.getItemId());
        retroItem.setSprint(retroItemRequest.getSprint());
        retroItem.setText(retroItemRequest.getText());
        retroItem.setType(retroItemRequest.getType());
        retroItem.setDescription(retroItemRequest.getDescription());
        retroItem.setBoardId(retroItemRequest.getBoardId());

        return retroItem;
    }

    //Reaction
    public ReactionResponse mapReactionToReactionResponse(Reaction reaction) {
        ReactionResponse reactionResponse = new ReactionResponse();
        reactionResponse.setType(reaction.getType());
        reactionResponse.setItemId(reaction.getItemId());

        return reactionResponse;
    }
}
