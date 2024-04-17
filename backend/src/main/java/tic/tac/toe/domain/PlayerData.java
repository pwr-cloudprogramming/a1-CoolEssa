package tic.tac.toe.domain;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class PlayerData {
    private int gameId;
    private String playerName;
}
