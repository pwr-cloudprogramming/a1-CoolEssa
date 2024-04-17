package tic.tac.toe.domain;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Field {
    private FieldState position0;
    private FieldState position1;
    private FieldState position2;
    private FieldState position3;
    private FieldState position4;
    private FieldState position5;
    private FieldState position6;
    private FieldState position7;
    private FieldState position8;

    public Field() {
        position0 = FieldState.EMPTY;
        position1 = FieldState.EMPTY;
        position2 = FieldState.EMPTY;
        position3 = FieldState.EMPTY;
        position4 = FieldState.EMPTY;
        position5 = FieldState.EMPTY;
        position6 = FieldState.EMPTY;
        position7 = FieldState.EMPTY;
        position8 = FieldState.EMPTY;
    }
}
