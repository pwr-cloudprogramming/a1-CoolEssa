package tic.tac.toe.domain;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Move {
    private Field field;
    private int gameId;
    private FieldState player;
}
