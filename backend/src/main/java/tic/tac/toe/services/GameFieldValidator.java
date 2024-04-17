package tic.tac.toe.services;

import org.springframework.stereotype.Component;
import tic.tac.toe.domain.Field;
import tic.tac.toe.domain.FieldState;
import tic.tac.toe.domain.GameState;

@Component
class GameFieldValidator {

    GameState getCurrentGameState(final Field field, final FieldState player) {
        if ((field.getPosition0().equals(player) && field.getPosition1().equals(player) && field.getPosition2().equals(player))
         || (field.getPosition3().equals(player) && field.getPosition4().equals(player) && field.getPosition5().equals(player))
         || (field.getPosition6().equals(player) && field.getPosition7().equals(player) && field.getPosition8().equals(player))
         || (field.getPosition0().equals(player) && field.getPosition3().equals(player) && field.getPosition6().equals(player))
         || (field.getPosition1().equals(player) && field.getPosition4().equals(player) && field.getPosition7().equals(player))
         || (field.getPosition2().equals(player) && field.getPosition5().equals(player) && field.getPosition8().equals(player))
         || (field.getPosition0().equals(player) && field.getPosition4().equals(player) && field.getPosition8().equals(player))
         || (field.getPosition2().equals(player) && field.getPosition4().equals(player) && field.getPosition6().equals(player))) {
            return getWinningPlayer(player);
        } else if (!field.getPosition0().equals(FieldState.EMPTY) && !field.getPosition1().equals(FieldState.EMPTY) && !field.getPosition2().equals(FieldState.EMPTY)
                && !field.getPosition3().equals(FieldState.EMPTY) && !field.getPosition4().equals(FieldState.EMPTY) && !field.getPosition5().equals(FieldState.EMPTY)
                && !field.getPosition6().equals(FieldState.EMPTY) && !field.getPosition7().equals(FieldState.EMPTY) && !field.getPosition8().equals(FieldState.EMPTY)) {
            return GameState.DRAW;
        } else {
            return getPlayerForNextTurn(player);
        }
    }

    private GameState getWinningPlayer(final FieldState player) {
        return FieldState.NOUGHTS.equals(player) ? GameState.NOUGHTS_WINS : GameState.CROSSES_WINS;
    }

    private GameState getPlayerForNextTurn(final FieldState player) {
        return FieldState.NOUGHTS.equals(player) ? GameState.CROSSES_TURN : GameState.NOUGHTS_TURN;
    }
}
