package tic.tac.toe.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tic.tac.toe.domain.Move;
import tic.tac.toe.domain.Game;
import tic.tac.toe.domain.PlayerData;
import tic.tac.toe.services.GameService;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class GameRestController {
    @Autowired
    private final GameService gameService;

    @GetMapping("/start-game")
    public Game startGame(@RequestParam(name = "gameId") Integer gameId, @RequestParam(name = "playerName") String playerName) {
        return gameService.startGame(new PlayerData(gameId, playerName));
    }

    @GetMapping("/game")
    public Game currentGameState(@RequestParam(name = "gameId") Integer gameId, @RequestParam(name = "playerName") String playerName) {
        return gameService.currentGameState(new PlayerData(gameId, playerName));
    }

    @PostMapping("/move")
    public Game setMove(@RequestBody final Move move) {
        return gameService.setMove(move);
    }

    @PostMapping("/restart")
    public Game restart(@RequestBody final int gameId) {
        return gameService.restart(gameId);
    }
}
