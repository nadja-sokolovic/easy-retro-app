package ba.unsa.etf.sprint_retro.services;

import ba.unsa.etf.sprint_retro.classes.CustomMapper;
import ba.unsa.etf.sprint_retro.exceptions.ResourceNotFoundException;
import ba.unsa.etf.sprint_retro.models.RetroItem;
import ba.unsa.etf.sprint_retro.repository.ReactionRepository;
import ba.unsa.etf.sprint_retro.repository.RetroItemRepository;
import ba.unsa.etf.sprint_retro.requests.RetroItemRequest;
import ba.unsa.etf.sprint_retro.responses.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;

@Service
public class RetroItemService {
    private final CustomMapper customMapper = new CustomMapper();
    final private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    private final RetroItemRepository retroItemRepository;
    private final ReactionRepository reactionRepository;

    @Autowired
    private ValidationService validationService;

    @Autowired
    private ReactionService reactionService;

    @Autowired
    public RetroItemService(RetroItemRepository retroItemRepository, ReactionRepository reactionRepository) {
        this.retroItemRepository = retroItemRepository;
        this.reactionRepository = reactionRepository;
    }

    public ArrayList<Integer> findAllSprints() {
        return retroItemRepository.getAllSprints();
    }

    public List<RetroItemResponse> getRetroItems(ArrayList<String> categories, Integer sprint) {
        List<RetroItemResponse> allRetroItems = retroItemRepository.getRetroItems(categories)
                .stream()
                .map(i -> customMapper.mapRetroItemToRetroItemResponse(
                        i,
                        reactionService.countReactionsForItem(i.getItemId()))
                ).collect(Collectors.toList());
        if(sprint != null) {
            allRetroItems = allRetroItems.stream().filter(item -> item.getSprint() == sprint).collect(Collectors.toList());
        }

        return allRetroItems;
    }

    public RetroItemResponse findItemById(Integer itemId) {
        RetroItem item = this.retroItemRepository.findById(itemId).orElseThrow(() ->
                new ResourceNotFoundException("Ne postoji ova stavka."));
        return customMapper.mapRetroItemToRetroItemResponse(item, reactionService.countReactionsForItem(item.getItemId()));
    }

    public RetroItemResponse addNewRetroItem(RetroItemRequest retroItemRequest) {
        Set<ConstraintViolation<RetroItemRequest>> violations = validator.validate(retroItemRequest);
        if (violations.isEmpty()) {
            RetroItem response = retroItemRepository.save(customMapper.mapRetroItemRequestToRetroItem(retroItemRequest));
            return customMapper.mapRetroItemToRetroItemResponse(response, new ReactionsCountResponse(0, 0));
        }
        return validationService.handleInvalidRequest(violations);
    }

    public RetroItemResponse updateRetroItem(Integer itemId, RetroItemRequest retroItemRequest) {
        RetroItem retroItem = retroItemRepository.findById(itemId).orElse(null);
        if (retroItem == null) {
            throw new ResourceNotFoundException("Ne postoji ova stavka.");
        }
        Set<ConstraintViolation<RetroItemRequest>> violations = validator.validate(retroItemRequest);
        if (violations.isEmpty()) {
            retroItem.setText(retroItemRequest.getText());
            if(retroItemRequest.getDescription() != null)
                retroItem.setDescription(retroItemRequest.getDescription());

            retroItem = retroItemRepository.save(retroItem);
            return customMapper.mapRetroItemToRetroItemResponse(retroItem, reactionService.countReactionsForItem(retroItem.getItemId()));
        }
        return validationService.handleInvalidRequest(violations);
    }

    public RetroItemResponse changeRetroItemType (Integer itemId, String newType) {
        RetroItem retroItem = retroItemRepository.findById(itemId).orElse(null);
        if (retroItem == null) {
            throw new ResourceNotFoundException("Ne postoji ova stavka.");
        }
        retroItem.setType(newType);
        retroItem = retroItemRepository.save(retroItem);

        return customMapper.mapRetroItemToRetroItemResponse(retroItem, reactionService.countReactionsForItem(retroItem.getItemId()));
    }

    public RetroItemResponse deleteRetroItem(Integer itemId) {
        RetroItem retroItem = retroItemRepository.findById(itemId).orElseThrow(() ->
                new ResourceNotFoundException("Ne postoji ova stavka."));

        this.retroItemRepository.deleteById(retroItem.getItemId());
        return customMapper.mapRetroItemToRetroItemResponse(retroItem, reactionService.countReactionsForItem(retroItem.getItemId()));
    }
}
