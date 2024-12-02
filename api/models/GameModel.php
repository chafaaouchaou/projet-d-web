

<?php

class GameModel {
    public function getGame($id) {
        // Grid data as concatenated string
        $solutionGrid = 'TELESCOPESETAT■ORIONL■RA■UNCLELUMIERE■IOURES■NONNERAS■■NONNEIN■BINNINGQUARTETTESUSINE■■E■OELLOMBARDS' ;       
        // Descriptions for horizontal and vertical words
        $horizontalDesc = [
            "1-Les outils des astronomes.",
            "2-Louis XIV, selon Louis XIV - Chasseur équatorial.",
            "3-Que ce soit le dieu ou le métal, il irradie - Sam ou Tom.",
            "4-Porteuse de messages célestes - A une liaison avec Jupiter.",
            "5-Aurochs - Bout de bois.",
            "6-Court - Religieuse.",
            "7- À la mode - Technique utilisée par les virtuoses de l'imagerie électronique.",
            "8- Petits ensembles, battus d'une tête par celui de Stephan.",
            "9-Local industriel.",
            "10-On les trouve surtout dans le nord de l'Italie."
        ];

        $verticalDesc = [
            "A-Telle notre bonne vieille planète.",
            "B-Les astronomes sont toujours à sa recherche - Le cadeau d'Herschel.",
            "C-Brouillent la vision - Odeur méridionale.",
            "D-Pour éviter que le ciel ne nous tombe sur la tête - En Moravie.",
            "E-Article.",
            "F-Boréale, australe ou solaire.",
            "1-Décoreront.",
            "H-Celui du Midi est un haut lieu de l'astronomie française.",
            "J-Aux quatre coins de la rose - Un gamin vraiment désordonné."
        ];
        $rows = 10;
        $cols = 10;

        return [
            "id" => $id,
            "name" => "Example Game",
            "description" => "A great game example",
            "concatenatedGrid" => $solutionGrid,
            "horizontalDesc" => $horizontalDesc,
            "verticalDesc" => $verticalDesc,
            "rows" => $rows,
            "cols" => $cols
        ];
    }
}

?>
