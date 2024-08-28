package ba.unsa.etf.sprint_retro.controllers;

import ba.unsa.etf.sprint_retro.exceptions.ResourceNotFoundException;
import ba.unsa.etf.sprint_retro.requests.RetroItemRequest;
import ba.unsa.etf.sprint_retro.responses.GenericResponse;
import ba.unsa.etf.sprint_retro.responses.RetroItemResponse;
import ba.unsa.etf.sprint_retro.services.RetroItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/item")
@CrossOrigin("http://localhost:3000")
public class RetroItemController {
    @Autowired
    RetroItemService retroItemService;
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<List<RetroItemResponse>>> getRetroItems(@PathVariable Integer id, @RequestParam(required = false) Integer sprint) {
        ArrayList<String> categories = new ArrayList<>();
        switch (id) {
            case 1:
                categories = new ArrayList<>(Arrays.asList(
                        "start",
                        "continue",
                        "stop"
                ));
                break;
            case 2:
                categories = new ArrayList<>(Arrays.asList(
                        "best-story",
                        "most-annoying-story",
                        "most-technically-complex-story",
                        "most-exciting-story"
                ));
                break;
            default:
                throw new ResourceNotFoundException("Ne postoji retro item za ovu kategoriju");
        }
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.getRetroItems(categories, sprint)), HttpStatus.OK);
    }

    @GetMapping("/sprints")
    public ResponseEntity<GenericResponse<ArrayList<Integer>>> getAllSprintsThatHaveRetroItems() {
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.findAllSprints()), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<GenericResponse<RetroItemResponse>> getAllSprintsThatHaveRetroItems(@RequestParam Integer itemId) {
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.findItemById(itemId)), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<GenericResponse<RetroItemResponse>> createRetroItem(@RequestBody RetroItemRequest retroItemRequest) {
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.addNewRetroItem(retroItemRequest)), HttpStatus.CREATED);
    }

    @PutMapping("{itemId}")
    public ResponseEntity<GenericResponse<RetroItemResponse>> updateRetroItem(@PathVariable Integer itemId, @RequestBody RetroItemRequest retroItemRequest) {
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.updateRetroItem(itemId, retroItemRequest)), HttpStatus.OK);
    }

    @PutMapping("change/type/{itemId}")
    public ResponseEntity<GenericResponse<RetroItemResponse>> changeTypeOfRetroItem(@PathVariable Integer itemId, @RequestParam String newType) {
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.changeRetroItemType(itemId, newType)), HttpStatus.OK);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<GenericResponse<RetroItemResponse>> deleteRetroItem(@PathVariable Integer itemId) {
        return new ResponseEntity<>(new GenericResponse<>(retroItemService.deleteRetroItem(itemId)), HttpStatus.OK);
    }

}
