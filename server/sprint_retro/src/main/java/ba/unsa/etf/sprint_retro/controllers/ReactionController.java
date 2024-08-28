package ba.unsa.etf.sprint_retro.controllers;

import ba.unsa.etf.sprint_retro.responses.GenericResponse;
import ba.unsa.etf.sprint_retro.responses.ReactionResponse;
import ba.unsa.etf.sprint_retro.responses.ReactionsCountResponse;
import ba.unsa.etf.sprint_retro.responses.RetroItemResponse;
import ba.unsa.etf.sprint_retro.services.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/reaction")
@CrossOrigin("http://localhost:3000")
public class ReactionController {
    @Autowired
    ReactionService reactionService;

    @PostMapping("/{itemId}")
    public ResponseEntity<GenericResponse<ReactionResponse>> addNewReactionToRetroItem(@PathVariable Integer itemId, @RequestParam String type) {
        return new ResponseEntity<>(new GenericResponse<>(reactionService.addNewReactionToItem(itemId, type)), HttpStatus.CREATED);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<GenericResponse<ReactionResponse>> deleteReaction(@PathVariable Integer itemId, @RequestParam String type) {
        return new ResponseEntity<>(new GenericResponse<>(reactionService.deleteReaction(itemId, type)), HttpStatus.OK);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<GenericResponse<ReactionsCountResponse>> getReactionsForItem(@PathVariable Integer itemId) {
        return new ResponseEntity<>(new GenericResponse<>(reactionService.countReactionsForItem(itemId)), HttpStatus.OK);
    }
}
