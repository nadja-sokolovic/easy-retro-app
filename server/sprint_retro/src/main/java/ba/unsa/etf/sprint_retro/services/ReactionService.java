package ba.unsa.etf.sprint_retro.services;

import ba.unsa.etf.sprint_retro.classes.CustomMapper;
import ba.unsa.etf.sprint_retro.exceptions.ResourceNotFoundException;
import ba.unsa.etf.sprint_retro.exceptions.WrongFormatException;
import ba.unsa.etf.sprint_retro.models.Reaction;
import ba.unsa.etf.sprint_retro.models.RetroItem;
import ba.unsa.etf.sprint_retro.repository.ReactionRepository;
import ba.unsa.etf.sprint_retro.repository.RetroItemRepository;
import ba.unsa.etf.sprint_retro.responses.ReactionResponse;
import ba.unsa.etf.sprint_retro.responses.ReactionsCountResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ReactionService {
    private final CustomMapper customMapper = new CustomMapper();
    private final ReactionRepository reactionRepository;
    private final RetroItemRepository retroItemRepository;

    @Autowired
    public ReactionService(ReactionRepository reactionRepository, RetroItemRepository retroItemRepository) {
        this.reactionRepository = reactionRepository;
        this.retroItemRepository = retroItemRepository;
    }

    public ReactionsCountResponse countReactionsForItem(Integer itemId) {
        ArrayList<Reaction> allReactions = this.reactionRepository.getAllReactionsForRetroItem(itemId);
        Integer likes = Integer.valueOf(0);
        Integer dislikes = Integer.valueOf(0);
        for(Reaction reaction: allReactions) {
            if(reaction.getType().equals("like")) likes++;
            else dislikes++;
        }

        return new ReactionsCountResponse(likes, dislikes);
    }

    public ReactionResponse addNewReactionToItem(Integer itemId, String type) {
        this.checkParams(itemId, type);
        Reaction reaction = this.reactionRepository.save(new Reaction(type, itemId));

        return customMapper.mapReactionToReactionResponse(reaction);
    }

    public ReactionResponse deleteReaction(Integer itemId, String reactionType) {
        this.checkParams(itemId, reactionType);
        ArrayList<Reaction> reactions = this.reactionRepository.getAllReactionsForRetroItem(itemId);
        if(reactions == null) {
            throw new ResourceNotFoundException("Ova stavka nema reakcija");
        }
        for(Reaction reaction: reactions) {
            if(reaction.getType().equals(reactionType)) {
                this.reactionRepository.deleteById(reaction.getReactionId());
                return customMapper.mapReactionToReactionResponse(reaction);
            }
        }
        throw new ResourceNotFoundException("Ova stavka nema reakcija ovog tipa");
    }

    private void checkParams(Integer itemId, String type) {
        RetroItem retroItem = retroItemRepository.findById(itemId).orElseThrow(() ->
                new ResourceNotFoundException("Ne postoji ova stavka."));

        if(!type.equals("like") && !type.equals("dislike")) {
            throw new WrongFormatException("Pogresan tip reakcije");
        }
    }
}
